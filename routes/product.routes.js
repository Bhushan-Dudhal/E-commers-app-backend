import express from "express";
import { CreateProduct, DeleteProduct, DeleteProductsImage, getAllProduct, getSingleProduct, ProductReview, TopProduct, UpdateProductCon, UpdateProductImage, } from "../controllers/product.controllers.js";
import { isAdmin, isAuth } from "../middlewares/auth.middlewares.js";
import { singleupload } from "../middlewares/multer.js";





const productRoutes = express.Router();

productRoutes.get("/get-all", getAllProduct)

productRoutes.get("/top", TopProduct)



productRoutes.get("/:id", getSingleProduct)

productRoutes.post("/create",isAuth,isAdmin,singleupload, CreateProduct)

productRoutes.put("/:id", isAuth,isAdmin, UpdateProductCon)

productRoutes.put("/image/:id", isAuth,isAdmin, singleupload, UpdateProductImage)

productRoutes.delete("/delete-image/:id", isAuth,isAdmin, DeleteProductsImage)

productRoutes.delete("/delete-product/:id", isAuth,isAdmin, DeleteProduct)

productRoutes.put('/:id/review',isAuth,ProductReview)





export default productRoutes;