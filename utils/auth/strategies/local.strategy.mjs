import { Strategy } from "passport-local";
import * as usersManagment from "../../../tasks/usersManagment.js";
import boom  from "@hapi/boom";
import bcrypt from "bcrypt"


const localStrategy = new Strategy({
    usernameField:'user',
    passwordField:'password'
    },  
    async (username, password, done) =>{
    try {
        let user = await usersManagment.findByEmail(username)
        if (!user){
            user = await usersManagment.findByName(username)
        }
        if (!user){
            done(boom.unauthorized(), false)
        }
        const ismatch = await bcrypt.compare(password, user.user_password)
        if (!ismatch){
            done(boom.unauthorized(), false)
        }
        done(null, user)
    } catch (error) {
        done(error, false)
    }

});

export default localStrategy