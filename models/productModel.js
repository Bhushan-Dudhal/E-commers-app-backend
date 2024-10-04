import mongoose from "mongoose";

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
    category: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    images: [
        {
            public_id: String,
            url: String
        }
    ]
}, { timestamps: true })



export const productModel = mongoose.model("productModel", prodctSchema);
