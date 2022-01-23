"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logHandler_1 = require("../helpers/logHandler");
const DBMongo_1 = require("../utils/DBMongo");
const Factory_1 = require("../utils/Factory");
//@ts-ignore
exports.buscarProducto = async (req, res) => {
    /*
    @params id_show => params para buscar producto por id
    @params nombre => query busca producto por nombre
    @params preciomax => query busca producto por precio maximo
    @params codigo => query busca producto por codigo
    @params stockmax =< query busca producto por stock maximo
    
    Busca producto segun el parametro pasado por query o params en caso de ser id
    */
    let id_show = req.params.id;
    let { nombre, preciomax, preciomin, codigo, stockmax, stockmin } = req.query;
    //let db = new DBMongo();
    if (id_show) {
        logHandler_1.loggerInfo.info(`Request /products por id ${id_show}`);
        //@ts-ignore
        Factory_1.persistencia.findById(id_show).then((data) => { res.json(data); });
    }
    else {
        if (nombre) {
            logHandler_1.loggerInfo.info(`Request /products por nombre ${nombre}`);
            //@ts-ignore
            Factory_1.persistencia.findByName(nombre.toString()).then((data) => { res.json(data); });
        }
        else {
            if (codigo) {
                logHandler_1.loggerInfo.info(`Request /products por codigo ${codigo}`);
                //@ts-ignore
                Factory_1.persistencia.findByCode(codigo.toString()).then((data) => { res.json(data); });
            }
            else {
                if (preciomax && stockmax) {
                    (preciomin) ? (preciomin = preciomin.toString()) : (preciomin = '0');
                    (stockmin) ? (stockmin = stockmin.toString()) : (stockmin = '0');
                    logHandler_1.loggerInfo.info(`Request /products por precio y stock [$ ${preciomax}, ${stockmax}] `);
                    //@ts-ignore
                    Factory_1.persistencia.findByPriceStock(parseInt(preciomax.toString()), parseInt(preciomin), parseInt(stockmax.toString()), parseInt(stockmin)).then((data) => { res.json(data); });
                }
                else {
                    if (stockmax) {
                        (stockmin) ? (stockmin = stockmin.toString()) : (stockmin = '0');
                        logHandler_1.loggerInfo.info(`Request /products por stock ${stockmax}`);
                        //@ts-ignore
                        Factory_1.persistencia.findByStock(parseInt(stockmax.toString()), parseInt(stockmin)).then((data) => { res.json(data); });
                    }
                    else {
                        if (preciomax) {
                            (preciomin) ? (preciomin = preciomin.toString()) : (preciomin = '0');
                            logHandler_1.loggerInfo.info(`Request /products por precio ${preciomax}`);
                            //@ts-ignore
                            Factory_1.persistencia.findByPrice(parseInt(preciomax.toString()), parseInt(preciomin)).then((data) => { res.json(data); });
                        }
                        else {
                            logHandler_1.loggerInfo.info(`Request /products`);
                            //@ts-ignore
                            Factory_1.persistencia.getAllProducts().then((data) => {
                                res.json(data);
                            });
                        }
                    }
                }
            }
        }
    }
};
//@ts-ignore
exports.agregarProducto = (req, res) => {
    /*
    let producto_agregar = {
                title: "pan dulce",
                description: "Escuadra de color rosa",
                stock: 400,
                codigo: "ES-55",
                price: 45,
                thumbnail: "https://cdn2.iconfinder.com/data/icons/bakery-kitchen-3/512/soda-bread-baking-512.png"
            }
    */
    let obj = req.body;
    let db = new DBMongo_1.DBMongo();
    db.addProd(obj).then((prod) => { res.json(prod); });
};
//@ts-ignore
exports.borrarProducto = (req, res) => {
    /*
    @params id_delete => params
    borra un producto de la bd de los producto por id
    */
    let id_delete = req.params.id;
    logHandler_1.logger.trace(`Request /products metodo ${req.method}`);
    //let db = new DBMongo();
    //@ts-ignore
    Factory_1.persistencia.removeById(id_delete).then((data) => {
        logHandler_1.loggerInfo.info(`Se borro producto id ${id_delete}`);
        res.json(data);
    });
};
//@ts-ignore
exports.actualizarProducto = (req, res) => {
    /*
    @params id_produc => params id del producto a actualizar
    @params {"title": req.body.title,
        "price": req.body.price,
        "thumbnail": req.body.thumbnail,
        "codigo": req.body.codigo,
        "stock": req.body.stock,
        "description": req.body.description,
        "timestamp": req.body.timestamp}

    */
    let id_produc = req.params.id;
    let db = new DBMongo_1.DBMongo();
    let prod_to_update = {
        "title": req.body.title,
        "price": req.body.price,
        "thumbnail": req.body.thumbnail,
        "codigo": req.body.codigo,
        "stock": req.body.stock,
        "description": req.body.description,
        "timestamp": req.body.timestamp
    };
    db.upDate(id_produc, prod_to_update).then((data) => {
        res.json(data);
    });
};
//# sourceMappingURL=products.route.js.map