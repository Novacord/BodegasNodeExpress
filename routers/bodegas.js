import 'reflect-metadata';
import { plainToClass } from 'class-transformer'
import {Router} from 'express';
import dotenv from 'dotenv';
import middlewareBodegas from '../middlewares/middlewareBodegas.js';
import { con } from '../db/atlas.js';

dotenv.config();

const appBodegas = Router();

appBodegas.get('/', async(req, res) => {
  const db = await con(); 
  const bodegas = db.collection("bodegas"); 
  const result = await bodegas.find().sort({ nombre: 1 }).toArray();
  res.send(result);
});

appBodegas.post('/', middlewareBodegas, async (req, res) => {
  const { id, nombre, id_responsable, estado, created_by } = req.body;
  const db = await con();
  const bodegas = db.collection("bodegas");
  const users = db.collection("users");

  const userExists = await users.findOne({ id: id_responsable });

  if (!userExists) {
    return res.status(404).send('El id_responsable especificado no existe');
  }

  const nuevoDocumento = {
    id,
    nombre,
    id_responsable,
    estado,
    created_by,
    created_at: new Date(),
    update_by: null,
    updated_at: null,
    deleted_at: null
  };

  try {
    await bodegas.insertOne(nuevoDocumento);
    res.status(200).send('Bodega creada exitosamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor bodegas');
  }
});

export default appBodegas;
