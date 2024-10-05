import { productModel } from "../models/productModel.js";
import { errorHandlers } from "../utils/error.handles.js";
import cloudinary from "cloudinary"
import getDataUri from "../utils/feature.js";



export const getAllProduct = async (req, res, next) => {
    try {

        const products = await productModel.find({})
        res.status(201).json({
            success: true,
            message: 'all product fetched success',
            products
        })

    } catch (error) {
        console.log('Error While get product ', error);

        res.status(500).json({
            success: false,
            message: 'Error  In Get All product Api'
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
                message: 'product not found'
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


            return res.status(500).json({
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
        const { name, description, price, category, stock, quantity } = req.body;

        // Validate required fields
        // if (!name || !description || !price || !category || !stock) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Please provide all required fields",
        //     });
        // }

        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload an image',
            });
        }

        // Convert file to Data URI for Cloudinary upload
        const file = getDataUri(req.file);

        // Upload to Cloudinary
        const cdb = await cloudinary.v2.uploader.upload(file.content);

        // Prepare image object for saving in DB
        const image = {
            public_id: cdb.public_id,
            url: cdb.secure_url,
        };

        // Create new product in the database
        const product = await productModel.create({
            name,
            description,
            price,
            category,
            quantity,
            stock,
            images:[image],
        });

        // Return success response
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product, // Optionally, you can return the created product
        });

    } catch (error) {
        // Log and handle errors
        console.error( error);

        return res.status(500).json({
            success: false,
            message: 'Error while creating product',
            error: error.message,
        });
    }
};

export const UpdateProductCon = async (req, res, next) => {
    try {

        const product = await productModel.findById(req.params.id)

        if (!product) {
            return next(errorHandlers(400, "product not found"))
        }

        const { name, description, price, stock, category } = req.body;
        if (name) product.name = name
        if (description) product.description = description
        if (price) product.price = price
        if (stock) product.stock = stock
        if (category) product.category = category


        await product.save()

        res.status(201).json({
            success: true,
            message: "product details updated"
        })


    } catch (error) {
        console.log("Error While update product", error);

        res.status(500).json({
            success: false,
            message: 'Error  In update product Api'
        })
    }
}

export const UpdateProductImage = async (req, res, next) => {
    try {

        const product = await productModel.findById(req.params.id)



        if (!product) {
            return next(errorHandlers(400, "product not found"))
        }
        if (!req.file) {
            return next(errorHandlers(404, " product image not found "))
        }

        const file = getDataUri(req.file)
        const cdb = await cloudinary.v2.uploader.upload(file.content)
        const image = {
            public_id: cdb.public_id,
            url: cdb.secure_url
        }

        product.images.push(image)

        await product.save();
        res.status(201).json({
            success: true,
            message: "product image updated"
        })
    } catch (error) {
        console.log('Error While product update image ', error);

    }
}

export const DeleteProductsImage = async (req, res, next) => {
    try {

        const product = await productModel.findById(req.params.id);

        if (!product) {
            return next(errorHandlers(404, "product not found"))
        }
        //image id find

        const id = req.query.id;


        if (!id) {
            return next(errorHandlers(404, "product image not found"))
        }

        let isExist = -1;
        product.images.forEach((item, index) => {
            if (item._id.toString() === id.toString()) isExist = index;
        });
        if (isExist < 0) {
            return res.status(404).send({
                success: false,
                message: "Image Not Found",
            });
        }
        // DELETE PRODUCT IMAGE
        await cloudinary.v2.uploader.destroy(product.images[isExist].public_id);
        product.images.splice(isExist, 1);
        await product.save();
        return res.status(200).send({
            success: true,
            message: "Product Image Dleteed Successfully",
        });

    } catch (error) {

        console.log('Error While product updated', error);

    }
}

export const DeleteProduct = async (req, res, next) => {
    try {
        
        const product = await productModel.findById(req.params.id)
        
        if (!product) {
            return next(errorHandlers(400, "product not found"));
        }
            for (let index = 0; index < product.images.length; index++){
                await cloudinary.v2.uploader.destroy(product.images[index].public_id);
            }
            await product.deleteOne();
            res.status(201).json({
                success: true,
                message: "Product Deleted Successfully",
            })
        
    } catch (error) {

        console.log("Error While delete product", error);

        res.status(500).json({
            success: false,
            message: 'Error  In delete product Api'
        }) 
    }
}

