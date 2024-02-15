/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para os filme.
 * Data: 30/01/2024
 * Autor: Luiz Henrique Vidal
 * Versão: 1.0 
 ********************************************************/

const filmesDAO = require('../modulo/DAO/filmes.js')

//Função para inserir um novo filme
const setInserirNovoFilme = async function(){

}

//Função para atualizar um filme existente
const setAtualizarNovoFilme = async function(){

}

//Função para excluir um filme existente
const setExcluirFilme = async function(){

}

//Função para retornar todos os filmes do banco de dados
const getListarFilmes = async function(){

    //Criar o objeto JSON
    let filmesJSON={}

    //Chama a função do DAO para retornar os dados do BD
    let dadosFilmes = await filmesDAO.selectAllFilmes()

    //Validação para criar o JSON dos dados
    if(dadosFilmes){

        //Cria o JSON de retorno dos dados
        filmesJSON.filmes = dadosFilmes
        filmesJSON.quantidade = dadosFilmes.length
        filmesJSON.status_code = 200
        
        return filmesJSON
    } else {
        return false
    }
}

//Função para retornar o filtro de um filme pelo id
const getBuscarFilmes = async function(){

}

module.exports = {
    setInserirNovoFilme,
    setAtualizarNovoFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilmes
}