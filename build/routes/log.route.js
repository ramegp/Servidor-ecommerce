"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const log_1 = require("../middleware/log");
const log_route_1 = require("../controlRoutes/log.route");
const router = express.Router();
router.get('/', log_1.authJWT, (req, res) => {
    res.json({ msg: "hola" });
});
/* Inicio de sesion */
router.post('/in', log_route_1.inicioSesion);
//Register sing up
router.post('/up', log_route_1.registroUser);
router.get('/validaremail', log_route_1.validarEmail);
//@ts-ignore
module.exports = router;
//# sourceMappingURL=log.route.js.map