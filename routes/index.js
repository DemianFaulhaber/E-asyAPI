import express from "express"
import authRouter from "./auth.router.js"
import utilitiesRouter from "./utilities.router.js"
import paymentRouter from "./payment.router.js"

function routerApi(app){
    const router = express.Router()
    app.use('/api/v1', router);
    router.use('/auth', authRouter)
    router.use('/utilities', utilitiesRouter)
    router.use('/payment', paymentRouter)
}

export default routerApi