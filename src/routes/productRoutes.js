const express = require("express");

const router = express.Router();

const { getProducts, getProductById, createProduct, updateProduct, patchProduct, deleteProduct } = require("../controllers/productController");

const { cacheMiddleware } = require("../middleware/cacheMiddleware");



router.get( "/products", cacheMiddleware, getProducts);

router.get( "/products/:id", cacheMiddleware, getProductById );

router.post( "/products", createProduct );

router.put( "/products/:id", updateProduct );

router.patch( "/products/:id", patchProduct);

router.delete( "/products/:id", deleteProduct );


module.exports = router;