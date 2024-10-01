import mongoose from "mongoose";



const categorySchema = new mongoose.Schema({
  
    category: {
        type: String,
        required: [true, "category  is requred"]
    },
 
},{timestamps:true})

export const CategoryModel = mongoose.model("Category",categorySchema)