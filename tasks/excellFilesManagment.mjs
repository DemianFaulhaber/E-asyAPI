import * as XLSX from "xlsx"
import {Product} from "../model/products.mjs"


async function exportExcell(req, res){
    try {
        // Obtener todos los productos con sus categorías
        const data = await Product.findAll();
        
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
                createdAt: row.dataValues.createdAt,
                updatedAt: row.dataValues.updatedAt
            });
        });

        // Crear un nuevo libro de Excel
        const workbook = XLSX.utils.book_new();

        // Agregar una hoja por cada categoría
        for (const [category, products] of Object.entries(categories)) {
            const heading = [["código","Nombre", "Precio", "fecha de creación", "ultima actualización"]];
            const worksheet = XLSX.utils.json_to_sheet(products);
            XLSX.utils.sheet_add_aoa(worksheet, heading);
            XLSX.utils.book_append_sheet(workbook, worksheet, category);
        }

        // Generar el buffer del archivo Excel
        const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

        // Configurar la respuesta para descargar el archivo Excel
        res.attachment('menú.xlsx');
        res.send(buffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al exportar los datos');
    }
}




export {exportExcell}