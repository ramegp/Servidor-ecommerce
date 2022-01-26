import { notificacionPorEmailCompraAAdmin, notificacionPorEmailCompraAUsuario } from "../helpers/emailHandler";
import { notificacionCompra } from "../helpers/notificacion";
import { DBCart } from "../utils/DBCart";
import { DBMongo } from "../utils/DBMongo";
import { persistencia as db } from "../utils/Factory";

//@ts-ignore
export const devolverCarritoActual = (req: express.Request, res: express.Response)=>{
    /* 
    @params idUser 
    devuelve el carrito que no esta finalizado(no compro)
    */
    let user = req.params.idUser;

    let DB = new DBCart()
    DB.findCartUser(user).then((data:any)=>{res.json(data)})
}

//@ts-ignore
export const devolverTodosLosCarritosDelUsuario = (req: express.Request, res: express.Response)=>{
    /* 
    @params idUser 
    devuelve todos los carritos del usuario
    */
    let user = req.params.idUser;

    let DB = new DBCart()
    DB.findAllCartUser(user).then((data:any)=>{res.json(data)})
}

//@ts-ignore
export const finalizarCompra = (req: express.Request, res: express.Response)=>{
    /* 
    @params idUser 
    tomo el carrito del usuario armo un mensaje para enviar. El manejador del carrito marca como true el campo finalizo
    => notificacionCompra avisa al administrador que se realizo una compra
    */
    let user = req.params.idUser;

    let DB = new DBCart()
    DB.buscando(user).then((data:any)=>{
        
        console.log("Por enviar notificacion...");
        
        notificacionPorEmailCompraAUsuario(user,data[0]);
        notificacionPorEmailCompraAAdmin(data[0])
        res.json(data)
    })
    
}

//@ts-ignore
export const agregarProductoAlCarrito = (req: express.Request, res: express.Response)=>{
    /* 
    @params idUser
    @params idProd => query
    @params cantidad query 
    agregamos al carrito del idUser el producto con el id: idProd la cantidad pasada.
    busca en la BD de los productos los datos para enviar al manejador del carrito el objeto a agregar. 
    
    */
    if (req.query.idProd) {
        
        let { idUser } = req.params
        
        let { cantidad } = req.query
        
        //let DBProductos = new DBMongo()


        //@ts-ignore
        db.findById(req.query.idProd.toString()).then((data:any)=>{
            
            let DB = new DBCart();
            let prod_add_to_cart = {
                title:data[0].title,
                //@ts-ignore
                cantidad:parseInt(cantidad),
                price:data[0].price
            }
            
            console.log(prod_add_to_cart);
            
            
            DB.addProdCartUser(idUser,prod_add_to_cart).then((data:any)=>{
                
                
                res.json({data})})

        })

        
    } else {
        res.json({error:"No hay id prod"})
    }
}

//@ts-ignore
export const borrarProductoDelCarrito = (req: express.Request, res: express.Response)=>{
    /* 
    @params idUser => params
    @params idProd => query
    elimina del carrito del idUser el producto idProd
    */
    if (req.query.idProd && req.params.idUser) {
        let { idUser } = req.params
        
        let { idProd } = req.query
        
        console.log(`Elimina del carrito del usuario ${req.params.idUser} el producto ${req.query.idProd}`);
        let DB = new DBCart();
        DB.borrarProductoCartUser(idUser,idProd).then((data)=>{
            res.json({data})
        })
        
        
    } else {
        res.json({error:"No hay id prod"})
    }
}

//@ts-ignore
export const finalizarCompra2 = (req: express.Request, res: express.Response)=>{
    /* 
    @params idUser 
    El manejador del carrito marca como comprado el carrito => finalizo:true
    */
    console.log(`${req.params.idUser}`);
    let DB = new DBCart()
    DB.finalizoCartUser(req.params.idUser).then((data:any)=>{res.json({data})})
}