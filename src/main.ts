import { ApiBackend } from "./utils/ApiBackend";
import { config } from "./config";
import { sacar_datos_de_los_parametros } from './helpers/helpers'

let argumentos = process.argv.slice()
argumentos = argumentos.splice(2)

let datos_para_servidor = sacar_datos_de_los_parametros(argumentos)
let PORT = config.PORT || 8080
console.log(`Modo ${config.NODE_ENV}`);

//@ts-ignore
const servidor = new ApiBackend(PORT,config.MODO_SERVER);

/* console.log(`
====================================================================
=============                                       ================
=============           Ready on port ${servidor.listening()}          ================
=============                                       ================
====================================================================
`); */
