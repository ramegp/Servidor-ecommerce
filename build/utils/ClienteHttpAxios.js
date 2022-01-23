"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const obtenerProductos = async () => {
    try {
        let response = await axios_1.default.get("http://localhost:8080/products");
        let { data } = response;
        console.log(data);
    }
    catch (error) {
        console.log(error);
    }
};
obtenerProductos();
//# sourceMappingURL=ClienteHttpAxios.js.map