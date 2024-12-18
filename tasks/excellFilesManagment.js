import * as XLSX from "xlsx"
import { Menu_product } from "../model/menu_products.js";
import {create, update} from "../tasks/product_management.js"
import path from "path";
import { Catalogue_product } from "../model/catalogue.js";
import * as fs from 'fs';

XLSX.set_fs(fs)

async function exportExcellAll(req, res){
    const table = req.body.table
    let data = [];
    if(table === "menu"){
        data = await Menu_product.findAll({
            where:{menu_id:req.body.menu}
        });
    }
    else if (table === "catalogue"){
        data = await Catalogue_product.findAll({
            where:{catalogue_id:req.body.catalogue}
        })
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
    const catalogue = req.body.catalogue
    console.log(catalogue)
    let data = []
    try{
        if(table === "menu"){
            data = await Menu_product.findAll({
                where:{menu_id:catalogue}
            });
        }
        else if (table === "catalogue"){
            data = await Catalogue_product.findAll({
                where:{catalogue_id:catalogue}
            })
        }
        console.log(data);
    }
    catch{
        return res.status(400).send("error al cargar los dato");
    }
    try {
        const products = [];
        data.forEach(e=>{
            if(e.dataValues.product_category === category){
                products.push([e.dataValues.product_name,e.dataValues.product_price,e.dataValues.product_desc])
            }
        })

        if (products.length === 0) {
            return res.status(404).send('No hay datos para exportar.');
        }


        const workbook = XLSX.utils.book_new();
        const heading = [["Nombre", "Precio", "descripción"]];
        const worksheet = XLSX.utils.aoa_to_sheet(heading);
        XLSX.utils.sheet_add_aoa(worksheet, products, {origin: -1});
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

async function importExcel(req, res){
    try {
        if(!req.file){
            return res.status(400).json({message:"Not any file has been upload"});
        }        
        

        const filePath = path.resolve(req.file.path);
        console.log(filePath);
        if (fs.existsSync(filePath)) {
            console.log("File exists:", filePath);
        } else {
            console.log("File not found:", filePath);
        }
        
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const results = [];


        for (const row of data){
            results.push(row);
        }

        
        const products = await Promise.all(results.map(async (e) => {
            const createdProduct = await Catalogue_product.create({
                product_name: e.name,
                product_desc: e.desc,
                product_price: e.price,
                product_category: e.cat,
                catalogue_id: e.catalogue_id,
            });
            return createdProduct; // Return the created product for Promise.all
        }));

        res.status(201).json({
            message:"the file has been successfully read",
            products
        })

    } catch (error) {
        console.error("error reading file", error);
        return res.status(500).json({message:"error reading file"})
    }

}

export {exportExcellAll, exportExcellCategory, importExcel}