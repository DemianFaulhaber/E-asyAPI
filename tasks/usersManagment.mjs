import { User } from "../model/users.mjs";
import { Op as _Op, or } from "sequelize";
import bcrypt from "bcrypt"
const Op = _Op;


async function register(req, res){
    await User.sync()
    const body = req.body
    const password = await bcrypt.hash(body.password, 10)
    const createUser = await User.create({
        user_name: body.name,
        user_password: password,
        user_email: body.email,
    })
    res.status(201).json({
        ok:true,
        status:201,
        message:"Created Product"
    })
}

async function login(req, res){
    await User.sync()
    const body = req.body
    const user = await User.findOne({
        where: {
            user_name:body.user
        }
    })
    const hash = user.user_password
    const ismatch = await bcrypt.compare(body.password, hash)
    if(ismatch){
        console.log("ta bien")
    }
    else{
        console.log("ta mal")
    }
    res.status(200).json({
        ok:true,
        status:200,
        body: User
    })
}

// async function update(req, res){
//     const body = req.body
//     await Product.sync()
//     console.log(body)
//     const updateProducts = await Product.update({
//         product_name:body.name,
//         product_price: body.price,
//     },
//     {
//         where:{
//         product_id:body.id
//         }
//     }
// )
//     res.status(201).json({
//         ok:true,
//         status:201,
//         message:"Updated Products",
//         body:body
//     })
// }

// //Delete singleItem on the table Products}
// async function erase(req, res){
//     await Product.sync()
//     body = req.body
//     const deleteProduct = await Product.destroy({
//         where: {
//             product_id:body.id 
//         }
//     })
//     res.status(200).json({
//         ok:true,
//         status:201,
//         messge:"Deleted product"
//     })
// }


export {register, login}