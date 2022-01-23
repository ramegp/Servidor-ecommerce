"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const messages_route_1 = require("../controlRoutes/messages.route");
let __path = require('path');
const router = express.Router();
router.get('/:id?', messages_route_1.buscarMsj);
router.post('/', messages_route_1.agregarMsj);
router.delete('/:id', messages_route_1.borrarMsj);
module.exports = router;
//# sourceMappingURL=messages.route.js.map