import { Sequelize } from 'sequelize-typescript';
const sequelize = new Sequelize({
    database: 'products',
    username: 'postgres',
    host: 'localhost',
    dialect: 'postgres'
});
sequelize.sync({ force: false })
    .then(() => {
    console.log('Tables created successfully');
})
    .catch((err) => {
    console.error('Error creating tables:', err);
});
export default sequelize;
