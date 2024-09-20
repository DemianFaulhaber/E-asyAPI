import * as XLSX from "xlsx"
import { Menu_product } from "../model/menu_products.js";
import { Catalogue_product } from "../model/catalogue_products.js";


async function exportExcellAll(req, res){
    const table = req.body.table
    let data = [];
    if(table === "menu"){
        data = await Menu_product.findAll();
    }
    else if (table === "catalogue"){
        data = await Catalogue_product.findAll()
    }
    try {
        // Obtener todos los productos con sus categorías
        
        // Crear un objeto para almacenar productos por categoría
        const categories = {};
        
        data.forEach(row => {
            const category = row.dataValues.product_category;
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push({
                product_id: row.dataValues.product_id,
                product_name: row.dataValues.product_name,
                product_price: row.dataValues.product_price,
            });
        });

        // Crear un nuevo libro de Excel
        const workbook = XLSX.utils.book_new();

        // Agregar una hoja por cada categoría
        for (const [category, products] of Object.entries(categories)) {
            const heading = [["código","Nombre", "Precio", "fecha de creación", "ultima actualización"]];
            const worksheet = XLSX.utils.json_to_sheet(products);
            XLSX.utils.sheet_add_aoa(worksheet, heading, {origin: "A1"});
            XLSX.utils.book_append_sheet(workbook, worksheet, category);
        }

        // Generar el buffer del archivo Excel
        const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        
        // Configurar la respuesta para descargar el archivo Excel
        res.setHeader('Content-Disposition', 'attachment; filename="menu.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al exportar los datos');
    }
}


async function exportExcellCategory(req,res){
    const table = req.body.table
    const category = req.body.category
    const user = req.body.user
    console.log(user)
    let data = []
    if(table === "menu"){
        data = await Menu_product.findAll({
            where:{user_id:user}
        });
    }
    else if (table === "catalogue"){
        data = await Catalogue_product.findAll({
            where:{user_id:user}
        })
    }
    try {
        const products = []
        data.forEach(e=>{
            if(e.dataValues.product_category === category){
                products.push({
                    product_id: e.dataValues.product_id,
                    product_name: e.dataValues.product_name,
                    product_price: e.dataValues.product_price,
                    product_desc: e.dataValues.product_desc
                })
            }
        })

        const workbook = XLSX.utils.book_new();

        const heading = [["código","Nombre", "Precio", "descripción"]];
        const worksheet = XLSX.utils.json_to_sheet(products);
        XLSX.utils.sheet_add_aoa(worksheet, heading, {origin: "A1"});
        XLSX.utils.book_append_sheet(workbook, worksheet, category);
        

        const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        
        // Configurar la respuesta para descargar el archivo Excel
        res.setHeader('Content-Disposition', `attachment; filename="${category}.xlsx"`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al exportar los datos');
    }
}



export {exportExcellAll, exportExcellCategory}