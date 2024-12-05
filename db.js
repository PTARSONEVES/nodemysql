require('dotenv').config();
async function connect(query){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection(process.env.CONNECTION_MYSQL);
/*
    const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    });
*/
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

exports.connect = connect;
