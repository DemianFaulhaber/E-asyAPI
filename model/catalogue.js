import { Sequelize, DataTypes, Model, UUID } from 'sequelize';
import { config } from '../config.js';

const sequelize = new Sequelize(config.db_name, config.db_user, config.db_password, {
    host: 'localhost',
    dialect: 'mysql',
    port:'3306',
    timezone:'-3:00',
})

class Catalogue_product extends Model {}
class Catalogue_list extends Model {}
//Product Table model
Catalogue_product.init({
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
    catalogue_id:{
        type: DataTypes.UUID,
        allowNull:false,
    },
    isOff:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    isNew:{
        type: DataTypes.BOOLEAN,
        allowNull:false
    },
    product_desc:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "sin descripción"
    }
}, {
    sequelize,
    modelName: "catalogue_product",
});


Catalogue_list.init({
    id_catalogue:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },
    catalogue_name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    user_id:{
        type:DataTypes.UUID,
        allowNull:false
    }
},{
    sequelize,
    modelName:"catalogue_list",
    freezeTableName:true,
    timestamps:false
})

export {Catalogue_product, Catalogue_list}


