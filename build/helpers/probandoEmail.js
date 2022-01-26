"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const detalle_compra = { "productos": [{ "title": "mate", "cantidad": 20, "price": 20 }, { "title": "Salamin", "cantidad": 6, "price": 280.32 }, { "title": "Jabon liquido", "cantidad": 3, "price": 10 }], "_id": "619fbabb9ea1fc5fc9c396f9", "titular": "ramegp@gmail.com", "finalizo": false, "__v": 0 };
//@ts-ignore
let total_compra = 0;
let productos_detalle = ``;
for (const prod of detalle_compra.productos) {
    total_compra = prod.cantidad * prod.price + total_compra;
    productos_detalle = productos_detalle + `\nProducto: ${prod.title}\ncantidad: ${prod.cantidad} ---> precio: ${prod.price}\n`;
}
const email = `Usuario: ${detalle_compra.titular}\nTotal: ${total_compra}\n\nProductos:\n${productos_detalle} `;
//# sourceMappingURL=probandoEmail.js.map