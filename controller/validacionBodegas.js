var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Transform, Expose } from "class-transformer";
import { IsDefined } from "class-validator";
export class validacionBodegas {
    constructor(p1, p2, p3, p4, p5) {
        this.id = p1;
        this.nombre = p2;
        this.id_responsable = p3;
        this.estado = p4;
        this.created_by = p5;
    }
}
__decorate([
    Transform(({ value }) => {
        let data = /^[0-9]+$/g.test(value);
        if (data && typeof value == "number")
            return Number(value);
        else
            throw { status: 401, message: "error en el id" };
    }),
    Expose({ name: "ID" }),
    IsDefined({ message: () => { throw { status: 401, message: `el campo ID es obligatorio` }; } }),
    __metadata("design:type", Number)
], validacionBodegas.prototype, "id", void 0);
__decorate([
    Transform(({ value }) => {
        let data = /^[a-zA-Z]+$/g.test(value);
        if (data)
            return value;
        else
            throw { status: 401, message: "error en el nombre" };
    }),
    Expose({ name: "NAME" }),
    IsDefined({ message: () => { throw { status: 401, message: `el campo NAME es obligatorio` }; } }),
    __metadata("design:type", String)
], validacionBodegas.prototype, "nombre", void 0);
__decorate([
    Transform(({ value }) => {
        let data = /^[0-9]+$/g.test(value);
        if (data && typeof value == "number")
            return Number(value);
        else
            throw { status: 401, message: "error en el IDresponsable" };
    }),
    Expose({ name: "IDresponsable" }),
    IsDefined({ message: () => { throw { status: 401, message: `el campo IDresponsable es obligatorio` }; } }),
    __metadata("design:type", Number)
], validacionBodegas.prototype, "id_responsable", void 0);
__decorate([
    Transform(({ value }) => {
        let data = /^[0-9]+$/g.test(value);
        if (data && typeof value == "number")
            return Number(value);
        else
            throw { status: 401, message: "error en el ESTADO" };
    }),
    Expose({ name: "ESTADO" }),
    IsDefined({ message: () => { throw { status: 401, message: `el campo ESTADO es obligatorio` }; } }),
    __metadata("design:type", Number)
], validacionBodegas.prototype, "estado", void 0);
__decorate([
    Transform(({ value }) => {
        let data = /^[0-9]+$/g.test(value);
        if (data && typeof value == "number")
            return Number(value);
        else
            throw { status: 401, message: "error en el CREATEby" };
    }),
    Expose({ name: "CREATEby" }),
    IsDefined({ message: () => { throw { status: 401, message: `el campo CREATEby es obligatorio` }; } }),
    __metadata("design:type", Number)
], validacionBodegas.prototype, "created_by", void 0);
