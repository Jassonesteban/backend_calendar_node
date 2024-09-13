require('dotenv').config()
const express = require('express');

//servidor de express
const app = express();

//directorio publico
app.use( express.static('public') );

//parseo body
app.use(express.json());

//rutas
app.use('/api/auth', require('./routes/auth'));


app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en el puerto ${process.env.PORT}`)
})