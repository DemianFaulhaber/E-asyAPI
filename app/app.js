import express from "express";
import morgan from "morgan";
import routerApi from "../routes/index.js";

import cors from 'cors'

import cookieParser from "cookie-parser";

const app = express()



app.get("/", (req,res) => {
    res.send("running on express")
})

import "../utils/auth/index.mjs"

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.static('media'))

const corsOptions = {
    origin: 'http://localhost:5173', // DEV ONLY MODIFICAR PORFA
    credentials: true, 
    };

app.use(cors(corsOptions))

routerApi(app)

export {app}

