const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'r2d2c3potc14ig88',
    database: 'agenda_petshop'
});

module.exports = conexao;