import {pool} from "../config/config.js";

const getAllProducts = async () => {
    let [data] = await pool.query("SELECT * FROM store ORDER BY category DESC");
    return data
}


const getProductById = async (product_id) => {
    let [data] = await pool.query("SELECT * FROM store WHERE product_id = ?", [product_id]);
    return data
}


const getProductsBySupplier = async (supplier) => {
    let [data] = await pool.query("SELECT * FROM store WHERE supplier = ?", [supplier]);
    return data
}


const getProductsByCategory = async (category) => {
    let [data] = await pool.query("SELECT * FROM store WHERE category = ?", [category]);
    return data
}


const addProduct = async (product_id,name,description,price,stock,supplier,category,image_url) => {
    let [data] = await pool.query("INSERT INTO store (product_id,name,description,price,stock,supplier,category,image_url) VALUES (?,?,?,?,?,?,?,?)", [product_id,name,description,price,stock,supplier,category,image_url]);
}


const deleteProduct = async (product_id) => {
    let [data] = await pool.query("DELETE FROM store WHERE product_id = ?", [product_id]);
}


const updateProduct = async (product_id,name,description,price,stock,supplier,category,image_url) => {
    let [data] = await pool.query("UPDATE store SET name = ?, description = ?, price = ?, stock = ?, supplier = ?, category = ?, image_url = ? WHERE product_id = ?", [name,description,price,stock,supplier,category,image_url,product_id]);
}


export {getAllProducts, getProductById, getProductsBySupplier, getProductsByCategory, addProduct, deleteProduct, updateProduct}

