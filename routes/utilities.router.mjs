import express from "express"
import { exportExcell } from "../tasks/excellFilesManagment.mjs";
import { checkRole } from "../middleware/auth.handler.mjs";
import passport from "passport";
import * as crud from "../tasks/crud.mjs"


const router = express.Router()

router.post("/fakeCreate", passport.authenticate('jwt', {session:false}), checkRole('admin'), crud.fakeCreate);

router.post("/create", passport.authenticate('jwt', {session:false}),checkRole('admin'), crud.create);

router.get("/read", passport.authenticate('jwt', {session:false}),checkRole('admin','customer'), crud.read);

router.post("/update", passport.authenticate('jwt', {session:false}),checkRole('admin'), crud.update);

router.post("/delete", passport.authenticate('jwt', {session:false}), checkRole('admin'), crud.erase);

router.get("/exp", passport.authenticate('jwt', {session:false}),checkRole('admin','customer'), exportExcell);

export default router;
