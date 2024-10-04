import express from "express";
import { isAuth } from "../middlewares/auth.middlewares.js";
import { createCategory, DeleteCat, getAll } from "../controllers/categoryControllers.js";





const categoryRoutes = express.Router();



categoryRoutes.post("/create",isAuth,createCategory)
categoryRoutes.get("/get-all", getAll)
categoryRoutes.delete("/delete/:id",isAuth, DeleteCat)




export default categoryRoutes;