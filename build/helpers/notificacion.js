"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const logHandler_1 = require("./logHandler");
const twilioHandler_1 = require("./twilioHandler");
exports.notificacionUsuarioRegistrado = (user) => {
    twilioHandler_1.client.messages.create({
        body: `Usuario registrado:
        email:${user.user},
        name:${user.name}
        address:${user.address},
        age:${user.age},
        phone:${user.phone}
        `,
        mediaUrl: ['https://img.europapress.es/fotoweb/fotonoticia_20191227171120_1200.jpg'],
        from: 'whatsapp:+14155238886',
        to: `whatsapp:${config_1.administrador.phone}`
    })
        .then(message => logHandler_1.loggerInfo.info(`Se envio whatsapp al usuario ${user.user}  ${message.sid}`))
        .catch(console.log);
};
exports.notificacionCompra = (detalle) => {
    twilioHandler_1.client.messages.create({
        body: `Compra: ${detalle.user}
        fecha:${detalle.fecha}
        productos: ${detalle.productos}
        total:$ ${detalle.total}`,
        mediaUrl: ['https://img.europapress.es/fotoweb/fotonoticia_20191227171120_1200.jpg'],
        from: 'whatsapp:+14155238886',
        to: `whatsapp:${config_1.administrador.phone}`
    })
        .then(message => logHandler_1.loggerInfo.info(`Se envio whatsapp al administrador, notificacion de compra`))
        .catch(console.log);
};
//# sourceMappingURL=notificacion.js.map