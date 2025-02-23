import {getAllProducts, getProductById, getProductsBySupplier, getProductsByCategory, addProduct, deleteProduct, updateProduct} from "../Models/store_db.js";

const getAllProductsCon = async (req, res) => {
    try {
        res.json(await getAllProducts());
    } catch (err) {
        console.log(err);
    }
}

const getProductsByIdCon = async (req, res) => {
    try {
        res.json(await getProductById(req.params.product_id));
    } catch (err) {
        console.log(err);
    }
}

const getProductsBySupplierCon = async (req, res) => {
    try {
        res.json(await getProductsBySupplier(req.params.supplier));
    } catch (err) {
        console.log(err);
    }
}

const getProductsByCategoryCon = async (req, res) => {
    try {
        res.json(await getProductsByCategory(req.params.category));
    } catch (err) {
        console.log(err);
    }
}

const addProductCon = async (req, res) => {
    try {
        await addProduct(req.body);
        res.json({
            message:"Product added successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

const deleteProductCon = async (req, res) => {
    try {
        await deleteProduct(req.params.product_id);
        res.json({
            message:"Product deleted successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

const updateProductCon = async (req, res) => {
    try {
        await updateProduct(req.params.product_id, req.body);
        res.json({
            message:"Product updated successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

export {getAllProductsCon, getProductsByIdCon, getProductsBySupplierCon, getProductsByCategoryCon, addProductCon, deleteProductCon, updateProductCon};