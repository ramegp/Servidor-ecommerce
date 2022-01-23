"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logHandler_1 = require("../helpers/logHandler");
//@ts-ignore
exports.datos = (req, res) => {
    let { url, method } = req;
    logHandler_1.loggerInfo.info(`Request a la ruta /datos por el metodo ${method}`);
    res.json({
        argumentos: process.argv.slice(2),
        SO: process.platform,
        version_node: process.version,
        uso_memoria: process.memoryUsage(),
        path_ejecucion: __filename,
        pid: process.pid,
        carpeta: process.cwd(),
        worker: process.pid,
        date: new Date().toLocaleString()
    });
};
//# sourceMappingURL=datos.route.js.map