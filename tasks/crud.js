import { Menu_product } from "../model/menu_products.js";
import { Catalogue_product } from "../model/catalogue_products.js";
import { Op as _Op } from "sequelize";
import { faker } from "@faker-js/faker";
import multer from "multer";
// import * as fs from 'node:fs/promises';
const Op = _Op;


//faker create REMOVE FROM PRODUCTION
async function fakeCreate(req, res){
    const table = req.body.table
    if(table=="menu"){
        await Menu_product.sync()
    }
    if(table=="catalogue"){
        await Catalogue_product.sync()
    }
    const user = req.user
    try {
        const createProduct = await Product.create({
            product_name: faker.commerce.product(),
            product_category: faker.commerce.department(),
            product_price: faker.commerce.price(),
            user_id:user.sub
        })
        res.status(201).json({
            ok:true,
            status:201,
            message:"Created Product"
        })
    } catch (error) {
        res.json(error)
    }
}

//Create on products tables 
async function create(req, res){
    const table = req.body.table
    const body = req.body
    if(table==="menu"){
        await Menu_product.sync()
        try {
            const createProduct = await Menu_product.create({
                product_name: body.name,
                product_price: body.price,
                product_category: body.category,
                user_id: body.user
            })
            res.status(201).json({
                ok:true,
                status:201,
                message:"Created Product"
            })
        } catch (error) {
            res.json(error)
        }
    }
    else if(table==="catalogue"){
        await Catalogue_product.sync()
        try {
            const createProduct = await Catalogue_product.create({
                product_name: body.name,
                product_price: body.price,
                product_category: body.category,
                user_id: body.user,
                isOff: body.isOff,
                isNew: body.isNew
            })
            media(req, res, function (err){
                if(err){
                    return res.status(500).json({message:"error al cargar la imagen"})
                }
                if(!req.file){
                    return res.status(400).json({message:"no se cargo ninguna imagen"})
                }
                return res.status(200).json({
                    message:"archivo subido exitosamente",
                    file:req.file
                })
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    else{
        return res.status(400).json({message:"tabla no existente"})
    }
}

//Read table products (erase the bypass, it should be able to be seen for everyone)
async function read(req, res){
    const body = req.body
    if(body.table === "menu"){
        try {
            const products = await Menu_product.findAll({
                where:{user_id:body.user}
            })
            res.status(200).json({
                ok:true,
                status:200,
                body: products
            })
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
        }
    }
    else if(body.table === "catalogue"){
        try {
            const products = await Catalogue_product.findAll({
                where:{user_id:body.user}
            })
            res.status(200).json({
                ok:true,
                status:200,
                body: products
            })
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
        }
    }
}

// just for dev reasons
async function readAll(req, res){
    const table = req.body.table
    // const user = req.user
    try {
        if(table==="menu"){
            const products = await Menu_product.findAll()
            res.status(200).json({
                ok:true,
                status:200,
                body: products
            })
        }
        else if(table==="catalogue"){
            const products = await Catalogue_product.findAll()
            res.status(200).json({
                ok:true,
                status:200,
                body: products
            })
        }
        else{res.status(400).json({messagge:"sin tabla"})}
    } catch (error) {
        res.json(error)
    }
}


//Update on Prodcuts tables
async function update(req, res){
    const body = req.body
    const table = req.body.table
    console.log(body)
    if(table==="menu"){
        await Menu_product.sync()
        try {
            const updateProducts = await Menu_product.update({
                product_name:body.name,
                product_price: body.price,
            },
            {
                where:{
                product_id:body.id
                }
            }
        )
        res.status(201).json({
            ok:true,
            status:201,
            message:"Updated Products",
            body:body
        })
        } catch (error) {
            res.json(error)
        }
    }
    if(table==="catalogue"){
        await Catalogue_product.sync()
        try {
            const updateProducts = await Catalogue_product.update({
                product_name:body.name,
                product_price: body.price,
            },
            {
                where:{
                product_id:body.id
                }
            }
        )
        if(!req.file){
            console.log("no image loaded")
            res.status(201).json({
                ok:true,
                status:201,
                message:"Updated Products",
                body:body
            })
        }
        else{
            return res.status(200).json({
                message:"articulo e imagen actualizado exitosamente",
                file:req.file
            })   
        }
        } catch (error) {
            res.json(error)
        }
    }
    else{
        console.log(req.body)
        res.json("non valid table has been gived")
    }
}

//Delete singleItem on the product tables
async function erase(req, res){
    const table = req.body.table
    if(table=="menu"){
        await Menu_product.sync()
        body = req.body
        try {
            const deleteProduct = await Menu_product.destroy({
                where: {
                    product_id:body.id 
                }
            })
            res.status(200).json({
                ok:true,
                status:201,
                messge:"Deleted product"
            })
        } catch (error) {
            res.json(error)
        }
    }
    if(table=="catalogue"){
        await Catalogue_product.sync()
        body = req.body
        try {
            const deleteProduct = await Catalogue_product.destroy({
                where: {
                    product_id:body.id 
                }
            })
            res.status(200).json({
                ok:true,
                status:201,
                messge:"Deleted product"
            })
        } catch (error) {
            res.json(error)
        }
    }
}


export {fakeCreate, create, read, update, erase, readAll}