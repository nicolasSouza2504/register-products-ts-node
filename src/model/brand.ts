import {DataTypes} from 'sequelize';
import sequelize from "../db/sequelize.js";

const BrandEntity = sequelize.define('brandEntity', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: 'brand'
        }
    )
;


export default BrandEntity;
