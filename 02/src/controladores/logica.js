const { listarPokemons, detalharPokemon } = require('utils-playground');

const listaPokemons = async (req, res) => {
    const pokemons = listarPokemons();
    const listaPokemons = await Promise.resolve(pokemons);
    return res.status(200).json(listaPokemons.results);
}

const detalhaPokemon = async (req, res) => {
    const nome = req.params.name;
    detalharPokemon(nome).then(pokemon => {
        const {
            id,
            name,
            height,
            weight,
            base_experience,
            forms,
            abilities,
            species
        } = pokemon;

        const saida = {
            id,
            name,
            height,
            weight,
            base_experience,
            forms,
            abilities,
            species
        }
        return res.status(200).json(saida);

    }).catch((error) => {
        return res.status(404).json({ erro: error.message, mensagem: 'Nao foi encontrado Pokemon com o nome requisitado.' });
    });

}

module.exports = {
    listaPokemons,
    detalhaPokemon,
}