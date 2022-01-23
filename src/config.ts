
import dotenv from 'dotenv'
const path = require('path')


const part1='ACd2c12ca55706e85'
const part2='d789bbe558d335f36'


export const credencialesEmail = {
    user:"disvolvi.apon@gmail.com",
    pass:"Ciro9802"
}    

export const credencialesTwilio = {
    accountSid : 'ACd2c12ca55706e85d789bbe558d335f36',
    authToken : '6a948a4938cb6aa64ef8ae4ae2f11fab',
    number:'+13863563624'
}    

export const administrador = {
    phone:"5492215731619",
    email:"ramegp@gmail.com"
}    


dotenv.config({
    path: path.resolve(__dirname, process.env.NODE_ENV +'.env')
})

export const config = {
    NODE_ENV :process.env.NODE_ENV || 'development',
    HOST : process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 8080
}

