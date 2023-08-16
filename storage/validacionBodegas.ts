import { Type, Transform, Expose } from "class-transformer";
import { IsDefined, MaxLength, MinLength } from "class-validator";

export class validacionBodegas{
    @Transform(({ value }) =>{
        let data = /^[0-9]+$/g.test(value);
        if(data && typeof value == "number") return Number(value);
        else throw {status: 401, message: "error en el ID"}
    })
    @Expose({name: "ID"})

    @IsDefined({ message: ()=>{ throw { status: 401, message: `el campo ID es obligatorio`}} })
    id: number;
    
    
    @Transform(({value})=>{
        let data = /^[a-zA-Z]+$/g.test(value);
        if(data)return value;
        else throw {status: 401, message: "error en el NAME"}
    })
    @Expose({name: "NAME"})
    @IsDefined({ message: ()=>{ throw { status: 401, message: `el campo NAME es obligatorio`}} })
    nombre: string;

    @Transform(({ value }) =>{
        let data = /^[0-9]+$/g.test(value);
        if(data && typeof value == "number") return Number(value);
        else throw {status: 401, message: "error en el IDresponsable"}
    })
    @Expose({name: "IDresponsable"})

    @IsDefined({ message: ()=>{ throw { status: 401, message: `el campo IDresponsable es obligatorio`}} })
    id_responsable: number;

    @Transform(({ value }) =>{
        let data = /^[0-9]+$/g.test(value);
        if(data && typeof value == "number") return Number(value);
        else throw {status: 401, message: "error en el ESTADO"}
    })
    @Expose({name: "ESTADO"})

    @IsDefined({ message: ()=>{ throw { status: 401, message: `el campo ESTADO es obligatorio`}} })
    estado: number;

    @Transform(({ value }) =>{
        let data = /^[0-9]+$/g.test(value);
        if(data && typeof value == "number") return Number(value);
        else throw {status: 401, message: "error en el CREATEby"}
    })
    @Expose({name: "CREATEby"})

    @IsDefined({ message: ()=>{ throw { status: 401, message: `el campo CREATEby es obligatorio`}} })

    created_by: number;
    constructor(p1:number, p2:string, p3:number, p4:number, p5:number){
        this.id = p1;
        this.nombre = p2;
        this.id_responsable = p3;
        this.estado = p4;
        this.created_by = p5;
    }
}