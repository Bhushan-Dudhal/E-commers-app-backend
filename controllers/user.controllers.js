import { userModel } from "../models/user.models.js";
import { errorHandlers } from "../utils/error.handles.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDataUri } from "../utils/feature.js";
import cloudinary from "cloudinary"






export const RegisterPOST = async (req, res, next) => {
    try {

        const { name, email, password, address, phone, answer } = req.body;

        if (!name || !email || !password || !address || !phone || !answer) {
            return next(errorHandlers(500, "Please Provide All Fields"));


        }

        const user = await userModel.findOne({ email })
        if (user) {
            return next(errorHandlers(400, "User Already Exist"))
        }

        const hash = bcryptjs.hashSync(password, 10)

        const users = await userModel.create({
            name, email, password: hash, address, phone, answer
        })

        return res.status(201).json({
            success: true,
            message: "User Register Successfully ",
            users
        })

    } catch (error) {
        console.log(`Error While User Registert ${error}`);

    }
}

export const LoginPOST = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(errorHandlers(500, "Please Provide All Fields"));
        }

        const validUsr = await userModel.findOne({ email })
        
        if (!validUsr) {
            return next(errorHandlers(400, "User Not Found"))
        }

        const isMatch = bcryptjs.compareSync(password, validUsr.password)
        if (!isMatch) {
            return next(errorHandlers(400, "Invalid Password or Email"))
        }

        const token = jwt.sign({ _id: validUsr._id }, process.env.SECRET_KEY);
        console.log(token);


        res.status(201).cookie("token", token, {
            httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, expiresIn: "7d",
            secure: process.env.NODE_ENV === "development" ? true : false,
            sameSite: process.env.NODE_ENV === "development" ? true : false,
        }).json({
            success: true,
            message: "User Login Successfully ",
            token,
            validUsr
        })
    } catch (error) {
        console.log(`Error While User Login ${error}`);

    }
}

export const UserProfile = async (req, res, next) => {
    console.log('welcome');

    const { user } = req;

    const { password, ...rest } = user._doc;

    res.status(201).json(rest)
}


export const LogoutUser = (req, res) => {
    console.log('hello');

    res.status(201).clearCookie("token")
        .json({
            success: true,
            message: "User LogOut Successfully"
        })
}

export const UpdateProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
        const { name, email, phone, address } = req.body;

        if (name) user.name = name;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (address) user.address = address;


        await user.save();
        res.status(200).json({
            success: true,
            message: "User Profile Updated "
        })
    } catch (error) {
        console.log(`Error While User upadte profile ${error}`);

    }
}


export const UpdatePassword = async (req, res, next) => {
    try {

        const user = await userModel.findById(req.user._id)
        const { OldPassword, NewPassword } = req.body;
        if (!OldPassword || !NewPassword) {
            return next(errorHandlers(500, "Please provide old or new password"))
        }

        const isMatch = bcryptjs.compareSync(OldPassword, user.password);
        if (!isMatch) {
            return next(errorHandlers(400, "Invalid old password"))
        }

        const salt = bcryptjs.genSaltSync(10);
        const hashedNewPassword = bcryptjs.hashSync(NewPassword, salt);
        user.password = hashedNewPassword;

        await user.save();

        res.status(201).json({
            success: true,
            message: "Password updated successfully"
        });
    } catch (error) {
        console.log(`Error While User Update Password ${error}`);

    }
}


export const profilePicture = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);

        // Get the file from the request
        const file = getDataUri(req.file);
        // console.log(file);

        // Destroy the existing profile picture on Cloudinary
        if (user.profilePic && user.profilePic.public_id) {
            await cloudinary.v2.uploader.destroy(user.profilePic.public_id);
        }

        // Upload the new profile picture to Cloudinary
        const cdb = await cloudinary.v2.uploader.upload(file.content);
        // console.log("Cloudinary response: ", cdb);

        // Update user's profilePic field with the new image info
        user.profilePic = {
            public_id: cdb.public_id,
            url: cdb.secure_url
        };

        // Save the updated user information
        await user.save();

        res.status(201).json({
            success: true,
            message: "Profile picture updated successfully"
        });
    } catch (error) {
        console.error("Error while updating user photo:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the profile picture",
            error: error.message || error
        });
    }
};



export const passwordResetCon = async (req, res) => {
    try {
        const { email, NewPassword, answer } = req.body;
        if (!email || !NewPassword || !answer) {
            return res.status(500).json({
                success: false,
                message: "please all fields"
            })
        }

        const user = await userModel.findOne({ email, answer })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Invalid user or answer'
            })
        }


        const newpassword = bcryptjs.hashSync(user.password, 10);
        user.password = newpassword;



        console.log(user.password);


        await user.save();

        res.status(201).json({
            success: true,
            message: "Your password Has Been Reset  Please Login !"
        })
    } catch (error) {
        console.error("Error while  password reset", error);
        res.status(500).json({
            success: false,
            message: " Error password reset  API",
            error: error.message || error
        });
    }
}
