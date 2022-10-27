const express = require('express')
const router = express.Router()
const { createProduct } = require('../controllers/productController.js')
const protect = require('../middleware/authMiddleware.js')
const { upload } = require('../utils/fileUpload.js')

router.post('/', protect, upload.single('image'), createProduct)

module.exports = router
