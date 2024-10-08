import express from "express";
import { LoginPOST, LogoutUser, passwordResetCon, profilePicture, RegisterPOST, UpdatePassword, UpdateProfile, UserProfile } from "../controllers/user.controllers.js";
import { isAuth } from "../middlewares/auth.middlewares.js";
import { singleupload } from "../middlewares/multer.js";




const routes = express.Router();




routes.post("/register", RegisterPOST)

routes.post("/login", LoginPOST)
routes.get("/profile", isAuth, UserProfile)

routes.get("/logout",isAuth,LogoutUser)
routes.put("/password", isAuth, LogoutUser)
routes.put("/profile-up", isAuth, UpdateProfile)
routes.put("/update-password", isAuth, UpdatePassword)
routes.put("/profile-pic", isAuth, singleupload, profilePicture)
routes.post("/reset-pass",passwordResetCon)













export default routes;