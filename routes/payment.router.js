import express from "express"
import * as payment from "../tasks/payments.js"
const router = express.Router()

router.post("/pay", payment.CreatePreference)

export default router