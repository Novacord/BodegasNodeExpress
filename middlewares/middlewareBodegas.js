import express from 'express';
import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import {validacionBodegas} from '../controller/validacionBodegas.js';
import {validate} from 'class-validator';

const middlewareBodegas = express();
middlewareBodegas.use('/',async(req,res,next)=>{
    try {
        let data = plainToClass(validacionBodegas, req.body, { excludeExtraneousValues: true });
        console.log(data);
        req.body = data;
        await validate(data);
        next();
    } catch (err) {
        res.status(err.status).send(err.message);
    }
})
export default middlewareBodegas;