"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Archivo_1 = require("./Archivo");
const DBMongo_1 = require("./DBMongo");
class Factory {
    static set(option) {
        switch (option) {
            case 'Mongo':
                return DBMongo_1.DBMongo.getInstanceClassMongoDB();
            case 'Mem':
                break;
            case 'File':
                return Archivo_1.Archivo.getInstanceClassArchivo();
        }
    }
}
exports.Factory = Factory;
const option = process.argv[2] || 'Mongo';
exports.persistencia = Factory.set(option);
//export const Persistencia = Factory.set(option);
/* persistencia?.getAllProducts().then((result: any) => {
    console.log(result);
    
}).catch((err: any) => {
    console.log(err);
}); */
/*
let obj = {
    title: "Alberto",
    description: "Crack del futbol",
    stock: 1,
    codigo: "ES-55",
    price: 1000,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Helmet.jpg-512.png",
    timestamp: 'Sun Dec 12 2021 12:45:53 GMT-0300 (Argentina Standard Time)'
}

persistencia?.upDate("12",obj).then((result:any)=>{
    console.log(result);
}) */ 
//# sourceMappingURL=Factory.js.map