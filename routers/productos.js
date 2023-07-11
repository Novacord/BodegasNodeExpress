import { Router } from "express";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const appProductos = Router();

let con = undefined;

const config = JSON.parse(process.env.CREDENCIALES);

appProductos.use((req, res, next) => {
    con = mysql.createPool(config);
    next();
})

appProductos.get('/', (req, res) => {
    con.query(
        /*sql*/`SELECT productos.*, SUM(inventarios.cantidad) AS total
                FROM productos
                INNER JOIN inventarios ON productos.id = inventarios.id_producto
                GROUP BY productos.id
                ORDER BY total DESC`,
        (err, data) => {
            res.status(200).send(data);
        }
    );
});


export default appProductos;

