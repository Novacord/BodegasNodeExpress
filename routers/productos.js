import 'reflect-metadata';
import { plainToClass } from 'class-transformer'
import dotenv from "dotenv";
import {Router} from 'express';
import { con } from '../db/atlas.js';
import { validacionProductos } from "../controller/validacionProductos.js";

dotenv.config();

const appProductos = Router();

appProductos.get('/', async (req, res) => {
    try {
      const db = await con();
      const productos = db.collection("productos");
      const inventarios = db.collection("inventarios");
  
      const pipeline = [
        {
          $lookup: {
            from: "inventarios",
            localField: "id",
            foreignField: "id_producto",
            as: "inventario"
          }
        },
        {
          $unwind: "$inventario"
        },
        {
          $group: {
            _id: "$id",
            nombre: { $first: "$nombre" },
            descripcion: { $first: "$descripcion" },
            estado: { $first: "$estado" },
            total: { $sum: "$inventario.cantidad" }
          }
        },
        {
          $sort: { total: -1 }
        }
      ];
  
      const result = await productos.aggregate(pipeline).toArray();
      res.status(200).send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error interno del servidor');
    }
  });


  appProductos.post("/", async (req, res) => {
    const { id, nombre, descripcion, cantidad, id_inv } = req.body;

    try {
        const db = await con();
        const productos = db.collection("productos");
        const inventarios = db.collection("inventarios");
        const bodegas = db.collection("bodegas");

        const productoData = {
            id: id,
            nombre: nombre,
            descripcion: descripcion,
            estado: 1,
            created_by: null,
            update_by: null,
            created_at: null,
            updated_at: null,
            deleted_at: null
        };

        const productoResult = await productos.insertOne(productoData);
        const productId = productoResult.insertedId;

        const bodegaQuery = { nombre: "bodega0" };
        const bodegaResult = await bodegas.findOne(bodegaQuery);

        const inventarioData = {
            id_bodega: bodegaResult.id,
            id_producto: productId,
            cantidad: cantidad,
            created_by: null,
            update_by: null,
            created_at: null,
            updated_at: null,
            deleted_at: null
        };

        await inventarios.insertOne(inventarioData);

        res.status(200).send("Producto insertado correctamente");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

export default appProductos;

