import Product from '../model/product.js';
import {Response} from "express";
import ProductDto from "../dto/productDto";
import {Model} from "sequelize";
import product from "../model/product.js";

class ProductController {

    async updateProduct(objEditor: ProductDto,  res: Response) {

        this.validateProduct(objEditor);

        const productSaved = await Product.findByPk(objEditor.id);

        if (productSaved == null) {
            return res.status(404).json({message: 'Product not found!'});
        } else {

            this.updateValues(productSaved, objEditor);

            return await productSaved.save().then((prod: Model<any, any>) => {
                return res.status(200).json(prod);
            }).catch((error: Error) => {
                return res.status(500).json({message: 'Error updating product: ' + error.message});
            });

        }


    };

    async deleteProduct(queryParams: any, res: Response) {

        const productSaved = await Product.findByPk(queryParams.id);

        if (productSaved == null) {
            return res.status(404).json({message: 'Product not found!'});
        } else {

            await productSaved.destroy().then((prod: Model<any, any> | void) => {
                return res.status(200).json({message: 'Product has been deleted!'});
            }).catch((error: Error) => {
                return res.status(500).json({message: 'Error deleting product: ' + error.message});
            });

        }

    }

    validateProduct(obj: ProductDto): void {

        if (obj.brand == null || obj.brand == '') {
            throw new Error('Brand is required!');
        }

        if (obj.model == null || obj.model == '') {
            throw new Error('Model is required!');
        }

        if (obj.capacity == null || obj.capacity == 0) {
            throw new Error('Capacity is required!');
        }

        if (obj.price == null || obj.price == 0) {
            throw new Error('Price is required!');
        }

        if (obj.category == null) {
            throw new Error('Category is required!');
        }

    };

    updateValues(prod: Model<any, any> | any, objEditor: ProductDto): void {
        prod.brand = objEditor.brand;
        prod.model = objEditor.model;
        prod.capacity = objEditor.capacity;
        prod.price = objEditor.price;
        prod.category = objEditor.category;
    }

}

export default new ProductController();
