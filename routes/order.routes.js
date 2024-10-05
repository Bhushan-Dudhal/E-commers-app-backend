import { createOrder, myOrders, singleOrder } from "../controllers/order.Controllers.js";
import { isAuth } from "../middlewares/auth.middlewares.js";
import express  from "express";




const orderRoutes = express.Router();



orderRoutes.post("/create", isAuth, createOrder)
orderRoutes.get("/my-orders", isAuth, myOrders)

orderRoutes.get("/my-orders/:id", isAuth, singleOrder   )







export default orderRoutes;