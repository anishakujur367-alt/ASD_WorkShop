const productService = require("../services/productService");

const { setCache, invalidateCache } = require("../middleware/cacheMiddleware");



async function getProducts(req, res) {
    try {
        const products = await productService.getProducts();
        setCache(req.originalUrl, products);
        
        return res.json(products);

    } catch (err) {
        console.log(err);
        return res.status(500).send("Server Error");
    }
}



async function getProductById(req, res) {
    try {
        const product = await productService.getProductById(
            req.params.id
        );

        if (!product) {
            return res.status(404).send("Product not found");
        }

        setCache(req.originalUrl, product);
        return res.json(product);

    } catch (err) {
        console.log(err);
        return res.status(500).send("Server Error");
    }
}



async function createProduct(req, res) {
    try {
        const product = await productService.createProduct(
            req.body
        );

        invalidateCache();
        return res.status(201).json(product);

    } catch (err) {
        console.log(err);
        return res.status(500).send("Server Error");
    }
}



async function updateProduct(req, res) {
    try {

        const product = await productService.updateProduct(
            req.params.id,
            req.body
        );

        if (!product) {
            return res.status(404).send("Product not found");
        }

        invalidateCache();
        return res.json(product);

    } catch (err) {
        console.log(err);
        return res.status(500).send("Server Error");
    }
}



async function patchProduct(req, res) {
    try {
        const product = await productService.patchProduct(
            req.params.id,
            req.body
        );

        if (!product) {
            return res.status(404).send("Product not found");
        }

        invalidateCache();
        return res.json(product);

    } catch (err) {
        console.log(err);
        return res.status(500).send("Server Error");
    }
}


async function deleteProduct(req, res) {
    try {
        const product = await productService.deleteProduct(
            req.params.id
        );

        if (!product) {
            return res.status(404).send("Product not found");
        }

        invalidateCache();
        return res.json(product);

    } catch (err) {
        console.log(err);
        return res.status(500).send("Server Error");
    }
}


module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};