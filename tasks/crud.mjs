import {Product} from "../model/products.mjs"
import { Op as _Op } from "sequelize";
import { faker } from "@faker-js/faker";
const Op = _Op;

//faker create REMOVE FROM PRODUCTION
async function fakeCreate(req, res){
    await Product.sync()
    const user = req.user
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
}

//Create Table products (modify by dinamic reading of tables for multiple tables databases)
async function create(req, res){
    await Product.sync()
    const body = req.body
    const createProduct = await Product.create({
        product_name: body.name,
        product_price: body.price,
        product_category: body.category,
    })
    res.status(201).json({
        ok:true,
        status:201,
        message:"Created Product"
    })
}

//Read table products (same as the other function)
async function read(req, res){
    const user = req.user
    const products = await Product.findAll({
        where:{user_id:user.sub}
    })
    res.status(200).json({
        ok:true,
        status:200,
        body: products
    })
}

//Update Table Products (U already know the deal)
async function update(req, res){
    const body = req.body
    await Product.sync()
    console.log(body)
    const updateProducts = await Product.update({
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
}

//Delete singleItem on the table Products}
async function erase(req, res){
    await Product.sync()
    body = req.body
    const deleteProduct = await Product.destroy({
        where: {
            product_id:body.id 
        }
    })
    res.status(200).json({
        ok:true,
        status:201,
        messge:"Deleted product"
    })
}


export {fakeCreate, create, read, update, erase}