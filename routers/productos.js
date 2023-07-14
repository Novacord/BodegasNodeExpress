import 'reflect-metadata';
import { plainToClass } from 'class-transformer'
import { Router } from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import { validacionProductos } from "../controller/validacionProductos.js";

dotenv.config();

const appProductos = Router();

let con = undefined;

const config = JSON.parse(process.env.CREDENCIALES);

appProductos.use((req, res, next) => {
    con = mysql.createPool(config);
    next();
})

const validacionData = (req, res, next) => {
  try {
    let data = plainToClass(validacionProductos, req.body);
    console.log(data);
    next();
  } catch (error) {
    res.status(error.status).send(error.message);
  } 
}

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


appProductos.post("/", validacionData,(req, res) => {
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

  const addProducto = (req, res) => {
    try {
        con.query('INSERT INTO productos(nombre, descripcion, estado, created_by, update_by) VALUES (?, ?, ?, ?, ?)', req.body, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err.message);
                return;
            }
            const productId = result.insertId;
            
            con.query('INSERT INTO inventarios(id_bodega, id_producto, created_by, update_by) VALUES (?, ?, ?, ?)', [req.body, productId, created_by, update_by], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err.message);
                    return;
                }
                res.json(result);
            });
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
  }


export default appProductos;

