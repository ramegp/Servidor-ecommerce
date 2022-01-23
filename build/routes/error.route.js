"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const error_route_1 = require("../controlRoutes/error.route");
let __path = require('path');
const router = express.Router();
router.get('*', error_route_1.errorRoute);
module.exports = router;
//# sourceMappingURL=error.route.js.map