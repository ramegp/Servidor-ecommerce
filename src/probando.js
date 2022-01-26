const axios = require('axios')

const url = 'https://sheltered-shore-33386.herokuapp.com/products'

axios({
    method:'GET',
    url:url
}).then(data=>console.log(data))
.catch(err=>console.log(err))