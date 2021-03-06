"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emailHandler_1 = require("../helpers/emailHandler");
const DBCart_1 = require("../utils/DBCart");
const Factory_1 = require("../utils/Factory");
//@ts-ignore
exports.devolverCarritoActual = (req, res) => {
    /*
    @params idUser
    devuelve el carrito que no esta finalizado(no compro)
    */
    let user = req.params.idUser;
    let DB = new DBCart_1.DBCart();
    DB.findCartUser(user).then((data) => { res.json(data); });
};
//@ts-ignore
exports.devolverTodosLosCarritosDelUsuario = (req, res) => {
    /*
    @params idUser
    devuelve todos los carritos del usuario
    */
    let user = req.params.idUser;
    let DB = new DBCart_1.DBCart();
    DB.findAllCartUser(user).then((data) => { res.json(data); });
};
//@ts-ignore
exports.finalizarCompra = (req, res) => {
    /*
    @params idUser
    tomo el carrito del usuario armo un mensaje para enviar. El manejador del carrito marca como true el campo finalizo
    => notificacionCompra avisa al administrador que se realizo una compra
    */
    let user = req.params.idUser;
    let DB = new DBCart_1.DBCart();
    DB.buscando(user).then((data) => {
        console.log("Por enviar notificacion...");
        emailHandler_1.notificacionPorEmailCompraAUsuario(user, data[0]);
        emailHandler_1.notificacionPorEmailCompraAAdmin(data[0]);
        res.json(data);
    });
};
//@ts-ignore
exports.agregarProductoAlCarrito = (req, res) => {
    /*
    @params idUser
    @params idProd => query
    @params cantidad query
    agregamos al carrito del idUser el producto con el id: idProd la cantidad pasada.
    busca en la BD de los productos los datos para enviar al manejador del carrito el objeto a agregar.
    
    */
    if (req.query.idProd) {
        let { idUser } = req.params;
        let { cantidad } = req.query;
        //let DBProductos = new DBMongo()
        //@ts-ignore
        Factory_1.persistencia.findById(req.query.idProd.toString()).then((data) => {
            let DB = new DBCart_1.DBCart();
            let prod_add_to_cart = {
                title: data[0].title,
                //@ts-ignore
                cantidad: parseInt(cantidad),
                price: data[0].price
            };
            console.log(prod_add_to_cart);
            DB.addProdCartUser(idUser, prod_add_to_cart).then((data) => {
                res.json({ data });
            });
        });
    }
    else {
        res.json({ error: "No hay id prod" });
    }
};
//@ts-ignore
exports.borrarProductoDelCarrito = (req, res) => {
    /*
    @params idUser => params
    @params idProd => query
    elimina del carrito del idUser el producto idProd
    */
    if (req.query.idProd && req.params.idUser) {
        let { idUser } = req.params;
        let { idProd } = req.query;
        console.log(`Elimina del carrito del usuario ${req.params.idUser} el producto ${req.query.idProd}`);
        let DB = new DBCart_1.DBCart();
        DB.borrarProductoCartUser(idUser, idProd).then((data) => {
            res.json({ data });
        });
    }
    else {
        res.json({ error: "No hay id prod" });
    }
};
//@ts-ignore
exports.finalizarCompra2 = (req, res) => {
    /*
    @params idUser
    El manejador del carrito marca como comprado el carrito => finalizo:true
    */
    console.log(`${req.params.idUser}`);
    let DB = new DBCart_1.DBCart();
    DB.finalizoCartUser(req.params.idUser).then((data) => { res.json({ data }); });
};
//# sourceMappingURL=carrito.route.js.map