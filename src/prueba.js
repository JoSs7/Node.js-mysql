const express = require('express');
const app = express();
const mysql = require('mysql');
const uuid = require('uuid');
const bcryptjs = require('bcryptjs');
require("dotenv").config();

// app.use(express.json());

const { insertAccount, readAccounts } = require("./operations");

const { insertAccountPool, readAccountsPool } = require("./operations-pool");

//Conexión normal
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

//Conexión con Pool
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

var uuidAccount = uuid.v4();    //Creamos uuid
var passAccount = bcryptjs.hashSync('123', 8);  //Encriptamos pass

//Imprimimos uuid y verificamos pass
console.log('uuid: '+uuidAccount);
console.log('pass encriptada: '+passAccount);

if (bcryptjs.compareSync('123', passAccount)) {
    console.log('comparada true');
} else {
    console.log('comparada false');
};

//Conectamos a la base de datos
connection.connect((err) => {
    if (err) throw console.log("error de conexión");
    console.log("Connected to database");
});

//Ruta raíz
app.get("/", (req, res) => {
    res.send("helloo world");
});

//Ruta insertar en account
app.get("/insertAccount", (req, res) => {
    insertAccount(connection, {id: uuidAccount, email:'err565yt7@mail.com', pass: passAccount}, (result) => {
        res.json(result);
    });
});

//Ruta leer account
app.get("/readAccounts", (req, res) => {
    readAccounts(connection, (result) => {
        res.json(result);
        //Recorremos los usuarios e imprimimos el id y rol de cada uno
        for (var i =0; i < result.length; i++) {
            console.log(result[i]['user_id']);
            console.log(result[i]['user_rol']);
        }
        //Imprimimos el id del cuarto usuario
        console.log(result[3]['user_id']);
    });
});

//Ruta insertar en account con pool
app.get("/insertAccountPool", (req, res) => {
    insertAccountPool(pool, {id: uuidAccount, email:'err56uu5yt7@mail.com', pass: passAccount}, (result) => {
        res.json(result);
    });
});

//Ruta leer account con pool
app.get("/readAccountsPool", (req, res) => {
    readAccountsPool(pool, (result) => {
        res.json(result);
        //Recorremos los usuarios e imprimimos el id y rol de cada uno
        for (var i =0; i < result.length; i++) {
            console.log(result[i]['user_id']);
            console.log(result[i]['user_rol']);
        }
        //Imprimimos el id del cuarto usuario
        console.log(result[3]['user_id']);
    });
});

//Puerto 3006...
app.listen(3006, () => {
    console.log("servidor en puerto 3006...");
});

// app.listen(3006, (req, res) => {
//     confirm.console.log('SERVER UP!');
// });