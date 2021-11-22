require('dotenv').config()
const express = require('express');
const routes = require('./routes');
const cors = require('cors')

const app = express();
// app.use(express.json())
app.use(express.json({limit: '900mb'}));
app.use(express.urlencoded({limit: '900mb', extended: true, parameterLimit:50000}));
app.use(cors())
app.use(routes)

app.listen(8080, () =>{
    console.log("Servidor Ligado")
});