import { userModel } from "../models/user.models.js";
import { errorHandlers } from "../utils/error.handles.js";
import jwt from "jsonwebtoken";



export const isAuth = async (req, res, next) => {
    try {

        const { token } = req.cookies;
        
        console.log(token);
        
                                                                                                      

        if (!token) {
            return next(errorHandlers(401, "You must be logged in to access this"));
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);

        const user = await userModel.findById(decode._id)
        console.log(user);
        
        if (!user) {
            return next(errorHandlers(404, "Invalid Cookies id"))
        }

        req.user=user;
        
        next()

    } catch (error) {
        console.log(`Error While use auth ${error}`);
    }
}