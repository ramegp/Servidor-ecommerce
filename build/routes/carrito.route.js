"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
let __path = require('path');
const carrito_route_1 = require("../controlRoutes/carrito.route");
const router = express.Router();
router.get('/:idUser', carrito_route_1.devolverCarritoActual);
router.get('/:idUser/all', carrito_route_1.devolverTodosLosCarritosDelUsuario);
router.get('/:idUser/buy', carrito_route_1.finalizarCompra);
router.put('/:idUser', carrito_route_1.agregarProductoAlCarrito);
router.delete('/:idUser', carrito_route_1.borrarProductoDelCarrito);
router.post('/:idUser/finalizar', carrito_route_1.finalizarCompra2);
module.exports = router;
//# sourceMappingURL=carrito.route.js.map