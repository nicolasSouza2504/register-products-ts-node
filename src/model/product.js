import { DataTypes } from 'sequelize';
import sequelize from "../db/sequelize.js";
import CategoryEnum from "../enums/category-enum.js";
import BrandEntity from "./brand.js";
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
    },
    brandId: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'product'
});
Product.belongsTo(BrandEntity, { foreignKey: 'brandId', targetKey: 'id' });
export default Product;
