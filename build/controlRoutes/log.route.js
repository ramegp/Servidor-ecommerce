"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emailHandler_1 = require("../helpers/emailHandler");
const logHandler_1 = require("../helpers/logHandler");
const DBMongo_1 = require("../utils/DBMongo");
const bCrypt = require("bcrypt");
const log_1 = require("../middleware/log");
const notificacion_1 = require("../helpers/notificacion");
let isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.pass);
};
let createHash = function (password) {
    //@ts-ignore
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};
//@ts-ignore
exports.inicioSesion = (req, res) => {
    /*
    @params user => body
    @params pass => body
    

    busca en la BD si el usuario existe y la constraseña es correcta.
    devuelve el nombre de usuario y el token para acceder a la api
    */
    let userRegister = {
        user: req.body.username,
        pass: req.body.password
    };
    if (userRegister.user && userRegister.pass) {
        const db = new DBMongo_1.DBMongo();
        db.findUserByEmail(userRegister.user).then((user) => {
            if (user.length != 0) {
                let credencialesOk = user[0].user == userRegister.user && isValidPassword(user[0], userRegister.pass);
                if (credencialesOk) {
                    const token = log_1.generateAuthToken(user.user);
                    logHandler_1.loggerInfo.info(`Usuario ${user[0].user} inicio sesion ${(new Date).toDateString()}`);
                    emailHandler_1.avisoInicioSesionEmail(user[0]);
                    //avisoInicioSesionSMS(user[0]);
                    //avisoInicioSesionWhatsapp(user[0]);
                    res.header("x-auth-token", token).json({
                        username: user[0].user,
                        token
                    });
                }
                else {
                    logHandler_1.loggerInfo.warn(`Intento Fallido de inicio de sesion - Error en las credenciales`);
                    logHandler_1.loggerWarn.warn(`Intento Fallido de inicio de sesion - Error en las credenciales`);
                    res.json({ error: 'error de credenciales' });
                }
            }
            else {
                logHandler_1.loggerInfo.warn(`Intento Fallido de inicio de sesion - Usuario no existe`);
                logHandler_1.loggerWarn.warn(`Intento Fallido de inicio de sesion - Usuario no existe`);
                res.json({ error: 'usuario no existe' });
            }
        });
    }
    else {
        logHandler_1.loggerWarn.warn(`No se puede iniciar sesion sin username y password -- Ruta sing/in `);
        logHandler_1.loggerInfo.warn(`No se puede iniciar sesion sin username y password -- Ruta sing/in ${(new Date)}`);
        res.json({ error: "Falta pasar username y password" });
    }
};
//@ts-ignore
exports.registroUser = (req, res) => {
    /*
    @params user => body
    @params pass => body
    @params name => body
    @params address => body
    @params age => body
    @params phone => body
    @params avatar => body

    Paso previo al crear usuario. Envia un email para la verificacion del email.
    */
    console.log(req.body);
    if (req.body.username && req.body.password && req.body.name && req.body.address && req.body.age && req.body.phone) {
        let userRegister = {
            user: req.body.username,
            pass: createHash(req.body.password),
            name: req.body.name,
            address: req.body.address,
            age: req.body.age,
            phone: req.body.phone,
            avatar: req.body.avatar
        };
        const mailOptions = {
            from: 'Servidor Node.js',
            to: userRegister.user,
            subject: 'Validacion de email',
            html: `<h1 style="color: grey;">Validacion de email para crear usuario</h1>
            <p style="color: red;"> Copie el siguiente enlace y peguelo en un pagina web para verificar el email....</p>
            <p style="color: blue;">localhost:8080/sing/validaremail/?user=${userRegister.user}&pass=${userRegister.pass}&name=${userRegister.name}&address=${userRegister.address}&age=${userRegister.age}&phone=${userRegister.phone}&avatar=${userRegister.avatar}</p>`
        };
        emailHandler_1.transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                logHandler_1.loggerError.error(`${err}`);
                res.json({ error: "No pudo enviarse el email" });
                return err;
            }
            logHandler_1.loggerInfo.info(`Se envio email de validacion de usuario a ${userRegister.user}`);
            res.json({ msg: "Validar email" });
        });
    }
    else {
        logHandler_1.loggerWarn.warn(`Faltan pasar username y password para la ruta /sing/up `);
        logHandler_1.loggerInfo.warn(`Faltan pasar username y password para la ruta /sing/up `);
        res.json({ error: "Falta pasar username y password" });
    }
};
//@ts-ignore
exports.validarEmail = (req, res) => {
    /*
    @params user => query
    @params pass => query
    @params name => query
    @params address => query
    @params age => query
    @params phone => query
    @params avatar => query

    Una vez validado el email, creamos un objeto con los datos del usuario pasados por query
    lo agregamos a la BD.
    notificamos al administrador que se registro un nuevo usuario => notificacionUsuarioRegistrado
    devolvemos el nombre de usuario y el token para poder acceder a la api
    */
    const userRegister = {
        user: req.query.user?.toString(),
        pass: req.query.pass,
        name: req.query.name,
        address: req.query.address,
        age: req.query.age,
        phone: req.query.phone,
        avatar: req.query.avatar
    };
    const db = new DBMongo_1.DBMongo();
    //@ts-ignore
    db.findUserOrCreate(userRegister.user, userRegister).then((user) => {
        if (Object.keys(user).length == 0) {
            logHandler_1.loggerWarn.warn(`Usuario ya registrado con ese mail`);
            logHandler_1.loggerInfo.warn(`Usuario ya registrado con ese mail`);
            res.json({ error: 'Ya existe el email' });
        }
        else {
            const token = log_1.generateAuthToken(user.user);
            logHandler_1.loggerInfo.info(`Usuario creado ${user.user}`);
            notificacion_1.notificacionUsuarioRegistrado(user);
            res.header("x-auth-token", token).json({
                username: user.user,
                token
            });
        }
    });
};
//# sourceMappingURL=log.route.js.map