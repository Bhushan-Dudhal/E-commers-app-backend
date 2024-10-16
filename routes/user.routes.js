import express from "express";
import { LoginPOST, LogoutUser, passwordResetCon, profilePicture, RegisterPOST, UpdatePassword, UpdateProfile, UserProfile } from "../controllers/user.controllers.js";
import { isAuth } from "../middlewares/auth.middlewares.js";
import { singleupload } from "../middlewares/multer.js";
import {rateLimit} from "express-rate-limit"



const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-7',
    legacyHeaders:false
})

const routes = express.Router();




routes.post("/register",limiter, RegisterPOST)

routes.post("/login",limiter, LoginPOST)
routes.get("/profile", isAuth, UserProfile)

routes.get("/logoutt",isAuth,LogoutUser)
routes.put("/password", isAuth, LogoutUser)
routes.put("/profile-up", isAuth, UpdateProfile)
routes.put("/update-password", isAuth, UpdatePassword)
routes.put("/profile-pic", isAuth, singleupload, profilePicture)
routes.post("/reset-pass",passwordResetCon)













export default routes;