import express from "express";

import routerApi from "../routes/index.mjs";

import cors from 'cors'

const app = express()

app.get("/", (req,res) => {
    res.send("running on express")
})

import "../utils/auth/index.mjs"

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors())

routerApi(app)

export {app}

