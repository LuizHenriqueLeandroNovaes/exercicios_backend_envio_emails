const express = require('express');
const { cadastrarEmail , enviarNewsletter} = require('./Controladores/newsletter');

const rotas = express();

rotas.post('/emails', cadastrarEmail);
rotas.post('/newsletter', enviarNewsletter);

module.exports = rotas;