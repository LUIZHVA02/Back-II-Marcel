const { json } = require('express')
var filmes = require('../modulo/filmes')

const getFilmes = function (){
    let jsonFilmes = {}
    let arrayFilmes = []
    let caminhoFilmes = filmes.filmes.filmes

    caminhoFilmes.forEach(function (caminhoFilmes) {
            let jsonFilmeAtual = {}

            jsonFilmeAtual.nome_filme = caminhoFilmes.nome
            jsonFilmeAtual.sinopse_filme = caminhoFilmes.sinopse
            jsonFilmeAtual.duracao_filme = caminhoFilmes.duracao
            jsonFilmeAtual.data_lancamento_filme = caminhoFilmes.data_lancamento
            jsonFilmeAtual.data_relancamento_filme = caminhoFilmes.data_relancamento
            jsonFilmeAtual.foto_capa_filme = caminhoFilmes.foto_capa
            jsonFilmeAtual.valor_unitario_filme = caminhoFilmes.valor_unitario

        arrayFilmes.push(jsonFilmeAtual)
    
    })
    
    jsonFilmes.filmes = arrayFilmes

    console.log(jsonFilmes)
    return jsonFilmes
}

const getFilmesID = function (filmeIdUser) {
    
    let idFilme = filmeIdUser
    let jsonFilmesID = {}
    let arrayFilmesID = []
    let caminhoFilmes = filmes.filmes.filmes
    
    caminhoFilmes.forEach(function (caminhoFilmes){
        
        if(caminhoFilmes.id.includes(idFilme)){
            
            let jsonFilmeAtual = {}

            jsonFilmeAtual.nome_filme = caminhoFilmes.nome
            jsonFilmeAtual.sinopse_filme = caminhoFilmes.sinopse
            jsonFilmeAtual.duracao_filme = caminhoFilmes.duracao
            jsonFilmeAtual.data_lancamento_filme = caminhoFilmes.data_lancamento
            jsonFilmeAtual.data_relancamento_filme = caminhoFilmes.data_relancamento
            jsonFilmeAtual.foto_capa_filme = caminhoFilmes.foto_capa
            jsonFilmeAtual.valor_unitario_filme = caminhoFilmes.valor_unitario

            arrayFilmesID.push(jsonFilmeAtual)
        }
    })

    jsonFilmesID.filme = arrayFilmesID

    console.log(jsonFilmesID)
    return jsonFilmesID
}
getFilmesID('1')



module.exports = {
    getFilmes,
    getFilmesID
}