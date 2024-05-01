import { Router } from "express";
import { adminLogin} from "../controllers/admin.controller.js"
// import {upload} from "../middlewares/multer.middleware.js"
// import {verifyJwt} from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/login").post(adminLogin)


export default router;