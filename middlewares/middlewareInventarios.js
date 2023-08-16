import express from 'express';
import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import {validacionInventarios} from '../controller/validacionInventarios.js';
import {validate} from 'class-validator';

const middlewareInventarios = express();
middlewareInventarios.use('/',async(req,res,next)=>{
    try {
        let data = plainToClass(validacionInventarios, req.body, { excludeExtraneousValues: true });
        console.log(data);
        req.body = data;
        await validate(data);
        next();
    } catch (err) {
        res.status(err.status).send(err.message);
    }
})
export default middlewareInventarios;