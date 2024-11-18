import { Sequelize, DataTypes, Model } from 'sequelize';
import { config } from '../config.js';

const sequelize = new Sequelize(config.db_name, config.db_user, config.db_password, {
    define:{
        timestamps:false,
    },
    host: 'localhost',
    dialect: 'mysql',
    port:'3306',
    timezone:'-3:00',
})

class User extends Model {}

//Product Table model, add here more models if needed
User.init({
    user_id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_email:{
        type: DataTypes.STRING, 
        alowNull:false
    },
    role:{
        type: DataTypes.STRING,
        alowNull: false,
        defaultValue: "customer",
    }
}, {
    sequelize,
    modelName: "User",
});

export {User}


