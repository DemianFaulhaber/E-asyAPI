import { User } from "../model/users.js";
import { Op as _Op, or } from "sequelize";
import bcrypt from "bcrypt"
const Op = _Op;

async function findByEmail(email){
    const rta = await User.findOne({
        where:{ user_email:email}
    })
    return rta;
}

async function findByName(name){
    const rta = await User.findOne({
        where:{ user_name:name}
    })
    return rta;
}

async function create(req, res){
    await User.sync()
    const body = await req.body
    const password = await bcrypt.hash(body.password, 10)
    let user = await findByName(body.name)
    if(!user){
        user = await findByEmail(body.email)
    }
    if(!user){
        const createUser = await User.create({
            user_name: body.name,
            user_password: password,
            user_email: body.email,
            role: body.role
        })
        res.status(201).json({
            ok:true,
            status:201,
            message:"Created User"
        })
    }
    if(user){
        res.status(201).json({
            ok:true,
            status:201,
            message:"Usuario ya existente"
        })
    }
}

async function checkUser(req,res){
    const name = req.body.name
    try {
        const rta = await User.findOne({
            where:{ user_name:name}
        })
        if(rta != null){
            res.json({isAvailable:true})
        }
    } catch (error){
        res.json(error)
    }
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

// //Delete singleItem on the table Products
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


export {create, findByEmail, findByName, checkUser}