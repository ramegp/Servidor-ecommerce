"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logHandler_1 = require("../helpers/logHandler");
const cart_model_1 = require("./cart/cart.model");
const env = require('node-env-file');
env(__dirname + '/../../.env');
let database;
exports.connect = () => {
    // add your own uri below
    const uri = `mongodb+srv://${process.env.mongoAtlasUser}:${process.env.mongoAtlasPassword}@ecommerce.iqobf.mongodb.net/cart?retryWrites=true&w=majority`;
    /* if (database) {
      return;
    } */
    mongoose_1.default.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    database = mongoose_1.default.connection;
    database.once("open", async () => {
        logHandler_1.loggerInfo.info(`Conectado a la base de datos de los carritos`);
    });
    database.on("error", () => {
        logHandler_1.loggerError.error(`Error al conectar a la base de datos de los carritos`);
        logHandler_1.loggerInfo.error(`Error al conectar a la base de datos de los carritos`);
        console.log("Error connecting to database");
    });
    return {
        CarritoModel: cart_model_1.CarritoModel,
    };
};
exports.disconnect = () => {
    if (!database) {
        return;
    }
    mongoose_1.default.disconnect();
    logHandler_1.loggerInfo.info(`Desconectado de la base de datos de los carritos`);
};
//# sourceMappingURL=db-cart.js.map