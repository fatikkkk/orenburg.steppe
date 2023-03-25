import Product from '../models/Product.js'
import ErrorHandler from '../utils/errorhandler.js'
import catchAsyncError from '../middleware/catchAsyncError.js'
import ApiFeatures from '../utils/apifeatures.js'

//  -- Get All Products --
export const getAllProducts = catchAsyncError(async (req, res) => {

    const resultPage = 5
    const productCount = await Product.countDocuments()


    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPage)

    const products = await apiFeature.query
    res.status(200).json({
        success: true,
        products,
    })
})

//  -- Get Detalis Product --
export const getProductDetails = catchAsyncError(async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return next(new ErrorHandler("Product not found", 404))
            // res.status(500).json({
            //     success: false,
            //     message: "Product not found",
            // })
        }

        res.status(200).json({
            success: true,
            product,
            productCount,
        })

    } catch (error) {
        console.log(error)
        res.json({ message: "Error found Product" })
    }
})

//  -- Create Product -- Admin
export const createProduct = catchAsyncError(async (req, res, next) => {

    req.body.user = req.user.id

    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product,
    })
    // try {
    //     const product = await Product.create(req.body)

    //     res.status(201).json({
    //         success: true,
    //         product,
    //     })
    // } catch (error) {
    //     console.log(error)
    //     res.json({ message: 'Error create product' })
    // }
})

//  -- Update Product -- Admin
export const updateProduct = catchAsyncError(async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id)

        if (!product) {
            return next(new ErrorHandler("Product not found", 404))
            // res.status(500).json({
            //     success: false,
            //     message: "Product not found",
            // })
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })

        res.status(200).json({
            success: true,
            product,
        })

    } catch (error) {
        console.log(error)
        res.json({ message: "Error update Product" })
    }
})

//  -- Delete Product -- Admin
export const removeProduct = catchAsyncError(async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return next(new ErrorHandler("Product not found", 404))
            // res.status(500).json({
            //     success: false,
            //     message: "Product not found",
            // })
        }

        await product.remove()

        res.status(200).json({
            success: true,
            message: "Product Delete successfully"
        })

    } catch (error) {
        console.log(error)
        res.json({ message: "Error Delete Product" })
    }
})

