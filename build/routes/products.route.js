"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const products_route_1 = require("../controlRoutes/products.route");
let __path = require('path');
const router = express.Router();
router.get('/:id?', products_route_1.buscarProducto);
router.post('/', products_route_1.agregarProducto);
router.delete('/:id', products_route_1.borrarProducto);
router.put('/:id', products_route_1.actualizarProducto);
module.exports = router;
//# sourceMappingURL=products.route.js.map