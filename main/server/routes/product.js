import { Router } from 'express'
import { createProduct, getAllProducts, updateProduct, removeProduct, getProductDetails } from '../controllers/product.js'
import { isAutheticantedUser, authorizeRoles } from '../middleware/auth.js'

const router = new Router()

//  Get all products
//  http://localhost:3001/api/product
router.get('/', getAllProducts)

//  Get Product Details
//  http://localhost:3001/api/product/:id
router.get('/:id', getProductDetails)

//  Create product
//  http://localhost:3001/api/product/createProduct
router.post('/createProduct', isAutheticantedUser, authorizeRoles('admin'), createProduct)

//  Update Product
//  http://localhost:3001/api/product/updateProduct/:id
router.put('/updateProduct/:id', isAutheticantedUser, authorizeRoles('admin'), updateProduct)

//  Delete product
//  http://localhost:3001/api/product/removeProduct/:id
router.delete('/removeProduct/:id', isAutheticantedUser, authorizeRoles('admin'), removeProduct)



export default router