"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const whatsapp_route_1 = require("../controlRoutes/whatsapp.route");
let __path = require('path');
const router = express.Router();
router.get('/', whatsapp_route_1.enviarWhatsapp);
module.exports = router;
//# sourceMappingURL=whatsapp.route.js.map