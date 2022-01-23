"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let instance_class_archivo = null;
class Archivo {
    constructor(path = '') {
        this.fs = require('fs');
        this.getFilePath = () => {
            return this.filePath;
        };
        this.obtenerCantidadProductos = () => {
            //Obtiene la cantidad de productos del archivo para generar el id automatico
            let contenido = this.fs.readFileSync(__dirname + `/../../assets/${this.filePath}`, 'utf-8');
            return JSON.parse(contenido).length;
        };
        this.getAllProducts = () => {
            //devuelve los productos del archivo si es que existe
            try {
                let contenido = this.fs.readFileSync(__dirname + `/../../assets/${this.filePath}`, 'utf-8');
                return new Promise((resolve, reject) => {
                    resolve(JSON.parse(contenido));
                });
                return JSON.parse(contenido);
            }
            catch (error) {
                return [];
            }
        };
        this.addProd = (obj) => {
            //Guarda un producto en un archivo.
            let objSave = { ...obj, _id: (this.obtenerCantidadProductos() + 1).toString(), timestamp: new Date().toString() };
            let products = JSON.parse(this.fs.readFileSync(__dirname + `/../../assets/${this.filePath}`, 'utf-8'));
            products.push(objSave);
            this.fs.writeFileSync(__dirname + `/../../assets/${this.filePath}`, JSON.stringify(products, null, '\t'));
            return new Promise((resolve, reject) => {
                resolve(objSave);
            });
        };
        /* deleteFile = (): void => {
            //Borra el archivo con todos los producos
            this.fs.unlink(__dirname + `/${'./text.txt'}`, (error: any) => {
                if (error) {
                    console.log(error)
    
                } else {
                    console.log("Deleted")
                }
            })
    
        } */
        this.findById = async (num) => {
            //obtengo los productos
            let products_Aux = undefined;
            return await this.getAllProducts().then((result) => {
                if (result.length == 0) {
                    //No hay productos devuelvo msj no hay
                    console.log("no hay");
                    return new Promise((resolve, reject) => {
                        resolve(undefined);
                    });
                }
                else {
                    let producto_devolver = result.find((e) => e._id == num);
                    return new Promise((resolve, reject) => {
                        resolve([producto_devolver]);
                    });
                }
            });
        };
        this.upDate = async (id_produc, new_product) => {
            let prod_to_update = undefined;
            return this.findById(id_produc).then((result) => {
                prod_to_update = result;
                if (prod_to_update) {
                    prod_to_update = { ...prod_to_update, title: new_product.title, price: new_product.price, _id: id_produc, thumbnail: new_product.thumbnail, stock: new_product.stock, description: new_product.description, codigo: new_product.codigo, timestamp: new_product.timestamp, };
                    return this.getAllProducts().then((result) => {
                        result = result.map((p) => {
                            if (p._id === id_produc) {
                                p = prod_to_update;
                            }
                            return p;
                        });
                        this.fs.writeFileSync(__dirname + `/../../assets/${this.filePath}`, JSON.stringify(result, null, '\t'));
                        return new Promise((resolve, reject) => {
                            resolve(prod_to_update);
                        });
                    }).catch((err) => {
                    });
                }
                else {
                    return new Promise((resolve, reject) => {
                        resolve(undefined);
                    });
                }
            });
        };
        this.removeById = (id_produc) => {
            let existe = this.findById(id_produc);
            if (existe) {
                let products = this.getAllProducts();
                let index_deleted;
                //products.splice(,1)
                //console.log(products.findIndex((p:any)=>{p.id = id_produc}))
                for (let index = 0; index < products.length; index++) {
                    if (products[index]._id === id_produc) {
                        index_deleted = index;
                    }
                }
                // @ts-ignore
                products.splice(index_deleted, 1);
                this.fs.writeFileSync(__dirname + `/../../assets/${this.filePath}`, JSON.stringify(products, null, '\t'));
                return existe;
            }
            else {
                return 'error, no existe el id';
            }
        };
        this.findByName = async (name) => {
            return await this.getAllProducts().then((result) => {
                return new Promise((resolve, reject) => {
                    resolve(result.filter((p) => { return p.title === name; }));
                });
            }).catch((err) => {
                return new Promise((resolve, reject) => {
                    resolve([]);
                });
            });
        };
        this.findByCode = async (code) => {
            return await this.getAllProducts().then((result) => {
                return new Promise((resolve, reject) => {
                    resolve(result.filter((p) => { return p.codigo === code; }));
                });
            }).catch((err) => {
                return new Promise((resolve, reject) => {
                    resolve([]);
                });
            });
        };
        this.findByPrice = async (price_max, price_min = 0) => {
            //Pasamos primero el precio mayor 
            if (price_min <= price_max) {
                return await this.getAllProducts().then((result) => {
                    return new Promise((resolve, reject) => {
                        resolve(result.filter((p) => {
                            return ((p.price <= price_max) && (p.price >= price_min));
                        }));
                    });
                }).catch((err) => {
                    return new Promise((resolve, reject) => {
                        resolve([]);
                    });
                });
            }
            else {
                return new Promise((resolve, reject) => {
                    resolve([]);
                });
            }
        };
        this.findByStock = async (stock_max, stock_min = 0) => {
            //Pasamos primero el precio mayor 
            if (stock_min <= stock_max) {
                return await this.getAllProducts().then((result) => {
                    return new Promise((resolve, reject) => {
                        resolve(result.filter((p) => {
                            return ((p.stock <= stock_max) && (p.stock >= stock_min));
                        }));
                    });
                }).catch((err) => {
                    return new Promise((resolve, reject) => {
                        resolve([]);
                    });
                });
            }
            else {
                return new Promise((resolve, reject) => {
                    resolve([]);
                });
            }
        };
        this.findByPriceStock = async (price_max, price_min, stock_max, stock_min) => {
            if ((stock_min <= stock_max) && (price_min <= price_max)) {
                return await this.getAllProducts().then((result) => {
                    return new Promise((resolve, reject) => {
                        resolve(result.filter((p) => {
                            return ((p.stock <= stock_max) && (p.stock >= stock_min) && (p.price <= price_max) && (p.price >= price_min));
                        }));
                    });
                }).catch((err) => {
                    return new Promise((resolve, reject) => {
                        resolve([]);
                    });
                });
            }
            else {
                return new Promise((resolve, reject) => {
                    resolve([]);
                });
            }
        };
        this.filePath = path;
    }
    static getInstanceClassArchivo() {
        if (!instance_class_archivo) {
            instance_class_archivo = new Archivo("productos.txt");
        }
        return instance_class_archivo;
    }
}
exports.Archivo = Archivo;
/* const a1 = Archivo.getInstanceClassArchivo()
const a2 = Archivo.getInstanceClassArchivo()
console.log("Equals", a1 === a2); */
/* const a1 = Archivo.getInstanceClassArchivo()
a1.findByPriceStock(50,10,21,0).then((result)=>{console.log(result);
}) */ 
//# sourceMappingURL=Archivo.js.map