import express from 'express';
import router from './Routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';
dotenv.config({
    path: "variables.env"
});

const app = express();

//conectar la Base de datoss

db.authenticate()
    .then(() => {
        console.log('Base de datos Conectada');
    }).catch(error => console.log(error));

//Definir Puerto  y host 
const port = process.env.PORT || 4000;
const host = process.env.HOST || '0.0.0.0';

//Habilitar Pug
app.set('view engine', 'pug');

//Obtener year actual
app.use((req, res, next) => {
    const year = new Date();
    res.locals.year = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';
    next();
})

//Agregar body parse para leer los datos del formulario
app.use(express.urlencoded({
    extended: true
}));

//Definir la carperta publica 

app.use(express.static('public'));

//Agregar el router 
app.use('/', router);

app.listen(port, host, () => {
    console.log(`El servidor esta funcionando en el puerto ${port} y el host ${host}`);
})