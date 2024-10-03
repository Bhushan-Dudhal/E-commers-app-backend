import express from "express";
import { CreateProduct, DeleteProductsImage, getAllProduct, getSingleProduct, UpdateProductCon, UpdateProductImage, } from "../controllers/product.controllers.js";
import { isAuth } from "../middlewares/auth.middlewares.js";
import { singleupload } from "../middlewares/multer.js";





const productRoutes = express.Router();

productRoutes.get("/get-all", getAllProduct)


productRoutes.get("/:id", getSingleProduct)

productRoutes.post("/create",  singleupload, CreateProduct)

productRoutes.put("/:id", isAuth, UpdateProductCon)

productRoutes.put("/image/:id", isAuth, singleupload, UpdateProductImage)

productRoutes.delete("/delete-image/:id", isAuth, DeleteProductsImage)





export default productRoutes;