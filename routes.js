const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');

// Rotas de Home
route.get('/', homeController.homePage);

// Rotas de Login


module.exports = route;