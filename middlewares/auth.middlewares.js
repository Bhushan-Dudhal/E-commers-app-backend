import { userModel } from "../models/user.models.js";
import { errorHandlers } from "../utils/error.handles.js";
import jwt from "jsonwebtoken";



export const isAuth = async (req, res, next) => {
    const { token } = req.cookies;
    //valdiation
    if (!token) {
        return res.status(401).send({
            success: false,
            message: "UnAuthorized User",
        });
    }
    const decodeData = jwt.verify(token, process.env.SECRET_key);
    req.user = await userModel.findById(decodeData._id);
    next();
}

//admin auth


export const isAdmin = async (req, res, next) => {
    try {


        if (req.user.role !== "admin") {
            return res.status(401).json({
                status: false,
                message: "You are not an admin",
            })
        }


        next()
    } catch (error) {
        console.log(`Error While is Admin Auth ${error}`);

    }
}