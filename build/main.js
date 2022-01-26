"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiBackend_1 = require("./utils/ApiBackend");
const config_1 = require("./config");
const helpers_1 = require("./helpers/helpers");
let argumentos = process.argv.slice();
argumentos = argumentos.splice(2);
let datos_para_servidor = helpers_1.sacar_datos_de_los_parametros(argumentos);
let PORT = config_1.config.PORT || 8080;
console.log(`Modo ${config_1.config.NODE_ENV}`);
//@ts-ignore
const servidor = new ApiBackend_1.ApiBackend(PORT, config_1.config.MODO_SERVER);
/* console.log(`
====================================================================
=============                                       ================
=============           Ready on port ${servidor.listening()}          ================
=============                                       ================
====================================================================
`); */
//# sourceMappingURL=main.js.map