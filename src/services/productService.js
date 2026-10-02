const { readProducts, writeProducts } = require("../database/productDatabase");

async function getProducts() {
    return await readProducts();
}


async function getProductById(id) {
    const products = await readProducts();

    return products.find((product) => {
        return product.id === Number(id);
    });
}


async function createProduct(productData) {
    const products = await readProducts();

    const newProduct = {
        id: productData.id,
        name: productData.name,
        price: productData.price
    };

    products.push(newProduct);

    await writeProducts(products);

    return newProduct;
}


async function updateProduct(id, productData) {
    const products = await readProducts();

    const index = products.findIndex((product) => {
        return product.id === Number(id);
    });

    if (index === -1) {
        return null;
    }

    products[index] = {
        id: Number(id),
        name: productData.name,
        price: productData.price
    };

    await writeProducts(products);

    return products[index];
}


async function patchProduct(id, productData) {
    const products = await readProducts();

    const index = products.findIndex((product) => {
        return product.id === Number(id);
    });

    if (index === -1) {
        return null;
    }

    products[index] = {
        ...products[index],
        ...productData,
        id: Number(id)
    };

    await writeProducts(products);

    return products[index];
}


async function deleteProduct(id) {
    const products = await readProducts();

    const index = products.findIndex((product) => {
        return product.id === Number(id);
    });

    if (index === -1) {
        return null;
    }

    const deletedProduct = products.splice(index, 1)[0];

    await writeProducts(products);

    return deletedProduct;
}


module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};