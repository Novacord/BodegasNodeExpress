import { Type, Transform, Expose } from "class-transformer";
import { IsDefined, MaxLength, MinLength } from "class-validator";

export class validacionProductos{
    @Transform(({ value }) =>{
        let data = /^[0-9]+$/g.test(value);
        if(data && typeof value == "number") return Number(value);
        else throw {status: 401, message: "error en el id"}
    })
    @Expose({name: "id"})

    @IsDefined({ message: ()=>{ throw { status: 401, message: `el campo id es obligatorio`}} })
    id: number;
    
    @Transform(({value})=>{
        let data = /^[a-zA-Z]+$/g.test(value);
        if(data)return value;
        else throw {status: 401, message: "error en el nombre"}
    })
    @Expose({name: "nombre"})
    
    @IsDefined({ message: ()=>{ throw { status: 401, message: `el campo nombre es obligatorio`}} })
    nombre: string;

    @Transform(({value})=>{
        let data = /^[a-zA-Z]+$/g.test(value);
        if(data)return value;
        else throw {status: 401, message: "error en el descripcion"}
    })
    @Expose({name: "descripcion"})
    
    @IsDefined({ message: ()=>{ throw { status: 401, message: `el campo descripcion es obligatorio`}} })
    descripcion: string;

    @Transform(({ value }) =>{
        let data = /^[0-9]+$/g.test(value);
        if(data && typeof value == "number") return Number(value);
        else throw {status: 401, message: "error en el cantidad"}
    })
    @Expose({name: "cantidad"})

    @IsDefined({ message: ()=>{ throw { status: 401, message: `el campo cantidad es obligatorio`}} })
    cantidad: number;

    @Transform(({ value }) =>{
        let data = /^[0-9]+$/g.test(value);
        if(data && typeof value == "number") return Number(value);
        else throw {status: 401, message: "error en el id_inv"}
    })
    @Expose({name: "id_inv"})

    @IsDefined({ message: ()=>{ throw { status: 401, message: `el campo id_inv es obligatorio`}} })
    id_inv: number;


    created_by: number;
    constructor(p1:number, p2:string, p3:string, p4:number, p5:number){
        this.id = p1;
        this.nombre = p2;
        this.descripcion = p3;
        this.cantidad = p4;
        this.id_inv = p5;
    }
}