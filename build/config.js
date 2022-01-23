"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path = require('path');
const part1 = 'ACd2c12ca55706e85';
const part2 = 'd789bbe558d335f36';
exports.credencialesEmail = {
    user: "disvolvi.apon@gmail.com",
    pass: "Ciro9802"
};
exports.credencialesTwilio = {
    accountSid: 'ACd2c12ca55706e85d789bbe558d335f36',
    authToken: '6a948a4938cb6aa64ef8ae4ae2f11fab',
    number: '+13863563624'
};
exports.administrador = {
    phone: "5492215731619",
    email: "ramegp@gmail.com"
};
dotenv_1.default.config({
    path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
});
exports.config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 8080
};
//# sourceMappingURL=config.js.map