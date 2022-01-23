"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const DBMongo_1 = require("../utils/DBMongo");
exports.schema = graphql_1.buildSchema(`
    input PersonaUpdate {
        id: Int!
        ciudad: String!
    },
    type Query {
        message: String,
        messages: [String],
        numero: Int,
        numeros: [Int],
        persona(id: Int!): Persona
        personas(ciudad: String): [Persona]
        personas2: [Persona]
        productos: [Producto]
        producto(title: String,price: Float):[Producto]
    },
    type Mutation {
        upDatePersona(id: Int!,ciudad: String!): Persona
        addProducto(
            title: String!,
            description: String!,
            stock: Int!,
            timestamp: String!,
            codigo: String!,
            price: Float!,
            thumbnail: String!
        ): Producto
    },
    type Persona {
        id: Int
        name: String
        edad: Int
        ciudad: String
    },
    type Producto{
        _id:String
        title: String,
        description: String,
        stock: Int,
        timestamp: String,
        codigo: String,
        price: Float,
        thumbnail: String,
        _v: Int
    }
`);
let PersonasData = [
    {
        id: 1,
        name: "Juan Carlor",
        edad: 35,
        Ciudad: "la plata"
    },
    {
        id: 2,
        name: "Francisco",
        edad: 25,
        ciudad: "mdq"
    },
    {
        id: 3,
        name: "Julia",
        edad: 30,
        ciudad: "la plata"
    },
    {
        id: 4,
        name: "Ramiro",
        edad: 10,
        ciudad: "beriso"
    },
    {
        id: 5,
        name: "Ciro",
        edad: 4,
        ciudad: "la plata"
    },
];
let getPersona = function (args) {
    var id = args.id;
    return PersonasData.filter(people => {
        return people.id == id;
    })[0];
};
let getPersonas = function (args) {
    if (args.ciudad) {
        var ciudad = args.ciudad;
        return PersonasData.filter(people => people.ciudad === ciudad);
    }
    else {
        return PersonasData;
    }
};
let getPersonas2 = function () {
    return PersonasData;
};
let updatepersona = function (args) {
    PersonasData.map(people => {
        if (people.id === args.id) {
            //@ts-ignore
            people.ciudad = args.ciudad;
            return people;
        }
    });
    return PersonasData.filter(people => people.id === args.id)[0];
};
let getProductos = async () => {
    const db = new DBMongo_1.DBMongo();
    let productos = [];
    await db.getAllProducts().then(async (data) => {
        productos = data;
    });
    return productos;
};
let getProducto = async (args) => {
    if (args.title) {
        const db = new DBMongo_1.DBMongo();
        let productos = [];
        await db.findByName(args.title).then((data) => {
            productos = data;
        });
        return productos;
    }
    else {
        const db = new DBMongo_1.DBMongo();
        let productos = [];
        await db.findByPrice(args.price).then((data) => {
            productos = data;
        });
        return productos;
    }
};
let addProducto = async (args) => {
    let producto_to_add_BD = {
        title: args.title,
        description: args.description,
        stock: args.stock,
        timestamp: args.timestamp,
        codigo: args.codigo,
        price: args.price,
        thumbnail: args.thumbnail,
    };
    const db = new DBMongo_1.DBMongo();
    let productos = [];
    await db.addProd(producto_to_add_BD).then((data) => {
        productos = data;
    });
    return productos;
};
exports.root = {
    message: () => 'Hola Mundo gelp!',
    messages: () => 'Hola Mundo!'.split(' '),
    numero: () => 123,
    numeros: () => [1, 2, 3],
    persona: getPersona,
    personas: getPersonas,
    personas2: getPersonas2,
    upDatePersona: updatepersona,
    productos: getProductos,
    producto: getProducto,
    addProducto: addProducto
};
//# sourceMappingURL=graphql.js.map