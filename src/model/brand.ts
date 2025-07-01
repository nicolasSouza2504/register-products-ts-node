import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    HasMany
} from 'sequelize-typescript';
import Product from './product.js';

interface BrandAttributes {
    id: number;
    name: string;
}

interface BrandCreationAttributes extends Omit<BrandAttributes, 'id'> {}

@Table({
    tableName: 'brand',
    timestamps: false
})
class Brand extends Model<BrandAttributes, BrandCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare name: string;

    @HasMany(() => Product)
    declare products?: Product[];
}

export default Brand;
