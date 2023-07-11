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


appProductos.post("/", (req, res) => {
    const { id,nombre,  descripcion,cantidad ,id_inv} = req.body;
    con.query(
      "INSERT INTO productos (id, nombre, descripcion) VALUES (?,?, ?)",
      [id,nombre,  descripcion],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        } else {
          const  id_producto = id;
          con.query(
            "SELECT id FROM bodegas WHERE nombre = ?",
            ["bodega0"],
            (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).send("Internal Server Error");
              } else {
                const  id_bodega = result[0].id;
                con.query(
                  "INSERT INTO inventarios ( id,id_producto,  id_bodega, cantidad) VALUES (?, ?, ?,?)",
                  [ id_inv,id_producto,  id_bodega, cantidad],
                  (err) => {
                    if (err) {
                      console.error(err);
                      res.status(500).send("Internal Server Error");
                    } else {
                      res.status(200).send("Producto insertado correctamente");
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  });



export default appProductos;

