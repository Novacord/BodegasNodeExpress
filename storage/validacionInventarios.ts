import { Type, Transform, Expose } from "class-transformer";
import { IsDefined, MaxLength, MinLength } from "class-validator";

export class validacionInventarios{
    @Transform(({ value }) =>{
        let data = /^[0-9]+$/g.test(value);
        if(data && typeof value == "number") return Number(value);
        else throw {status: 401, message: "error en el id"}
    })
    @Expose({name: "id"})

    @IsDefined({ message: ()=>{ throw { status: 401, message: `el campo id es obligatorio`}} })
    id: number;
    
    @Transform(({ value }) =>{
        let data = /^[0-9]+$/g.test(value);
        if(data && typeof value == "number") return Number(value);
        else throw {status: 401, message: "error en el id_producto"}
    })
    @Expose({name: "id_producto"})

    @IsDefined({ message: ()=>{ throw { status: 401, message: `el campo id_producto es obligatorio`}} })
    id_producto: number;

    @Transform(({ value }) =>{
        let data = /^[0-9]+$/g.test(value);
        if(data && typeof value == "number") return Number(value);
        else throw {status: 401, message: "error en el id_bodega"}
    })
    @Expose({name: "id_bodega"})

    @IsDefined({ message: ()=>{ throw { status: 401, message: `el campo id_bodega es obligatorio`}} })
    id_bodega: number;

    @Transform(({ value }) =>{
        let data = /^[0-9]+$/g.test(value);
        if(data && typeof value == "number") return Number(value);
        else throw {status: 401, message: "error en el cantidad"}
    })
    @Expose({name: "cantidad"})

    @IsDefined({ message: ()=>{ throw { status: 401, message: `el campo cantidad es obligatorio`}} })
    cantidad: number;


    created_by: number;
    constructor(p1:number, p2:number, p3:number, p4:number, p5:number){
        this.id = p1;
        this.id_producto = p2;
        this.id_bodega = p3;
        this.cantidad = p4;
    }
}