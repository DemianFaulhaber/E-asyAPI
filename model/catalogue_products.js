import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize('menu', 'demian', 'admin', {
    host: 'localhost',
    dialect: 'mysql',
    port:'3306',
    timezone:'-3:00',
})

class Catalogue_product extends Model {}

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
    user_id:{
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
    modelName: "Catalogue_product",
});

export {Catalogue_product}


