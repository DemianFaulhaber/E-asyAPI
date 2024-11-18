import { Menu_product, Menu_list } from "../model/menu_products.js";
import { Catalogue_product, Catalogue_list } from "../model/catalogue.js";
import { Op as _Op } from "sequelize";
import { faker } from "@faker-js/faker";
import { galleryCreation } from "../middleware/file.handler.js";
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
    try {
        if(table === "menu"){
            const createdProduct = await Menu_product.create({
                product_name:body.name,
                product_price:body.price,
                product_category:body.category,
                menu_id:body.menu
            })
            res.status(201).json({
                ok:true,
                message:"Created product",
                body:createdProduct
            })
        }
        else if(table === "catalogue"){
            const createdProduct = await Catalogue_product.create({
                product_name:body.name,
                product_price:body.price,
                product_category:body.category,
                catalogue_id:body.catalogue,
                isOff:body.isOff,
                isNew:body.isNew
            })
            res.status(201).json({
                ok:true,
                message:"Created product",
                body:createdProduct
            })
        }
        else{
            return res.status(201).json({
                message:"producto invalido"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// Create tables using the "table" value for variations on product (catalogues or menues)
async function createTable(req,res){
    const user = req.body.user
    const name = req.body.name
    const service = req.body.service
    try {
        if(service === "menu"){
            const created_list = await Menu_list.create({
                user_id: user,
                menu_name: name
            })
            return res.status(200).json(created_list)
        }
        else if(service === "catalogue"){
            const created_list = await Catalogue_list.create({
                user_id:user,
                catalogue_name: name
            })
            return res.status(200).json(created_list)
        }
        else{
            return res.status(500).json({message:"Petición incorrecta",body:req.body})
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

//Read table products (erase the bypass, it should be able to be seen for everyone)
async function read(req, res){
    const body = req.body
    if(body.table === "menu"){
        try {
            const products = await Menu_product.findAll({
                where:{menu_id:body.menu}
            })
            res.status(200).json({
                ok:true,
                status:200,
                body: products[0]
            })
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
        }
    }
    else if(body.table === "catalogue"){
        try {
            const products = await Catalogue_product.findAll({
                where:{catalogue_id:body.catalogue}
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


async function updateImg(req,res){
    // console.log(req.body)
    if(!req.file){
        return res.status(404).json({message:"no image uploaded"})
    }
    else{
        return res.status(202).json({message:"image updated"})
    }
}

//Update on Prodcuts tables
async function update(req, res){
    const body = req.body
    const table = body.table

    // console.log(body)
    if(table==="menu"){
        await Menu_product.sync()
        try {
            const updateProducts = await Menu_product.update({
                product_name:body.name,
                product_price: body.price,
                product_desc:body.desc
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
            body:updateProducts
        })
        } catch (error) {
            res.json(error)
        }
    }
    else if(table==="catalogue"){
        await Catalogue_product.sync()
        try {
            const updateProducts = await Catalogue_product.update({
                product_name:body.name,
                product_price: body.price,
                product_desc:body.desc
            },
            {
                where:{
                product_id:body.id
                }
            }
        )
        if(!req.file){
            return res.status(201).json({
                ok:true,
                status:201,
                message:"Updated Products",
                body:body
            })
        }
        else{
            return res.status(200).json({
                message:"articulo e imagen actualizado exitosamente",
                file:req.file,
                body:updateProducts
            })   
        }
        } catch (error) {
            return res.json(error)
        }
    }
    else{
        console.log(req.body)
        return res.status(400).json("non valid table has been gived")
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

async function readUserTables(req,res){
    const body = req.body
    try{
        if(body.service === "catalogue"){
            const catalogues = await Catalogue_list.findAll({
                where:{user_id:body.user}
            })
            if(catalogues.length > 0){
                res.status(200).json({
                    ok:true,
                    status:200,
                    body:catalogues[0]
                })
            }
            else{
                res.status(400)
            }
        }
        else if(body.service === "menu"){
            const menues = await Menu_list.findAll({
                where:{user_id:body.user}
            })
            if(menues.length > 0){
                res.status(200).json({
                    ok:true,
                    status:200,
                    body:menues
                })
            }
            else{
                res.status(400)
            }
        }
    }
    catch (error){
        res.status(500).json(error)
    }
}

export {fakeCreate, create, read, update, erase, readAll, createTable, readUserTables, updateImg}