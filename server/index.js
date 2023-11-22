require('dotenv').config({path:'variables.env'});
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// app.get('/', (req, res) => {
//     db.query("insert into Users (name, email, password) values ('timas', 'timas@gmail', 'timasPassword')", (error, result) => {
//         if (error) console.log(error); return;
//     });
//     res.send("Olá, Mundo!");
// });

app.use(express.json());;
app.use(cors());

app.post("/register", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    db.query("select Users.email from Users where Users.email = ?", [email], 
        (error, result) => {
            if (error) res.send(error);
            if (result.length === 0) {
                bcrypt.hash(password, saltRounds, (error, hash) => {
                    db.query("insert into Users (name, email, password) values (?, ?, ?)", [name, email, hash], 
                    (error, response) => {
                        if (error) res.send(error);
                        res.send({msg: "Usuário cadastrado com sucesso!"});
                    });
                });
            }else {
                res.send({msg: "Usuário ja cadastrado!"})
            }
    });
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("select * from Users where Users.email = ?", [email], (error, result) => {
        if (error) res.send(error);
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, result) => {
                if (result) {
                    res.send({msg: "Usuário logado com sucesso!"});
                    return;
                }
                res.send({msg: "Senha incorreta!"})
            });
            return;
        }
        res.send({msg: "Email incorreto!"})
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor em funcionamento em: http://localhost:${process.env.PORT}`);
});