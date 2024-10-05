import { orderModel } from "../models/orderModel.js";
import { productModel } from "../models/productModel.js";




export const createOrder = async (req, res, next) => {
    try {
        const { shipingInfo, orderItems, paymentMethod, paymentInfo, itemPrice, tax, shippingCharges, totalAmout, orderStatus } = req.body;


        // if (!shipingInfo || !orderItems || !paymentMethod || !paymentInfo || !itemPrice || tax || !shippingCharges ||!totalAmout||!orderStatus) {
        //     return next(errorHandlers(404, "all filid is required"));
        // }


        await orderModel.create({
            user: req.user._id,
            shipingInfo, orderItems, paymentMethod, paymentInfo, itemPrice, tax, shippingCharges, totalAmout, orderStatus
        })
        for (let i = 0; i < orderItems.length; i++) {
            const product = await productModel.findById(orderItems[i].product);
            product.stock -= orderItems[i].quantity;

            await product.save()




        }

        res.status(201).json({
            success: true,
            message: "order placed   successfully",

        })

    } catch (error) {
        console.log("Error While create order :", error);

        
        res.status(500).json({
            success: false,
            message: 'Error  In  create order  Api'
        })
    }
}


export const myOrders = async (req, res, next) => {
    try {
        // Ensure req.user is populated correctly
        if (!req.user || !req.user._id) {
            return res.status(400).json({
                success: false,
                message: "User not authenticated"
            });
        }

        const orders = await orderModel.find({ user: req.user._id });

        if (!orders || orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No orders found for this user"
            });
        }

        res.status(200).json({
            success: true,
            message: "User's orders fetched successfully",
            totalOrders: orders.length,
            orders
        });
    } catch (error) {
        console.error("Error in myOrders API:", error);
        res.status(500).json({
            success: false,
            message: 'Error myOrders orders',
        });
    }
};

export const singleOrder = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id)
        
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'order not found',
            });
        }

        res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            order
        })
        
    } catch (error) {
        console.error("Error in single order API:", error);

        if (error.name === "CastError") {
            return res.status(500).send({
                success: false,
                message: "Invalid Id",
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error single order orders',
        });
    }
}
