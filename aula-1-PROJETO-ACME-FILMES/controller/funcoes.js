const { json } = require('express')
var filmes = require('../modulo/filmes')

const getNomeFilmes = function () {
    
    let jsonFilmes = {}
    let arrayFilmes = []
    let caminhoFilmes = filmes.filmes.filmes
    
    caminhoFilmes.forEach(function (nome, id){
        arrayFilmes.push(caminhoFilmes[id].nome)
    })

    jsonFilmes.nome_filmes = arrayFilmes

    console.log(jsonFilmes)
    return jsonFilmes
}
getNomeFilmes()
module.exports = {
    getNomeFilmes
}