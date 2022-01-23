"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logHandler_1 = require("../helpers/logHandler");
const twilioHandler_1 = require("../helpers/twilioHandler");
//@ts-ignore
exports.enviarWhatsapp = (req, res) => {
    let { tel, msg } = req.query;
    if (tel && msg) {
        twilioHandler_1.client.messages.create({
            body: `${msg}`,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${tel}`
        })
            .then(message => logHandler_1.loggerInfo.info(`Se envio whatsapp al usuario ${tel}  ${message.sid}`))
            .catch(console.log);
        res.json({ msg: "ok" });
    }
    else {
        res.json({ error: "Faltan parametros query" });
    }
};
//# sourceMappingURL=whatsapp.route.js.map