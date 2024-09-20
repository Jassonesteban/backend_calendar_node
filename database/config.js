const mongoose = require('mongoose');

const dbConnection = async() => {

    const mongoURI = process.env.DB_CNN;

    await mongoose.connect(mongoURI)
        .then(() => console.log('Conectado a MongoDB en Railway :D'))
        .catch((err) => console.error('Error al conectar a MongoDB:', err));
}

module.exports = {
    dbConnection
}