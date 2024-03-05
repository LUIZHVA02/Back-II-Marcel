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
const setInserirNovoFilme = async function (dadosFilme) {
    
    let novoFilmeJson = {}
    let statusvalidate = false
    if(
        dadosFilme.nome                == ''|| dadosFilme.nome            == undefined|| dadosFilme.nome             == null|| dadosFilme.nome.length             > 80||
        dadosFilme.sinopse             == ''|| dadosFilme.sinopse         == undefined|| dadosFilme.sinopse          == null|| dadosFilme.sinopse.length       > 65000||
        dadosFilme.duracao             == ''|| dadosFilme.duracao         == undefined|| dadosFilme.duracao          == null|| dadosFilme.duracao.length           > 8||
        dadosFilme.data_lancamento     == ''|| dadosFilme.data_lancamento == undefined|| dadosFilme.data_lancamento  == null|| dadosFilme.data_lancamento.length != 10||
        dadosFilme.foto_capa           == ''|| dadosFilme.foto_capa       == undefined|| dadosFilme.foto_capa        == null|| dadosFilme.foto_capa.length       > 200||
        dadosFilme.valor_unitario.length > 8|| isNaN(dadosFilme.valor_unitario)
        ){
        return message.ERROR_REQUIRED_FIELDS
    }else{
        if (
            dadosFilme.data_relancamento != ''        &&
            dadosFilme.data_relancamento != null      &&
            dadosFilme.data_relancamento != undefined
            ) {
                if(dadosFilme.data_relancamento.length != 10){
                    return message.ERROR_REQUIRED_FIELDS
                } else{
                    statusvalidate = true // validação para liberar a inserção dos dados no DAO
                }
        } else {
            statusvalidate = true // validação para liberar a inserção dos dados no DAO
        }
    }
        if(statusvalidate){
            let novoFilme = await filmesDAO.InsertFilme(dadosFilme)

            if (novoFilme) {
                novoFilmeJson.status        = message.SUCCES_CREATED_ITEM.status
                novoFilmeJson.status_code   = message.SUCCES_CREATED_ITEM.status_code
                novoFilmeJson.message       = message.SUCCES_CREATED_ITEM.message
                novoFilmeJson.filme         = dadosFilme
                
                return novoFilmeJson
            } else {
                return message.INTERNAL_SERVER_ERROR_DB
            }
        }

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
        if (dadosFilmes.length > 0) {

            //Cria o JSON de retorno dos dados
            filmesJSON.filmes = dadosFilmes
            filmesJSON.quantidade = dadosFilmes.length
            filmesJSON.status_code = 200

            return filmesJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.INTERNAL_SERVER_ERROR_DB
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

const getBuscarFilmesPeloNome = async function (nome) {
    let nomeFilme = nome

    let filmeNomeJson = {}

    if (nomeFilme == '' || nomeFilme == undefined) {
        return message.ERROR_INVALID_ID
    } else {

        //Encaminha o ID do filme para o DAO para o retorno do banco de dados 
        let dadosFilme = await filmesDAO.selectByNameFilmes(nomeFilme)

        if (dadosFilme) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosFilme.length > 0) {
                filmeNomeJson.filme = dadosFilme
                filmeNomeJson.status_code = 200
                
                return filmeNomeJson
            } else {
                return message.ERROR_INVALID_NAME_ENTER
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
    getBuscarFilmes,
    getBuscarFilmesPeloNome
}