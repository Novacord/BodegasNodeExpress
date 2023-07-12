import {Router} from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const appInventarios = Router();

let con = undefined;

//CREDENCIALES = {"host": "localhost", "user": "campus", "password": "campus2023", "database": "Nova" , "port": 3306 }

const config = JSON.parse(process.env.CREDENCIALES);

appInventarios.use((req,res,next)=>{
    con = mysql.createPool(config);
    next();
})

appInventarios.post('/', (req, res) => {
  const { id, id_producto, id_bodega, cantidad } = req.body;

  // Verificar si la combinación de Bodega y Producto ya existe en la tabla de inventarios
  const verificarExistenciaQuery = `SELECT * FROM inventarios WHERE id_producto = ? AND id_bodega = ?`;
  con.query(verificarExistenciaQuery, [id_producto, id_bodega], (err, result) => {
    if (err) {
      res.status(500).send('Error al verificar la existencia del registro');
      return;
    }

    if (result.length === 0) {
      // Combinación totalmente nueva, realizar un INSERT en la tabla de inventarios
      const insertQuery = `INSERT INTO inventarios (id, id_producto, id_bodega, cantidad) VALUES (?, ?, ?, ?)`;
      con.query(insertQuery, [id, id_producto, id_bodega, cantidad], (err, insertResult) => {
        if (err) {
          res.status(500).send('Error al insertar el nuevo registro');
          return;
        }

        res.status(200).send('Nuevo registro insertado correctamente');
      });
    } else {
      // Combinación existente, realizar un UPDATE en la tabla de inventarios para sumar la cantidad existente con la cantidad nueva
      const updateQuery = `UPDATE inventarios SET cantidad = cantidad + ? WHERE id_producto = ? AND id_bodega = ?`;
      con.query(updateQuery, [cantidad, id_producto, id_bodega], (err, updateResult) => {
        if (err) {
          res.status(500).send('Error al actualizar el registro existente');
          return;
        }

        res.status(200).send('Registro existente actualizado correctamente');
      });
    }
  });
});


export default appInventarios;