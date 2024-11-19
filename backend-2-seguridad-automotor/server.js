const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { configurePassport } = require('./config/passport'); // Usando require

const app = express();

app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: true,
}));

// Configuración de Passport
configurePassport(app);

app.listen(8080, () => {
    console.log('Servidor corriendo en http://localhost:8080');
});
