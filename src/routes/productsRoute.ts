import express, {Request, Response, Router} from "express";
import Product from '../model/product.js';

const routes: Router = express.Router();

routes.post("/save", (req: Request, res: Response) => {


    res.setHeader('Content-Type', 'application/json');z

    Product.create(req.body).then(prod => {
        return res.status(200).json(prod);
    }).catch(error => {
        return res.status(500).json(error);
    });

});

routes.get("/list-all", async (req: Request, res: Response) => {

    res.setHeader('Content-Type', 'application/json');

    Product.findAll().then(products => {
        return res.status(200).json(products);
    }).catch(error => {
        return res.status(500).json({message: 'Error get products: ' + JSON.stringify(error)})
    });

});

routes.put("/edit", (req: Request, res: Response) => {

    res.setHeader('Content-Type', 'application/json');

    // return productController.updateProduct(req.body, req.query, res)

});

export default routes;
