import express from "express"
import { exportExcell } from "../tasks/excellFilesManagment.js";
import { checkRole } from "../middleware/auth.handler.js";
import passport from "passport";
import multer from "multer";
import sharp from "sharp";
import * as crud from "../tasks/crud.js"

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'media')
    },
    filename: function(req,file,cb){
        const format = file.originalname.split('.').pop()
        cb(null, `${req.body.id}.${format}`)
    }
})

const media = multer({storage:storage})


const router = express.Router()

router.post("/fakeCreate", passport.authenticate('jwt', {session:false}), checkRole('admin'), crud.fakeCreate);

router.post("/create", passport.authenticate('jwt', {session:false}), checkRole('admin'), crud.create);

//BORRAR VERIFICACIÓN DE JWT PARA PRODUCCIÓN (usar .env basado en subdominio)
router.post("/read", crud.read);

router.post("/update", media.single('image'), crud.update);

router.post("/readAll", crud.readAll);

router.post("/delete", passport.authenticate('jwt', {session:false}), checkRole('admin'), crud.erase);

//BORRAR VERIFICACIÓN DE JWT PARA PRODUCCIÓN (usar .env basado en subdominio)
router.get("/exp", exportExcell);

export default router;
