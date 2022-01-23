"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logHandler_1 = require("../helpers/logHandler");
//@ts-ignore
exports.errorRoute = (req, res) => {
    let { url, method } = req;
    logHandler_1.loggerWarn.warn(`Ruta ${method} ${url} no implementada`);
    logHandler_1.loggerInfo.warn(`Ruta ${method} ${url} no implementada`);
    res.json({ data: "Ruta no implementada" });
};
//# sourceMappingURL=error.route.js.map