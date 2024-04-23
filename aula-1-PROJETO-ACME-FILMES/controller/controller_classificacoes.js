/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para as Classificacões.
 * Data: 30/01/2024
 * Autor: Luiz Henrique Vidal
 * Versão: 1.0 
 ********************************************************/


const classificacoesDAO = require('../model/DAO/classificacoes.js')

//Import do Arquivo de Configuração do Projeto
const message = require('../modulo/config.js')

const getListarClassificacoes = async function () {

    //Criar o objeto JSON
    let classificacoesJSON = {}

    //Chama a função do DAO para retornar os dados do BD
    let dadosClassificacoes = await classificacoesDAO.selectAllClassificacoes()

    //Validação para criar o JSON dos dados
    if (dadosClassificacoes) {
        if (dadosClassificacoes.length > 0) {

            //Cria o JSON de retorno dos dados
            classificacoesJSON.classificacoes = dadosClassificacoes
            classificacoesJSON.quantidade = dadosClassificacoes.length
            classificacoesJSON.status_code = 200

            return classificacoesJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.INTERNAL_SERVER_ERROR_DB
    }
}

const setInserirNovaClassificacao = async function (dadosClassificacao, content) {
    
    try {

        if (String(content).toLowerCase() === 'application/json') {

            let novoClassificacaoJson = {}
            let statusvalidate = false
            if (
                dadosClassificacao.nome == '' || dadosClassificacao.nome == undefined || dadosClassificacao.nome == null || dadosClassificacao.nome.length > 80 ||
                dadosClassificacao.sinopse == '' || dadosClassificacao.sinopse == undefined || dadosClassificacao.sinopse == null || dadosClassificacao.sinopse.length > 65000 ||
                dadosClassificacao.duracao == '' || dadosClassificacao.duracao == undefined || dadosClassificacao.duracao == null || dadosClassificacao.duracao.length > 8 ||
                dadosClassificacao.data_lancamento == '' || dadosClassificacao.data_lancamento == undefined || dadosClassificacao.data_lancamento == null || dadosClassificacao.data_lancamento.length != 10 ||
                dadosClassificacao.foto_capa == '' || dadosClassificacao.foto_capa == undefined || dadosClassificacao.foto_capa == null || dadosClassificacao.foto_capa.length > 200 ||
                dadosClassificacao.valor_unitario.length > 8 || isNaN(dadosClassificacao.valor_unitario) || dadosClassificacao.id_classificacao == '' || dadosClassificacao.id_classificacao == undefined ||
                dadosClassificacao.id_classificacao == null || dadosClassificacao.id_classificacao.length > 6
                ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                if (
                    dadosClassificacao.data_relancamento != '' &&
                    dadosClassificacao.data_relancamento != null &&
                    dadosClassificacao.data_relancamento != undefined
                ) {
                    if (dadosClassificacao.data_relancamento.length != 10) {
                        return message.ERROR_REQUIRED_FIELDS
                    } else {
                        statusvalidate = true // validação para liberar a inserção dos dados no DAO
                    }
                } else {
                    statusvalidate = true // validação para liberar a inserção dos dados no DAO
                }
            }
            if (statusvalidate) {
                let novoClassificacao = await classificacoesDAO.insertClassificacao(dadosClassificacao)

                if (novoClassificacao) {

                    let idNovoClassificacao = await classificacoesDAO.selectLastClassificacao()

                    novoClassificacaoJson.status = message.SUCCES_CREATED_ITEM.status
                    novoClassificacaoJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                    novoClassificacaoJson.message = message.SUCCES_CREATED_ITEM.message
                    novoClassificacaoJson.id = idNovoClassificacao
                    novoClassificacaoJson.Classificacao = dadosClassificacao

                    return novoClassificacaoJson
                } else {
                    return message.INTERNAL_SERVER_ERROR_DB
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarClassificacoes = async function (id) {
    
}

const getBuscarClassificacao = async function (id) {
    let idClassificacao = id

    let classificacaoIdJSON = {}

    if (idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosClassificacao = await classificacoesDAO.selectByIdClassificacoes(idClassificacao)

        if (dadosClassificacao) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosClassificacao.length > 0) {
                classificacaoIdJSON.classificacao = dadosClassificacao
                classificacaoIdJSON.status_code = 200

                return classificacaoIdJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }

}

const getClassificacaoPelaSigla = async function (sigla) {
    let siglaClassificacao = sigla

    let classificacaoIdJSON = {}

    if (siglaClassificacao == '' || siglaClassificacao == undefined) {
        console.log(siglaClassificacao)
        return message.ERROR_INVALID_NAME_ENTER
        
    } else {

        let dadosClassificacao = await classificacoesDAO.selectBySiglaClassificacao(siglaClassificacao)

        if (dadosClassificacao) {
            if (dadosClassificacao.length > 0) {
                classificacaoIdJSON.classificacao = dadosClassificacao
                classificacaoIdJSON.status_code = 200
                
                return classificacaoIdJSON
            } else {
                console.log(dadosClassificacao)
                return message.ERROR_INVALID_NAME_ENTER
            }
        } else {
            console.log(dadosClassificacao)
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }
}

const getClassificacaoPelaLegenda = async function (legenda) {
    let legendaClassificacao = legenda

    let classificacaoIdJSON = {}

    if (legendaClassificacao == '' || legendaClassificacao == undefined) {
        return message.ERROR_INVALID_NAME_ENTER
    } else {

        let dadosClassificacao = await classificacoesDAO.selectByLegendaClassificacao(legendaClassificacao)

        if (dadosClassificacao) {
            if (dadosClassificacao.length > 0) {
                classificacaoIdJSON.classificacao = dadosClassificacao
                classificacaoIdJSON.status_code = 200

                return classificacaoIdJSON
            } else {
                return message.ERROR_INVALID_NAME_ENTER
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }
}

module.exports = {
    getListarClassificacoes,
    getBuscarClassificacao,
    getClassificacaoPelaSigla,
    getClassificacaoPelaLegenda
}