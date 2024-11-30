import { Sequelize } from 'sequelize';
import { config } from '../config.js';


const dbConfig = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port:'3306',
    timezone:'-3:00',
})

export default dbConfig;
