const express = require('express');
const session = require('express-session');
const router = express.Router();
const MySQLStore = require('express-mysql-session');
const app = express();

//Conexión normal
const connection = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'thenookofbilbo'
};

//Conectamos a la base de datos
// connection.connect((err) => {
//     if (err) throw console.log("error de conexión");
//     console.log("Connected to database");
// });

//Nos connectamos a la base de datos desde aquí
const sessionStore = new MySQLStore(connection);
//Abrimos la sesión (Se creará una tabla llamada 'sessions en la base de datos con los datos de la sesión')
app.use(session({
    key: 'cookie_usuario',
    secret: '12323',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}))

//Ruta raíz
app.get('/', (req, res) => {
    req.session.usuario = 'Jose Sanchez';
    req.session.rol = 'Admin';
    req.session.visitas = req.session.visitas ? ++req.session.visitas : 1;
    console.log(req.session);
    //Enviamos como respuesta el archivo index.html
    res.sendFile('C:/Users/jose_/Desktop/TheNookOfBilbo PROJECT/src/views/index.html');
});

//Puerto 3006...
app.listen(3006, () => {
    console.log("servidor en puerto 3006...");
});

// app.listen(3006, (req, res) => {
//     confirm.console.log('SERVER UP!');
// });