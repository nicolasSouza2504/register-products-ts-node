import express, {Request, Response, Router} from "express";
import Product from '../model/product.js';
import {Model} from "sequelize";
import ProductController from "../controller/product.controller.js";
import {verifyToken} from "../controller/auth.controller.js";

const routes: Router = express.Router();

routes.post("/save", verifyToken(['user']), (req: Request, res: Response) => {


    res.setHeader('Content-Type', 'application/json');

    Product.create(req.body).then(prod => {
        return res.status(200).json(prod);
    }).catch(error => {
        return res.status(500).json(error);
    });

});

routes.get("/list-all", verifyToken(['user']), (req: Request, res: Response) => {

    res.setHeader('Content-Type', 'application/json');

    Product.findAll().then(products => {
        return res.status(200).json(products);
    }).catch(error => {
        return res.status(500).json({message: 'Error get products: ' + JSON.stringify(error)})
    });

});

routes.put("/edit", verifyToken(['user']), (req: Request, res: Response) => {

    res.setHeader('Content-Type', 'application/json');

    return ProductController.updateProduct(req.body, res)

});

routes.delete("/delete", verifyToken(['user']), (req: Request, res: Response) => {

    res.setHeader('Content-Type', 'application/json');

    return ProductController.deleteProduct(req.query, res)

});


routes.get("/find-by-id", verifyToken(['user']), async (req: Request, res: Response) => {

    res.setHeader('Content-Type', 'application/json');

    const product: Model<any, any> | null = await Product.findByPk(req.body.id).then((product: Model<any, any> | null) => {
        return product;
    });

    return res.status(200).json(product);

});

export default routes;
