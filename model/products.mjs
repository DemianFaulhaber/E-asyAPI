import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize('menu', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port:'3306',
    timezone:'-3:00',
})

class Product extends Model {}

// TEST DATABASE CONECTION
// async function testConnection(){
//     try{
//         await sequelize.authenticate();
//         console.log("OK")
//     }
//     catch(err){
//         console.error("ERROR", err)
//     }
// }

// testConnection() 


//Product Table model, add here more models if needed
Product.init({
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
    }
}, {
    sequelize,
    modelName: "Product",
});

export {Product}


