import { productModel } from "../models/productModel.js";
import { getDataUri } from "../utils/feature.js";
import cloudinary from "cloudinary"



export const getAllProduct = async (req, res, next) => {
    try {
        
        const products = await productModel.find({})
        res.status(201).json({
            success: true,
            message: 'all product fetched success',
            products
        })

    } catch (error) {
        console.log('Error While get product ',error);

        res.status(500).json({
            success: false,
            message:'Error  In Get All product Api'
        })
    }
}

export const getSingleProduct = async (req, res,) => {
    try {

        const product = await productModel.findById(req.params.id)
        console.log(product);
        
        
        if (!product) {
            return res.status(404).send({
                success: false,
                message:'product not found'
            })
        }

        res.status(201).send({
            success: true,
            message: 'product fetched success',
            product
        })

    } catch (error) {
        console.log('get single products', error);
        
        if (error.name === "CastError") {
            

        return    res.status(500).json({
                success: false,
                message: 'Invalid Id'
            })
        }
        
        res.status(500).json({
            success: false,
            message: 'Error  In Get single product Api'
        })
    }
}

export const CreateProduct = async (req, res) => {
    
    try {
        const { name, description, price, category, stock } = req.body;

        // if (!name || !description || !price || !category || !stock) {
        //     return res.status(400).json({
        //         success: false,
        //         message:"Please provide all fields"
        //     })
        // }

        if (!req.file) {
            return res.status(500).json({
                success: false,
                message: 'Please upload image'
                
             })
         }
        const file = getDataUri(req.file);
        const cdb = await cloudinary.v2.uploader.upload(file.content);
        const image = {
            public_id: cdb.public_id,
            url:cdb.secure_url
        }
        

        await productModel.create({
      name,description,price,category,stock,images:[image]
        })
        
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
        })
    } catch (error) {
        console.log('Error While cretae product',error);
        
    }
}