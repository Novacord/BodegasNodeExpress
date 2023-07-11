import {Router} from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const appBodegas = Router();

let con = undefined;

//CREDENCIALES = {"host": "localhost", "user": "campus", "password": "campus2023", "database": "Nova" , "port": 3306 }

const config = JSON.parse(process.env.CREDENCIALES);

appBodegas.use((req,res,next)=>{
    con = mysql.createPool(config);
    next();
})

appBodegas.get('/', (req, res) => {
    con.query(
        /*sql*/`SELECT * FROM bodegas ORDER BY nombre ASC`,
        (err,data,fils)=>{
            console.log(err);
            console.log(data);
            console.log(fils);
            res.status(200).send(data);
        }
    )
})

appBodegas.post('/', (req, res) => {
    const { id, nombre, id_responsable, estado, created_by } = req.body;

    con.query(
      /*sql*/ `SELECT id FROM users WHERE id = ?`,
      [id_responsable],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error interno del servidor users');
        } else if (result.length === 0) {
          res.status(404).send('El id_responsable especificado no existe en la tabla users');
        } else {
          con.query(
            /*sql*/ `INSERT INTO bodegas (id, nombre, id_responsable, estado, created_by) VALUES (?, ?, ?, ?, ?)`,
            [id, nombre, id_responsable, estado, created_by],
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(500).send('Error interno del servidor bodegas');
              } else {
                res.status(200).send('Bodega creada exitosamente');
              }
            }
          );
        }
      }
    );
});

export default appBodegas;
