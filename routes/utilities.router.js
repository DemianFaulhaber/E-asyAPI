import express from "express"
import { exportExcellAll, exportExcellCategory } from "../tasks/excellFilesManagment.js";
import { checkRole } from "../middleware/auth.handler.js";
import passport from "passport";
import multer from "multer";
import sharp from "sharp";
import * as crud from "../tasks/crud.js"
import { media} from "../middleware/file.handler.js";


const router = express.Router()

router.post("/fakeCreate", passport.authenticate('jwt', {session:false}), checkRole('admin'), crud.fakeCreate);

router.post("/create", passport.authenticate('jwt', {session:false}), checkRole('admin'), crud.create);

router.post("/read", crud.read);

router.post("/update", media.single('image'), crud.update);

router.post("/readAll", crud.readAll);

router.post("/delete", passport.authenticate('jwt', {session:false}), checkRole('admin'), crud.erase);

//BORRAR VERIFICACIÓN DE JWT PARA PRODUCCIÓN (usar .env basado en subdominio)
router.get("/exp", exportExcellAll);

router.post("/catExp", exportExcellCategory)

export default router;
