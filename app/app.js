import express from "express";
import morgan from "morgan";
import routerApi from "../routes/index.js";
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';
import cookieParser from "cookie-parser";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.get("/", (req,res) => {
    res.send("running on express")
})

import "../utils/auth/index.mjs"

app.use(morgan('dev'))
app.use(express.json({limit:'10mb'}))
app.use(cookieParser())
app.use(express.urlencoded({limit:'10mb',extended: true}))
app.use('/api/v1',express.static('media'))

const availableCors = ['http://localhost:5173', 'http://localhost:5174','http://localhost:5175', 'https://e-asy.com.ar', 'https://catalogue.e-asy.com.ar']

const corsOptions = {
    origin: (origin, callback) => {
        // Si no hay origen (por ejemplo, para solicitudes directas del servidor), se permite
        if (!origin) {
            return callback(null, true);
        }
        
        // Verificar si el origen está en la lista de orígenes permitidos
        if (availableCors.includes(origin)) {
          return callback(null, true);  // Permite la solicitud
        }
    
        // Si el origen no está en la lista, rechazar la solicitud
        callback(new Error('Not allowed by CORS'), false);
    },
      credentials: true, // Permite que las cookies sean enviadas
      methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
};

app.use(cors(corsOptions))

routerApi(app)

export {app}

