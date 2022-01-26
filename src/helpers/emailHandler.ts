import nodemailer from "nodemailer";
import { UsuarioPassport } from "../utils/Interfaces";

import { credencialesEmail } from "./../config";
import { loggerError, loggerInfo } from "./logHandler";

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: credencialesEmail.user,
        pass: credencialesEmail.pass
    }
})

export const avisoInicioSesionEmail = (user: UsuarioPassport) => {
    const mailOptions = {
        from: 'Servidor Node.js',
        to: user.user,
        subject: 'Inicio de sesion',
        html: `<h1 style="color: grey;">Inicio de sesion  ${(new Date).toDateString()}</h1>`

    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            loggerError.error(`${err}`);

            return err
        }
        loggerInfo.info(`Se envio email al usuario ${user.user}`)
    })
}


export const notificacionPorEmailCompraAUsuario = (user: string, detalle_compra: any) => {

    let total_compra = 0;
    let productos_detalle = ``
    for (const prod of detalle_compra.productos) {
        total_compra = prod.cantidad * prod.price + total_compra
        productos_detalle = productos_detalle + `\nProducto: ${prod.title}\ncantidad: ${prod.cantidad} ---> precio: ${prod.price}\n`
    }
    const email = `Usuario: ${detalle_compra.titular}\nTotal: ${total_compra}\n\nProductos:\n${productos_detalle} `

    const mailOptions = {
        from: 'Servidor Node.js',
        to: user,
        subject: 'Realizaste una compra',
        html: email

    }
    console.log("enviando mail usuario...");
    
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            loggerError.error(`${err}`);

            return err
        }
        loggerInfo.info(`Email compra al usuario ${user}`)
    })
}
export const notificacionPorEmailCompraAAdmin = (detalle_compra: any) => {
    let total_compra = 0;
    let productos_detalle = ``
    for (const prod of detalle_compra.productos) {
        total_compra = prod.cantidad * prod.price + total_compra
        productos_detalle = productos_detalle + `\nProducto: ${prod.title}\ncantidad: ${prod.cantidad} ---> precio: ${prod.price}\n`
    }
    const email = `Usuario: ${detalle_compra.titular}\nTotal: ${total_compra}\n\nProductos:\n${productos_detalle} `

    const mailOptions = {
        from: 'Servidor Node.js',
        to: credencialesEmail.user,
        subject: 'Un usuario realizo una compra',
        html: email

    }
    console.log("enviando mail admin");
    
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            loggerError.error(`${err}`);

            return err
        }
        loggerInfo.info(`Notificacion compra al admin ${credencialesEmail.user}`)
    })
}