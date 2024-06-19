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

            let novaClassificacaoJson = {}
            let statusvalidate = false
            if (
                dadosClassificacao.sigla == '' || dadosClassificacao.sigla == undefined || dadosClassificacao.sigla == null || dadosClassificacao.sigla.length > 5 ||
                dadosClassificacao.classificacao == '' || dadosClassificacao.classificacao == undefined || dadosClassificacao.classificacao == null || dadosClassificacao.classificacao.length > 45 ||
                dadosClassificacao.legenda == '' || dadosClassificacao.legenda == undefined || dadosClassificacao.legenda == null || dadosClassificacao.legenda.length > 150 ||
                dadosClassificacao.imagem == '' || dadosClassificacao.imagem == undefined || dadosClassificacao.imagem == null || dadosClassificacao.imagem.length > 300
                ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                statusvalidate = true // validação para liberar a inserção dos dados no DAO
            }
            if (statusvalidate) {
                let novaClassificacao = await classificacoesDAO.insertClassificacao(dadosClassificacao)

                if (novaClassificacao) {

                    let idNovaClassificacao = await classificacoesDAO.selectLastClassificacao()

                    novaClassificacaoJson.status = message.SUCCES_CREATED_ITEM.status
                    novaClassificacaoJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                    novaClassificacaoJson.message = message.SUCCES_CREATED_ITEM.message
                    novaClassificacaoJson.id = idNovaClassificacao
                    novaClassificacaoJson.Classificacao = dadosClassificacao

                    return novaClassificacaoJson
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

const setAtualizarClassificacoes = async function (id, dadosclassificacaoUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {
        
        let updateclassificacaoJson = {}
        try {
            const validaId = await getBuscarClassificacao(id)
            
            if (validaId) {
                const classificacaoAtualizado = await classificacoesDAO.updateClassificacoes(id, dadosclassificacaoUpdate)
                
                if (classificacaoAtualizado) {
                    updateclassificacaoJson.id = validaId
                    updateclassificacaoJson.status = message.SUCCES_UPDATED_ITEM.status
                    updateclassificacaoJson.status_code = message.SUCCES_UPDATED_ITEM.status_code
                    updateclassificacaoJson.message = message.SUCCES_UPDATED_ITEM.message
                    updateclassificacaoJson.classificacao = classificacaoAtualizado

                    return updateclassificacaoJson
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            } else {
                return message.ERROR_NOT_FOUND
            }

        } catch (error) {
            return message.ERROR_UPDATED_ITEM
        }
    } else {
        return message.ERROR_CONTENT_TYPE
    }
}

const setExcluirClassificacao = async function (id) {
    let deleteClassificacaoJson ={}
    
    try {
        const validaId = await getBuscarClassificacao(id)
        
        if (validaId) {
            const apagarClassificacao = await classificacoesDAO.deleteClassificacao(id)
            
            if (apagarClassificacao) {
                deleteClassificacaoJson.status = message.SUCCES_DELETED_ITEM.status
                deleteClassificacaoJson.status_code = message.SUCCES_DELETED_ITEM.status_code
                deleteClassificacaoJson.message = message.SUCCES_DELETED_ITEM.message
                deleteClassificacaoJson.id = validaId

                return deleteClassificacaoJson
            } else {
                return message.ERROR_INTERNAL_SERVER_DB
            }
        } else {
            return message.ERROR_NOT_FOUND
        }

    } catch (error) {
        return message.ERROR_UPDATED_ITEM
    }
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
        return message.ERROR_INVALID_NAME_ENTER
        
    } else {

        let dadosClassificacao = await classificacoesDAO.selectBySiglaClassificacao(siglaClassificacao)

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
    getClassificacaoPelaLegenda,
    setInserirNovaClassificacao,
    setAtualizarClassificacoes,
    setExcluirClassificacao
}