"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DBCart {
    constructor() {
        this.cart_connect = require('../database/db-cart').connect;
        this.cart_disconnect = require('../database/db-cart').disconnect;
        this.findAllCartUser = async (email) => {
            let db = this.cart_connect();
            let user_cart_search = await db?.CarritoModel.find({ titular: email });
            this.cart_disconnect();
            return user_cart_search;
        };
        this.findCartUser = async (email) => {
            let db = this.cart_connect();
            let user_cart_search = await db?.CarritoModel.find({ titular: email });
            if (user_cart_search.length == 0) {
                let cart = {
                    titular: email,
                    productos: [],
                    finalizo: false
                };
                let user_cart_created = await db?.CarritoModel.create(cart);
                this.cart_disconnect();
                return user_cart_created;
            }
            else {
                let todos_finalizados = true;
                for (const cart of user_cart_search) {
                    if (!cart.finalizo) {
                        todos_finalizados = false;
                        this.cart_disconnect();
                        return cart;
                    }
                }
                if (todos_finalizados) {
                    let cart = {
                        titular: email,
                        productos: [],
                        finalizo: false
                    };
                    let user_cart_created = await db?.CarritoModel.create(cart);
                    this.cart_disconnect();
                    return user_cart_created;
                }
            }
            this.cart_disconnect();
            return user_cart_search;
        };
        this.finalizoCartUser = async (email) => {
            let db = this.cart_connect();
            let user_cart_search = await db?.CarritoModel.updateOne({ titular: email }, {
                $set: {
                    finalizo: true
                }
            });
            let user_cart = await db?.CarritoModel.find({ titular: email });
            this.cart_disconnect();
            return user_cart;
        };
        this.addProdCartUser = async (email, prod_to_add) => {
            let db = this.cart_connect();
            let user_cart_update = await db?.CarritoModel.updateOne({ $and: [{ titular: email }, { finalizo: false }, { productos: { $elemMatch: { title: prod_to_add.title } } }] }, { "$inc": { "productos.$[elem].cantidad": prod_to_add.cantidad } }, { arrayFilters: [{ "elem.title": { $eq: prod_to_add.title } }] });
            if (user_cart_update.nModified == 0) {
                //no existe el producto en el carrito por lo tanto lo agrego.
                let user_cart_add = await db?.CarritoModel.updateOne({ $and: [{ titular: email }, { finalizo: false }] }, { $push: { productos: prod_to_add } });
                this.cart_disconnect();
                return user_cart_add;
            }
            this.cart_disconnect();
            return user_cart_update;
        };
        this.buscando = async (email) => {
            let db = this.cart_connect();
            let user_cart = await db?.CarritoModel.find({ $and: [{ titular: email }, { finalizo: false }] });
            let user_cart_finalizado = await db?.CarritoModel.updateOne({ $and: [{ titular: email }, { finalizo: false }] }, {
                $set: {
                    finalizo: true
                }
            });
            console.log("Base de dato carrito compra todo ok");
            this.cart_disconnect();
            return user_cart;
        };
        this.borrarProductoCartUser = async (email, prod_to_add) => {
            let db = this.cart_connect();
            let user_cart_update = await db?.CarritoModel.updateOne({ $and: [{ titular: email }, { finalizo: false }] }, { $pull: { productos: { title: { $eq: prod_to_add } } } });
            let devolver = { eliminado: true };
            if (user_cart_update.nModified == 0) {
                devolver.eliminado = false;
            }
            this.cart_disconnect();
            return devolver;
        };
    }
}
exports.DBCart = DBCart;
//# sourceMappingURL=DBCart.js.map