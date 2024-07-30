import express from "express";

import router from "../routes/router.mjs";

import cors from 'cors'

const app = express()



app.get("/", (req,res) => {
    res.send("running on express")
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors())

app.use("/api/v1", router)

export {app}

