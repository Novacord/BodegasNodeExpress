import 'reflect-metadata';
import { plainToClass } from 'class-transformer'
import {Router} from 'express';
import dotenv from 'dotenv';
import middlewareInventarios from '../middlewares/middlewareInventarios.js';
import { con } from '../db/atlas.js';

dotenv.config();

const appInventarios = Router();

appInventarios.post('/',middlewareInventarios, async (req, res) => {
    const { id, id_producto, id_bodega, cantidad } = req.body;
    const db = await con();
    const inventarios = db.collection("inventarios");

    const existingInventario = await inventarios.findOne({ id_producto, id_bodega });

    if (!existingInventario) {
        const newInventario = {
            id,
            id_producto,
            id_bodega,
            cantidad,
            created_by: null,
            update_by: null,
            created_at: null,
            updated_at: null,
            deleted_at: null
        };

        const result = await inventarios.insertOne(newInventario);

        if (result.insertedCount === 1) {
            res.status(200).send('Registro insertado en el inventario');
        } else {
            res.status(500).send('Error al insertar en el inventario');
        }
    } else {
        const existingCantidad = existingInventario.cantidad;
        const newCantidad = existingCantidad + cantidad;

        const result = await inventarios.updateOne(
            { id_producto, id_bodega },
            { $set: { cantidad: newCantidad } }
        );

        if (result.modifiedCount === 1) {
            res.status(200).send('Registro actualizado en el inventario');
        } else {
            res.status(500).send('Error al actualizar el inventario');
        }
    }
});

export default appInventarios;