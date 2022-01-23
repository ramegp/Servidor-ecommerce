"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const datos_route_1 = require("../controlRoutes/datos.route");
let __path = require('path');
const router = express.Router();
const argumentos_entrada = process.argv.slice();
router.get('/', datos_route_1.datos);
module.exports = router;
//# sourceMappingURL=datos.route.js.map