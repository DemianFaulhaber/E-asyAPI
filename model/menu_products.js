import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize('Easy', 'demian', 'admin', {
    host: 'localhost',
    dialect: 'mysql',
    port:'3306',
    timezone:'-3:00',
})



class Menu_product extends Model {}

//Product Table model
Menu_product.init({
    product_id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    product_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    product_price:{
        type: DataTypes.FLOAT(10,2),
        allowNull: false,
    },
    product_category:{
        type: DataTypes.STRING,
        allowNull:false,
        defaultValue: "Uncategorized" 
    },
    user_id:{
        type: DataTypes.UUID,
        allowNull:false,
    },
    product_desc:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "sin descripción"
    }
}, {
    sequelize,
    modelName: "menu_product",
});

export {Menu_product}


