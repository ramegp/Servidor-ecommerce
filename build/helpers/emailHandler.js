"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("./../config");
const logHandler_1 = require("./logHandler");
exports.transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: config_1.credencialesEmail.user,
        pass: config_1.credencialesEmail.pass
    }
});
exports.avisoInicioSesionEmail = (user) => {
    const mailOptions = {
        from: 'Servidor Node.js',
        to: user.user,
        subject: 'Inicio de sesion',
        html: `<h1 style="color: grey;">Inicio de sesion  ${(new Date).toDateString()}</h1>`
    };
    exports.transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            logHandler_1.loggerError.error(`${err}`);
            return err;
        }
        logHandler_1.loggerInfo.info(`Se envio email al usuario ${user.user}`);
    });
};
exports.notificacionPorEmailCompraAUsuario = (user, detalle_compra) => {
    let total_compra = 0;
    let productos_detalle = ``;
    for (const prod of detalle_compra.productos) {
        total_compra = prod.cantidad * prod.price + total_compra;
        productos_detalle = productos_detalle + `\nProducto: ${prod.title}\ncantidad: ${prod.cantidad} ---> precio: ${prod.price}\n`;
    }
    const email = `Usuario: ${detalle_compra.titular}\nTotal: ${total_compra}\n\nProductos:\n${productos_detalle} `;
    const mailOptions = {
        from: 'Servidor Node.js',
        to: user,
        subject: 'Realizaste una compra',
        html: email
    };
    console.log("enviando mail usuario...");
    exports.transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            logHandler_1.loggerError.error(`${err}`);
            return err;
        }
        logHandler_1.loggerInfo.info(`Email compra al usuario ${user}`);
    });
};
exports.notificacionPorEmailCompraAAdmin = (detalle_compra) => {
    let total_compra = 0;
    let productos_detalle = ``;
    for (const prod of detalle_compra.productos) {
        total_compra = prod.cantidad * prod.price + total_compra;
        productos_detalle = productos_detalle + `\nProducto: ${prod.title}\ncantidad: ${prod.cantidad} ---> precio: ${prod.price}\n`;
    }
    const email = `Usuario: ${detalle_compra.titular}\nTotal: ${total_compra}\n\nProductos:\n${productos_detalle} `;
    const mailOptions = {
        from: 'Servidor Node.js',
        to: config_1.credencialesEmail.user,
        subject: 'Un usuario realizo una compra',
        html: email
    };
    console.log("enviando mail admin");
    exports.transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            logHandler_1.loggerError.error(`${err}`);
            return err;
        }
        logHandler_1.loggerInfo.info(`Notificacion compra al admin ${config_1.credencialesEmail.user}`);
    });
};
//# sourceMappingURL=emailHandler.js.map