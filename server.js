require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');
db.connect();
const port = process.env.PORT;
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

const { connect } = require('http2');

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));

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
