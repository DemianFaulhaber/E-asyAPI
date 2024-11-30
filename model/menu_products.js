import { Sequelize, DataTypes, Model } from 'sequelize';
import dbConfig from './config.db.js';

const sequelize = dbConfig

class Menu_product extends Model {}
class Menu_list extends Model {}
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
    menu_id:{
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

Menu_list.init({
    menu_id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },
    menu_name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    user_id:{
        type:DataTypes.UUID,
        allowNull:false
    }
},{
    sequelize,
    modelName:"menu_list"
})

export {Menu_product, Menu_list}


