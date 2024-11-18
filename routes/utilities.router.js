import express from "express"
import { exportExcellAll, exportExcellCategory } from "../tasks/excellFilesManagment.js";
import { checkRole } from "../middleware/auth.handler.js";
import passport from "passport";
import * as product_management from "../tasks/product_management.js"
import { galleryCreation } from "../middleware/file.handler.js";


const router = express.Router()


//Eliminar de producción (inutil)
router.post("/fakeCreate", passport.authenticate('jwt', {session:false}), checkRole('admin', 'customer'), product_management.fakeCreate);

router.post("/create", passport.authenticate('jwt', {session:false}), checkRole('admin','customer'), product_management.create);

router.post("/createTable", passport.authenticate('jwt', {session:false}), checkRole('admin', 'customer'), product_management.createTable);

router.post("/readUserTables", passport.authenticate('jwt', {session:false}), checkRole('admin', 'customer'), product_management.readUserTables)

router.post("/read", product_management.read);

router.post("/update", passport.authenticate('jwt', {session:false}), checkRole('admin', 'customer'), galleryCreation, product_management.update);

// router.post("/updateImg", passport.authenticate('jwt', {session:false}), checkRole('admin', 'customer'), galleryCreation, product_management.updateImg);
//PORFAVOR ELIMINAR PRA PROUDCCIÓN, VULNERABILIDAD
router.post("/readAll", product_management.readAll);

router.post("/delete", passport.authenticate('jwt', {session:false}), checkRole('admin', 'customer'), product_management.erase);

//BORRAR VERIFICACIÓN DE JWT PARA PRODUCCIÓN (usar .env basado en subdominio)
router.get("/exp", exportExcellAll);

router.post("/catExp", exportExcellCategory)

export default router;
