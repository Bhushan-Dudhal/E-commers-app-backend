import { CategoryModel } from "../models/categoryModel.js";
import { productModel } from "../models/productModel.js";
import { errorHandlers } from "../utils/error.handles.js";



export const createCategory = async (req, res, next) => {
    try {
        const { category } = req.body;

        if (!category) {
            return next(errorHandlers(404, "Category is required"))

        }

        await CategoryModel.create({
            category
        })

        res.status(201).json({
            success: true,
            message: `${category} Category created successfully`
        })


    } catch (error) {
        console.log('Error While create category', error);

    }
}
export const getAll = async (req, res, next) => {
    try {
        const categorys = await CategoryModel.find({})
        res.status(201).json({
            success: true,
            message: "category get successfully",
            totalCat: categorys.length,
            categorys
        })

    } catch (error) {

        console.log(`Error While get category ${error}`);
    }
}

export const DeleteCat = async (req, res, next) => {
    try {
        const category = await CategoryModel.findById(req.params.id)

        if (!category) {
            return next(errorHandlers(404, "category not found"))
        }
        const products = await productModel.find({ category: category._id })

        for (let i = 0; i < products.length; i++) {
            const product = products[i]
            product.category = undefined
            await product.save()
        }
        res.status(200).json({
            success: true,
            message: "categgory deleted successfully"
        })

        await category.deleteOne()
    } catch (error) {
        console.log('Error While delete category', error);
        next(error.message);
    }
}

export const CategoryUpdate = async (req, res, next) => {
    try {
        const category = await CategoryModel.findById(req.params.id)

        if (!category) {
            return next(errorHandlers(404,"category not found"))
        }

        const products = await productModel.find({ category: category._id });

        const { UpdateCategory } =req.body
        for (let i = 0; i < products.length; i++) {
            const product = products[i]
            product.category =UpdateCategory;
            await product.save()
        }
        if (UpdateCategory) category.category = UpdateCategory;
        await category.save()
        res.status(200).json({
            success: true,
            message:"Category updated successfully"
        })
  } catch (error) {
        console.log('Error while category upadte', error);

        if (error.name === "CastError") {
            return res.status(500).send({
                success: false,
                message: "Invalid Id",
            });
        }
        res.status(500).send({
            success: false,
            message: "Error IN DELETE CAT API",
            error,
        });
    
    
  }
}