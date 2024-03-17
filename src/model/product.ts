import {DataTypes} from 'sequelize';

import sequelize from "../db/sequelize.js";
import CategoryEnum from "../enums/category-enum.js";

const Product = sequelize.define('product', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            brand: {
                type: DataTypes.STRING
            },
            model: {
                type: DataTypes.STRING

            },
            capacity: {
                type: DataTypes.DOUBLE
            },
            price: {
                type: DataTypes.DOUBLE
            },
            category: {
                type: DataTypes.ENUM(...Object.values(CategoryEnum))
            }
        },
        {
            tableName: 'product'
        }
    )
;

export default Product;
