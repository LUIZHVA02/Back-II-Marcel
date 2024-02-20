/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para os filme.
 * Data: 30/01/2024
 * Autor: Luiz Henrique Vidal
 * Versão: 1.0 
 ********************************************************/


const filmesDAO = require('../model/DAO/filmes.js')

//Import do Arquivo de Configuração do Projeto
const message = require('../modulo/config.js')


//Função para inserir um novo filme
const setInserirNovoFilme = async function () {

}

//Função para atualizar um filme existente
const setAtualizarNovoFilme = async function () {

}

//Função para excluir um filme existente
const setExcluirFilme = async function () {

}

//Função para retornar todos os filmes do banco de dados
const getListarFilmes = async function () {

    //Criar o objeto JSON
    let filmesJSON = {}

    //Chama a função do DAO para retornar os dados do BD
    let dadosFilmes = await filmesDAO.selectAllFilmes()

    //Validação para criar o JSON dos dados
    if (dadosFilmes) {

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
const getBuscarFilmes = async function (id) {

    let idFilme = id

    let filmeIdJson = {}

    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID
    } else {

        //Encaminha o ID do filme para o DAO para o retorno do banco de dados 
        let dadosFilme = await filmesDAO.selectByIdFilmes(idFilme)

        if (dadosFilme) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosFilme.length > 0) {
                filmeIdJson.filme = dadosFilme
                filmeIdJson.status_code = 200
                return filmeIdJson
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }
}

module.exports = {
    setInserirNovoFilme,
    setAtualizarNovoFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilmes
}