const produtos = require('../bancodedados/produtos');
const { getStateFromZipcode } = require("utils-playground");

const listaProdutos = async (req, res) => {
    res.status(200).json(produtos)
}
const detalhaProdutoPorId = async (req, res) => {
    const { idProduto } = req.params;

    if (isNaN(Number(idProduto))) {
        return res.status(200).json({ mensagem: 'Id inválido.' })
    }

    const produtoEncontrado = produtos.find(produto => produto.id === Number(idProduto));

    if (!produtoEncontrado) {
        return res.status(404).json({ mensagem: `Não existe produto com esse Id.` })
    }
    res.status(200).json(produtoEncontrado);
}

const calculaFreteDoProdutoPorId = async (req, res) => {
    const { idProduto, cep } = req.params;

    if (cep.length !== 8) {
        return res.json({ mensagem: `cep inválido` });
    }

    const produtoEncontrado = produtos.find(produto => produto.id === Number(idProduto));
    const pedidoCep = getStateFromZipcode(cep);
    let estadoDoCep = await Promise.resolve(pedidoCep);

    if (estadoDoCep === undefined) {
        return res.json({ mensagem: `cep inválido` });
    }

    if (!produtoEncontrado) {
        return res.json({ mensagem: `Não existe produto com esse Id.` })
    }

    const valorProdutoSemFrete = produtoEncontrado.valor;

    const taxa10 = ['BA', 'SE', 'AL', 'PE', 'PB'];
    const taxa15 = ['SP', 'RJ'];
    let valorDoFrete = null;
    if (taxa10.includes(estadoDoCep)) {
        valorDoFrete = valorProdutoSemFrete * 0.1;
    } else if (taxa15.includes(estadoDoCep)) {
        valorDoFrete = valorProdutoSemFrete * 0.15
    } else {
        valorDoFrete = valorProdutoSemFrete * 0.12
    }

    const saida = {
        produto: produtoEncontrado,
        estado: estadoDoCep,
        frete: valorDoFrete
    }

    return res.status(200).json(saida);

}

module.exports = {
    listaProdutos,
    detalhaProdutoPorId,
    calculaFreteDoProdutoPorId,
}
