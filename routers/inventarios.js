// import 'reflect-metadata';
// import { plainToClass } from 'class-transformer'
// import {Router} from 'express';
// import mysql from 'mysql2';
// import dotenv from 'dotenv';
// import {validacionInventarios} from '../controller/validacionInventarios.js';

// dotenv.config();

// const appInventarios = Router();

// let con = undefined;

// //CREDENCIALES = {"host": "localhost", "user": "campus", "password": "campus2023", "database": "Nova" , "port": 3306 }

// const config = JSON.parse(process.env.CREDENCIALES);

// appInventarios.use((req,res,next)=>{
//     con = mysql.createPool(config);
//     next();
// })
// const validacionData = (req, res, next) => {
//     try {
//       let data = plainToClass(validacionInventarios, req.body);
//       console.log(data);
//       next();
//     } catch (error) {
//       res.status(error.status).send(error.message);
//     } 
// }

// appInventarios.post('/', validacionData, (req, res) => {
//       const { id, id_producto, id_bodega, cantidad } = req.body;
//       // Verificar si la combinación de producto y bodega ya existe en el inventario
//       con.query('SELECT * FROM inventarios WHERE id_producto = ? AND id_bodega = ?', [id_producto, id_bodega], (err, rows) => {
//           if (err) {
//               console.log(err);
//               res.status(500).send('Error en la consulta de inventarios');
//               return;
//           }

//           if (rows.length === 0) {
//               // Combinación de producto y bodega no existe, realizar un INSERT
//               con.query('INSERT INTO inventarios (id, id_producto, id_bodega, cantidad) VALUES (?, ?, ?, ?)', [id, id_producto, id_bodega, cantidad], (err, result) => {
//                   if (err) {
//                       console.log(err);
//                       res.status(500).send('Error al insertar en el inventario');
//                       return;
//                   }
//                   res.status(200).send('Registro insertado en el inventario');
//               });
//           } else {
//               const existingCantidad = rows[0].cantidad;
//               const newCantidad = existingCantidad + cantidad;
//               con.query('UPDATE inventarios SET cantidad = ? WHERE id_producto = ? AND id_bodega = ?', [newCantidad, id_producto, id_bodega], (err, result) => {
//                   if (err) {
//                       console.log(err);
//                       res.status(500).send('Error al actualizar el inventario');
//                       return;
//                   }
//                   res.status(200).send('Registro actualizado en el inventario');
//               });
//           }
//       });
// })


// export default appInventarios;