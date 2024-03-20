import Product from '../model/product.js';
import {Response} from "express";
import ProductDto from "../dto/productDto";
import {Model} from "sequelize";

class ProductController {

    async updateProduct(objEditor: ProductDto, queryParams: any, res: Response) {

        this.validateProduct(objEditor);

        const productSaved: Model<any, any> | null = await Product.findByPk(queryParams.id).then((product: Model<any, any> | null) => {
            return productSaved
        });

        if (productSaved == null) {
            return res.status(404).json({message: 'Product not found!'});
        } else {

        }

        this.updateValues(productSaved, objEditor);

    };

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

    updateValues(prod: Model<any, any>, objEditor: ProductDto): void {
        prod.dataValues.brand = objEditor.brand;
        prod.dataValues.model = objEditor.model;
        prod.dataValues.capacity = objEditor.capacity;
        prod.dataValues.price = objEditor.price;
        prod.dataValues.category = objEditor.category;
    }

}
