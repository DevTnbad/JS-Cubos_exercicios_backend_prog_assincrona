const express = require('express');
const rotas = express.Router();
const { listaProdutos, detalhaProdutoPorId, calculaFreteDoProdutoPorId } = require('./contoladores/produtos');

rotas.get('/produtos', listaProdutos);
rotas.get('/produtos/:idProduto', detalhaProdutoPorId);
rotas.get('/produtos/:idProduto/frete/:cep', calculaFreteDoProdutoPorId);

module.exports = rotas;