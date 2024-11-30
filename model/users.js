import {DataTypes, Model } from 'sequelize';
import dbConfig from './config.db.js';

const sequelize=dbConfig;

class User extends Model {}

//Product Table model, add here more models if needed
User.init({
    user_id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        timestamps:false
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
    timestamps:false
});

export {User}


