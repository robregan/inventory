const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const { fileSizeFormatter } = require('../utils/fileUpload.js')
const cloudinary = require('cloudinary').v2

const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, quantity, price, description } = req.body

  if (!name || !category || !quantity || !price || !description) {
    res.status(400)
    throw new Error('Please fill in all fields')
  }

  // handle image
  let fileData = {}
  if (req.file) {
    // save image to cloudinary
    let uploadedFile
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: 'inventory-products',
        resource_type: 'image',
      })
    } catch (error) {
      res.status(500)
      throw new Error('Error uploading image ')
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      size: fileSizeFormatter(req.file.size, 2),
    }
  }

  // create product
  const product = await Product.create({
    user: req.user.id,
    name,
    sku,
    category,
    quantity,
    price,
    description,
    image: fileData,
  })

  res.status(201).json(product)
})

module.exports = {
  createProduct,
}
