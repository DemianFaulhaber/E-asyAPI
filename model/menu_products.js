import { Sequelize, DataTypes, Model } from 'sequelize';
import { config } from '../config.js';


const sequelize = new Sequelize(config.db_name, config.db_user, config.db_password, {
    host: 'localhost',
    dialect: 'mysql',
    port:'3306',
    timezone:'-3:00',
})



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


