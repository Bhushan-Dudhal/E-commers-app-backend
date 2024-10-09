import mongoose from "mongoose";

//reviel model

const revielSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true," name is requred"]
    },
    rating: {
        type: Number,
        default:0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true," User is requred"]
    }
},{timestamps:true})


const prodctSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "product name is requred"]
    },
    description: {
        type: String,
        required: [true, "product description is requred"]

    },
    price: {
        type: Number,
        required: [true, "product price is requred"],
    },
    stock: {
        type: Number,
        required: [true, "product stock is requred"],

    },
    quantity: {
        type: Number,
        required: [true, "product quantity is requred"],

    },
    category: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    images: [
        {
            public_id: String,
            url: String
        }
    ],
    reviews: [revielSchema],
    rating: {
        type: Number,
        default:0
    },
    numReviews: {
        type: Number,
        default:0
    }
}, { timestamps: true })



export const productModel = mongoose.model("Products", prodctSchema);
