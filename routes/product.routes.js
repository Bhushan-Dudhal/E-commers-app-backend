import express from "express";
import { CreateProduct, getAllProduct, getSingleProduct } from "../controllers/product.controllers.js";
import { isAuth } from "../middlewares/auth.middlewares.js";




const productRoutes = express.Router();

productRoutes.get("/get-all", getAllProduct)


productRoutes.get("/:id", getSingleProduct)

productRoutes.post("/create", isAuth,CreateProduct)



export default productRoutes;