import express from "express"
import passport from "passport";
import { checkUser, create, findByName } from "../tasks/usersManagment.js";
import jwt from "jsonwebtoken"
import { config } from "../config.js";

const router = express.Router()

router.use(passport.initialize())

router.post('/login', passport.authenticate('local', {session:false}), async(req,res,next) =>{
    try {
        const user = req.user
        const payload={
            sub:user.user_id,
            role:user.role,
            name:user.user_name
        }
        const token = jwt.sign(payload, config.JWT_SECRET)
        res.header('Access-Control-Allow-Credentials', 'true');
        res.cookie("jwt",token,{
            sameSite: 'None',
            httpOnly:false,
            domain:"localhost",
            path:"/",
            secure:true,
            maxAge:3600000
        })
        res.json(token)
    } catch (error) {
        res.json(error);
    }
} )

router.post('/register', create)

router.post('/check', checkUser)

export default router;
