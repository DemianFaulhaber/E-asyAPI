import express from "express"
import * as payment from "../tasks/payments.js"
const router = express.Router()

router.post("/create_preference", payment.createOrder)

export default router