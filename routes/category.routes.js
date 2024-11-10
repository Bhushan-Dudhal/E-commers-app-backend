import express from "express";
import { isAdmin, isAuth } from "../middlewares/auth.middlewares.js";
import { CategoryUpdate, createCategory, DeleteCat, getAll } from "../controllers/categoryControllers.js";





const categoryRoutes = express.Router();



categoryRoutes.post("/create", isAuth,isAdmin,createCategory)
categoryRoutes.get("/get-all", getAll)
categoryRoutes.delete("/delete/:id", isAuth, isAdmin, DeleteCat) 
categoryRoutes.put("/update/:id", isAuth, isAdmin, CategoryUpdate)
export default categoryRoutes;