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
export class validacionInventarios {
    constructor(p1, p2, p3, p4, p5) {
        this.id = p1;
        this.id_producto = p2;
        this.id_bodega = p3;
        this.cantidad = p4;
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
    Expose({ name: "id" }),
    IsDefined({ message: () => { throw { status: 401, message: `el campo id es obligatorio` }; } }),
    __metadata("design:type", Number)
], validacionInventarios.prototype, "id", void 0);
__decorate([
    Transform(({ value }) => {
        let data = /^[0-9]+$/g.test(value);
        if (data && typeof value == "number")
            return Number(value);
        else
            throw { status: 401, message: "error en el id_producto" };
    }),
    Expose({ name: "id_producto" }),
    IsDefined({ message: () => { throw { status: 401, message: `el campo id_producto es obligatorio` }; } }),
    __metadata("design:type", Number)
], validacionInventarios.prototype, "id_producto", void 0);
__decorate([
    Transform(({ value }) => {
        let data = /^[0-9]+$/g.test(value);
        if (data && typeof value == "number")
            return Number(value);
        else
            throw { status: 401, message: "error en el id_bodega" };
    }),
    Expose({ name: "id_bodega" }),
    IsDefined({ message: () => { throw { status: 401, message: `el campo id_bodega es obligatorio` }; } }),
    __metadata("design:type", Number)
], validacionInventarios.prototype, "id_bodega", void 0);
__decorate([
    Transform(({ value }) => {
        let data = /^[0-9]+$/g.test(value);
        if (data && typeof value == "number")
            return Number(value);
        else
            throw { status: 401, message: "error en el cantidad" };
    }),
    Expose({ name: "cantidad" }),
    IsDefined({ message: () => { throw { status: 401, message: `el campo cantidad es obligatorio` }; } }),
    __metadata("design:type", Number)
], validacionInventarios.prototype, "cantidad", void 0);
