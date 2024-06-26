const router = require('express').Router()
const json = require('express').json()
const {faker} = require("@faker-js/faker")
const Products = require("../model/products")
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//faker create REMOVE FROM PRODUCTION
router.post("/fakeCreate", async (req, res) => {
    await Products.sync()
    const createProduct = await Products.create({
        product_name: faker.commerce.product(),
        product_price: faker.commerce.price(),
    })
    res.status(201).json({
        ok:true,
        status:201,
        message:"Created Product"
    })
});


//Create Table products (modify by dinamic reading of tables for multiple tables databases)
router.post("/create", async (req, res) => {
    await Products.sync()
    const body = req.body
    const createProduct = await Products.create({
        product_name: body.name,
        product_price: body.price,
        product_category: body.category,
    })
    res.status(201).json({
        ok:true,
        status:201,
        message:"Created Product"
    })
});

//Read table products (same as the other function)
router.get("/read", async (req, res) => {
    const products = await Products.findAll()
    res.status(200).json({
        ok:true,
        status:200,
        body: products
    })
});

//Read Just one product
router.get("/readOne", async (req, res) => {
    const body = req.body
    const product = await Products.findAll({
        where:{
            product_name:{[Op.like]: "%"+body.name+"%"}
        }
    });
    if (product === null){
        console.log('Product not found');
    }
    else{
        res.status(200).json({
            ok:true,
            status:200,
            body: product 
        })
    }
});

//Update Table Products (U already know the deal)
router.post("/update", async (req,res) => {
    const body = req.body
    await Products.sync()
    const updateProducts = await Products.update({
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
})

//Delete singleItem on the table Products
router.post("/delete", async (req,res) => {
    await Products.sync
    body = req.body
    const deleteProduct = await Products.destroy({
        where: {
            product_id:body.id 
        }
    })
    res.status(200).json({
        ok:true,
        status:201,
        messge:"Deleted product"
    })
})

module.exports = router;
