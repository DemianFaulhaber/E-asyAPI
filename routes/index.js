import express from "express"
import authRouter from "./auth.router.js"
import utilitiesRouter from "./utilities.router.js"

function routerApi(app){
    const router = express.Router()
    app.use('/api/v1', router);
    router.use('/auth', authRouter);
    router.use('/utilities', utilitiesRouter);
}

export default routerApi