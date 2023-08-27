const express = require('express');
const { listaPokemons, detalhaPokemon } = require('./controladores/logica')
const rotas = express.Router();

rotas.get("/pokemon", listaPokemons)
rotas.get("/pokemon/:name", detalhaPokemon)

module.exports = rotas;