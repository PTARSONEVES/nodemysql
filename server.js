require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');

/*
(async () => {
    let instrucao = 'SELECT id,observacoes FROM ct_artigos'
    const clientes = await db.consulta(instrucao);
    console.log(clientes);
})();
*/

//db.connect();
const port = process.env.PORT;
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

const { connect } = require('http2');
const { Store } = require('express-session');

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: process.env.SESS_SECRET,
    Store: new MySQLStore(db.connect()),
    connectionLimit: 10,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    },
    createDatabaseTable: false
});
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());

app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);

app.use(routes);

app.listen(port, () => {
    console.log('Servidor executando na porta '+port.toString());
    console.log('Página inicial http://localhost:'+port.toString());
});
