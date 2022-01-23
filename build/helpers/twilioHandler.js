"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = __importDefault(require("twilio"));
const config_1 = require("./../config");
const logHandler_1 = require("./logHandler");
exports.client = twilio_1.default(config_1.credencialesTwilio.accountSid, config_1.credencialesTwilio.authToken);
exports.avisoInicioSesionSMS = (user) => {
    exports.client.messages.create({
        body: `Hola inicio de sesion ${user.user}`,
        from: `${config_1.credencialesTwilio.number}`,
        //@ts-ignore
        to: `+${user.phone}`
    })
        .then(message => logHandler_1.loggerInfo.info(`Se envio sms al usuario ${user.user} con idSMS ${user.phone}`))
        .catch(console.log);
};
exports.avisoInicioSesionWhatsapp = (user) => {
    exports.client.messages.create({
        body: `Has iniciado sesion`,
        mediaUrl: ['https://img.europapress.es/fotoweb/fotonoticia_20191227171120_1200.jpg'],
        from: 'whatsapp:+14155238886',
        to: `whatsapp:+${user.phone}`
    })
        .then(message => logHandler_1.loggerInfo.info(`Se envio whatsapp al usuario ${user.user}  ${user.phone}`))
        .catch(console.log);
};
//# sourceMappingURL=twilioHandler.js.map