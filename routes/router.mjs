import express from "express"
import { exportExcell } from "../tasks/excellFilesManagment.mjs";
import { checkApiKey } from "../middleware/auth.handler.mjs";
import * as crud from "../tasks/crud.mjs"
import * as usersManagment from "../tasks/usersManagment.mjs"

const router = express.Router()

router.post("/fakeCreate", checkApiKey, crud.fakeCreate);

router.post("/create", crud.create);

router.get("/read", crud.read);

router.post("/update", crud.update);

router.post("/delete", crud.erase);

router.get("/exp", exportExcell);

router.post("/register", usersManagment.register);

router.post("/LOGIN", usersManagment.login);

export default router;
