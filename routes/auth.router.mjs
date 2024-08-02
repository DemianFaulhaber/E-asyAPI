import express from "express"
import passport from "passport";
import { create } from "../tasks/usersManagment.mjs";
import jwt from "jsonwebtoken"
import { config } from "../config.mjs";

const router = express.Router()

router.use(passport.initialize())

router.post('/login', passport.authenticate('local', {session:false}), async(req,res,next) =>{
    try {
        const user = req.user
        const payload={
            sub:user.user_id,
            role:user.role
        }
        const token = jwt.sign(payload, config.jwtSecret)
        res.json({
            user,
            token
        })
    } catch (error) {
        next(error);
    }
} )

router.post('/register', create)



export default router;
