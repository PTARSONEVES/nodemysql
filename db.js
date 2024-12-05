require('dotenv').config();

// Conecta o Banco de Dados

async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
    const mysql = require("mysql2/promise");
//    const connection = await mysql.createConnection(process.env.CONNECTION_MYSQL);
    const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    });

    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

//connect();

// Consulta o banco de dados

async function consulta(instrucao){
    const conn = await connect();
    const [rows] = await conn.query(instrucao);
    return rows;
}

// Insere Dados

async function adiciona(instrucao, valores){
    const conn = await connect();
//    const sql = 'INSERT INTO clientes(nome,idade,uf) VALUES (?,?,?);';
//    const values = [customer.nome, customer.idade, customer.uf];
    return await conn.query(instrucao, valores);
}

// Atualiza Dados

async function atualiza(instrucao, valores){
    const conn = await connect();
//    const sql = 'UPDATE clientes SET nome=?, idade=?, uf=? WHERE id=?';
//    const values = [customer.nome, customer.idade, customer.uf, id];
    return await conn.query(instrucao, valores);
}

// Apaga Registro

async function apaga(instrucao){
    const conn = await connect();
//    const sql = 'DELETE FROM clientes where id=?;';
    return await conn.query(instrucao);
}

// Seção



module.exports = {connect, consulta, adiciona, atualiza, apaga};
