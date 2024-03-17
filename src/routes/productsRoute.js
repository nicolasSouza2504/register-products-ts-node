import express from "express";
import Product from '../model/product.js';
const routes = express.Router();
routes.post("/save", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Product.create(req.body).then(prod => {
        return res.status(200).json({ message: 'Product has been saved' });
    }).catch(error => {
        return res.status(500).json(error);
    });
});
routes.get("/list-all", async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Product.findAll().then(products => {
        return res.status(200).json(products);
    }).catch(error => {
        return res.status(500).json({ message: 'Error get products: ' + JSON.stringify(error) });
    });
});
routes.put("/edit", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    // return productController.updateProduct(req.body, req.query, res)
});
export default routes;
