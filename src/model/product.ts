import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript';
import CategoryEnum from '../enums/category-enum.js';
import Brand from './brand.js';

interface ProductAttributes {
    id: number;
    brand: string;
    model: string;
    capacity: number;
    price: number;
    category: string;
    brandId: number;
}

interface ProductCreationAttributes extends Omit<ProductAttributes, 'id'> {}

@Table({
    tableName: 'product',
    timestamps: false
})
class Product extends Model<ProductAttributes, ProductCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare brand: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare model: string;

    @AllowNull(false)
    @Column(DataType.DOUBLE)
    declare capacity: number;

    @AllowNull(false)
    @Column(DataType.DOUBLE)
    declare price: number;

    @AllowNull(false)
    @Column(DataType.ENUM(...Object.values(CategoryEnum)))
    declare category: string;

    @ForeignKey(() => Brand)
    @Column(DataType.INTEGER)
    declare brandId: number;

    @BelongsTo(() => Brand)
    declare brandDetails?: Brand;
}

export default Product;
