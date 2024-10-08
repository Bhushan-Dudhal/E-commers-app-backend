import { ChangeOrderStatus, createOrder, getAllOrders, myOrders, PymentsCon, singleOrder } from "../controllers/order.Controllers.js";
import { isAdmin, isAuth } from "../middlewares/auth.middlewares.js";
import express from "express";




const orderRoutes = express.Router();



orderRoutes.post("/create", isAuth, createOrder)
orderRoutes.get("/my-orders", isAuth, myOrders)

orderRoutes.get("/my-orders/:id", isAuth, singleOrder)

//acceipt payments

orderRoutes.post("/payment", isAuth, PymentsCon)

//admin panel

orderRoutes.get("/admin/get-all-orders", isAdmin, getAllOrders);

//change order status

orderRoutes.put("/admin/order/:id", isAuth,isAdmin, ChangeOrderStatus)







export default orderRoutes;