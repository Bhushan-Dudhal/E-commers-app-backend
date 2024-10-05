import mongoose from "mongoose";



const orderSchema = new mongoose.Schema({
    
    shipingInfo: {
        address: {
            type: String,
            required: [true, "address is required"]
            
        },
        city: {
            type: String,
            required: [true, "city name is required"]

        },
    },
        orderItems: [
            {

                name: {
                    type: String,
                    required: [true, "product name is required"]
                },
                  price: {
                    type: Number,
                    required: [true, "product price is required"]
                },
                quantity: {
                    type: Number,
                    required: [true, "product quantity is required"]
                },
                image: {
                    type: String,
                    required: [true, "product image  is required"]
                },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Products',
                    required: true
                }
            }
        ],

    paymentMethod:{
        type: String,
        enum: ["COD", "ONLINE",],
        default:"COD",
        required: [true, "payment method is required"]
        
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:[true,"User required successfully"]
    },
    paidAt: Date,
    paymentInfo: {
        id: String,
        status: String,
        
    },
    itemPrice: {
        type: Number,
        required:[true,'items price is required']
        
    },
    tax: {
        type: Number,
        required: [true, 'tax price is required']

    },
    shippingCharges: {
        type: Number,
        required: [true, 'items shippingCharges is required']

    },
    totalAmout: {
        type: Number,
        required: [true, 'items totalAmout price is required']

    },

    orderStatus:{
        type: String,
        enum: ['processing', 'shipped', 'deliverd'],
        default:'processing'

    },
    deliverdAt:Date,
}, { timestamps: true })

export const orderModel = mongoose.model("Orders",orderSchema)