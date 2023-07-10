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

export default appBodegas;
