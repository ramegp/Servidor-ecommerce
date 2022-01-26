"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path = require('path');
const part1 = 'ACd2c12ca55706e85';
const part2 = 'd789bbe558d335f36';
/*
    Credenciales del email del administrador
    en gmail marcar como aplicaciones no seguras para poder enviar los emails
*/
exports.credencialesEmail = {
    user: "disvolvi.apon@gmail.com",
    pass: "Ciro9802"
};
/*
    Credenciales de twilio
*/
exports.credencialesTwilio = {
    accountSid: 'ACd2c12ca55706e85d789bbe558d335f36',
    authToken: '1642594d636e016faaff3cb7230116a8',
    number: '+13863563624'
};
/*
    telefono del administrador
*/
exports.administrador = {
    phone: "5492215731619",
    email: "ramegp@gmail.com"
};
dotenv_1.default.config({
    path: path.resolve(__dirname, '../' + process.env.NODE_ENV + '.env')
});
exports.config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    //@ts-ignore
    PORT: parseInt(process.env.PORT) || 8080,
    MODO_SERVER: process.env.MODO_SERVER || 'fork',
    GRAPHIQL: process.env.GRAPHIQL || true
};
//# sourceMappingURL=config.js.map