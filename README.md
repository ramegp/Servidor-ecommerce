# ApiRest-backend


# En el archivo development.env
en TIPO_PERSISTENCIA podemos elegir entre `file o mongo`
en MODO_SERVER podemos elegir iniciar el serivor en modo `fork o cluster`
```
NODE_ENV=development
HOST=127.0.0.1
PORT=8080
TIPO_PERSISTENCIA=file
GRAPHIQL=true
mongoAtlasUser=<usuario mongo atlas>
mongoAtlasPassword=<Password del usuario de mongo>
MODO_SERVER=fork
```

# En el archivo production.env
en TIPO_PERSISTENCIA podemos elegir entre `file o mongo`
en MODO_SERVER podemos elegir iniciar el serivor en modo `fork o cluster`

```
NODE_ENV=production
HOST=localhost
PORT=9000
TIPO_PERSISTENCIA=mongo
GRAPHIQL=false
mongoAtlasUser=<usuario mongo atlas>
mongoAtlasPassword=<Password del usuario de mongo>
MODO_SERVER=cluster
```



en el archivo src/config.ts configurar 
```
/* 
    Credenciales del email del administrador
    en gmail marcar como aplicaciones no seguras para poder enviar los emails
*/
export const credencialesEmail = {
    user:"email",
    pass:"password"
}

/* 
    Credenciales de twilio
*/

export const credencialesTwilio = {
    accountSid : '',
    authToken : '',
    number:'+'
}    
/* 
    telefono del administrador
*/
export const administrador = {
    phone:"cellphone",
    email:"email"
}    


dotenv.config({
    path: path.resolve(__dirname,'../' +process.env.NODE_ENV +'.env')
})

export const config = {
    NODE_ENV :process.env.NODE_ENV || 'development',
    HOST : process.env.HOST || '127.0.0.1',
    //@ts-ignore
    PORT: parseInt(process.env.PORT) || 8080,
    MODO_SERVER:process.env.MODO_SERVER || 'fork',
    GRAPHIQL:process.env.GRAPHIQL || true
}

```

# Una vez configurado:

podemos ejecutar en el entorno desarrollo con:

`npm run start:dev`

o en el entorno produccion

`npm run start:prod`

# Servidor subido a heroku
```
https://sheltered-shore-33386.herokuapp.com/
```

# Front que se conecta con el front subido a netlify
```
https://vigorous-easley-0e6882.netlify.app/
```

# Rutas
## /products
en la carpeta src/routes se encuentran los end points
en la carpeta src/controlRoutes se encuentran los manejadores 

## /messages
en la carpeta src/routes se encuentran los end points
en la carpeta src/controlRoutes se encuentran los manejadores 

## /cart
en la carpeta src/routes se encuentran los end points
en la carpeta src/controlRoutes se encuentran los manejadores 

## /products
en la carpeta src/routes se encuentran los end points
en la carpeta src/controlRoutes se encuentran los manejadores 

## /sing
en la carpeta src/routes se encuentran los end points
en la carpeta src/controlRoutes se encuentran los manejadores 

### En la ruta localhost:8080/sing/up enviar un objeto 
```
{
    "username":"ramegp@gmail.com",
    "password":"123456",
    "name":"ramiro",
    "address":"70 num 640",
    "age":"30",
    "phone":"+5492215731619",
    "avatar":""
}
```
Nos envia un email para validar el email, continuar los pasos del email.

### En la ruta localhost:8080/sing/in enviar un objeto
``` 
{username:"email",password:"contraseña"} 
```
Una vez iniciado sesion nos envia un email con el dia que se inicio sesion y nos envia un sms

### Podemos usar el graphql para agregar productos y listarlos
```
Para agregar dirigirse a localhost:8080/graphql y escribir:

mutation{addProducto(
title:"Celular",
description:"Celular con camara 64px",
stock:64,
codigo:"CEL-01",
price:783.23,
thumbnail:"https://www.cetrogar.com.ar/media/catalog/product/t/e/te2715.jpg?width=500&height=500&canvas=500:500&quality=80&bg-color=255,255,255&fit=bounds",
timestamp:"2021-09-01T23:18:43.342Z") {
  _id
  title
  description
  stock
  timestamp
  codigo
  price
  thumbnail
  _v
}}
```
```
Para listar producto por precio 
{producto(price:900) {
  _id
  title
  description
  stock
  timestamp
  codigo
  price
  thumbnail
  _v
}}
```
```
Listar productos por nombre
{producto(title:"sarlanga") {
  _id
  title
  description
  stock
  timestamp
  codigo
  price
  thumbnail
  _v
}}
```
```
Listar todos los productos
{productos {
  _id
  title
  description
  stock
  timestamp
  codigo
  price
  thumbnail
  _v
}}
```
### Test: en la carpeta `src/test/ApiTest.ts`
```
Descomentar la prueba de testing post y cambiarle los datos al producto

let producto_agregar = {
  title: "pan dulce",
  description: "Escuadra de color rosa",
  stock: 400,
  codigo: "ES-55",
  price: 45,
  thumbnail: "https://cdn2.iconfinder.com/data/icons/bakery-kitchen-3/512/soda-bread-baking-512.png"
}
```
Para los test, debemos en una terminal correr la api con `npm run dev` y en la otra hacer 
```
npm run test
```

Utilizamos el middleware de compresion de node para la compresion de gzip en la aplicacion Express.

Utilizamos com logger log4js

Si queremos comprobar que tenemos un solo singleton en la factory ejecutar el archivo src/utils/ProbandoClases.ts `npx ts-node src/utils/ProbandoClases.ts`


### Front
Si queremos probar el carrito debemos loguearnos para poder agregar los productos al carrito de otra forma solo podriamos verlos.
