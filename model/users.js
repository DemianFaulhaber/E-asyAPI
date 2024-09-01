import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize('menu', 'root', 'root', {
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


