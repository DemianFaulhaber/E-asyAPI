import boom from "@hapi/boom"
import { config } from "../config.js"

function checkApiKey(req,res,next){
    const apikey = req.headers['api']
    if(apikey === config.API_KEY){
        next()
    }
    else{
        next(boom.unauthorized())
    }
}

function checkRole(...roles) {
    return(req,res,next) => {
        const user = req.user
        if(roles.includes(user.role)){
            next();
        }
        else{
            next(boom.unauthorized())
        }
    }
}

export {checkApiKey, checkRole}