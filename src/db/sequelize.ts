import {Sequelize} from 'sequelize-typescript';
import Product from "../model/product";
import User from "../model/user";
import Brand from "../model/brand";

const sequelize = new Sequelize({
    database: 'products',
    username: 'postgres',
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.addModels([User, Product, Brand]);

sequelize.sync({force: true})
    .then(() => {
        console.log('Tables created successfully');
    })
    .catch((err: Error) => {
        console.error('Error creating tables:', err);
    });


export default sequelize;

