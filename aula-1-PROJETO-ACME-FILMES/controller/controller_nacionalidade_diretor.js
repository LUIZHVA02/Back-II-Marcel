/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para os Diretor.
 * Data: 30/01/2024
 * Autor: Luiz Henrique Vidal
 * Versão: 1.0 
 ********************************************************/

const nacionalidadesDiretorDAO = require('../model/DAO/nacionalidade_diretor.js')

//Import do Arquivo de Configuração do Projeto
const message = require('../modulo/config.js')



const getListarNacionalidadesDiretor = async function () {

    //Criar o objeto JSON
    let NacionalidadesDiretorJSON = {}

    //Chama a função do DAO para retornar os dados do BD
    let dadosNacionalidadesDiretor = await nacionalidadesDiretorDAO.selectAllNacionalidadesDiretor()

    //Validação para criar o JSON dos dados
    if (dadosNacionalidadesDiretor) {
        if (dadosNacionalidadesDiretor.length > 0) {

            //Cria o JSON de retorno dos dados
            NacionalidadesDiretorJSON.NacionalidadesDiretor = dadosNacionalidadesDiretor
            NacionalidadesDiretorJSON.quantidade = dadosNacionalidadesDiretor.length
            NacionalidadesDiretorJSON.status_code = 200

            return NacionalidadesDiretorJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.INTERNAL_SERVER_ERROR_DB
    }
}

const getBuscarNacionalidadeDiretorById = async function (id) {
    let idNacionalidadeDiretor = id

    let nacionalidadeDiretorIdJSON = {}

    if (idNacionalidadeDiretor == '' || idNacionalidadeDiretor == undefined || isNaN(idNacionalidadeDiretor)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosNacionalidadeDiretor = await nacionalidadesDiretorDAO.selectNacionalidadesDiretorById(idNacionalidadeDiretor)

        if (dadosNacionalidadeDiretor) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosNacionalidadeDiretor.length > 0) {
                nacionalidadeDiretorIdJSON.nacionalidadeDiretor = dadosNacionalidadeDiretor
                nacionalidadeDiretorIdJSON.status_code = 200

                return nacionalidadeDiretorIdJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }

}

const setInserirNovoNacionalidadeDiretor = async function (dadosNacionalidadeDiretor, content) {

    try {

        if (String(content).toLowerCase() === 'application/json') {

            let novoNacionalidadeDiretorJson = {}
            let statusvalidate = false
            if (
                dadosNacionalidadeDiretor.id_diretor            == ''   || dadosNacionalidadeDiretor.id_diretor                == undefined || 
                dadosNacionalidadeDiretor.id_diretor            == null ||
                dadosNacionalidadeDiretor.id_nacionalidade      == ''   || dadosNacionalidadeDiretor.id_nacionalidade          == undefined || 
                dadosNacionalidadeDiretor.id_nacionalidade      == null
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                statusvalidate = true // validação para liberar a inserção dos dados no DAO
            }
            if (statusvalidate) {
                let novoNacionalidadeDiretor = await nacionalidadesDiretorDAO.insertNacionalidadesDiretor(dadosNacionalidadeDiretor)

                if (novoNacionalidadeDiretor) {

                    let idNovoNacionalidadeDiretor = await nacionalidadesDiretorDAO.selectLastIdNacionalidadesDiretor()

                    novoNacionalidadeDiretorJson.status = message.SUCCES_CREATED_ITEM.status
                    novoNacionalidadeDiretorJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                    novoNacionalidadeDiretorJson.message = message.SUCCES_CREATED_ITEM.message
                    novoNacionalidadeDiretorJson.id = idNovoNacionalidadeDiretor
                    novoNacionalidadeDiretorJson.nacionalidadeDiretor = dadosNacionalidadeDiretor

                    return novoNacionalidadeDiretorJson
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

const setAtualizarNovoNacionalidadeDiretor = async function (id, dadosNacionalidadeDiretorUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {

        let updateNacionalidadeDiretorJson = {}
        try {
            const validaId = await nacionalidadesDiretorDAO.selectNacionalidadesDiretorById(id)

            if (validaId) {
                const nacionalidadeDiretorAtualizado = await nacionalidadesDiretorDAO.updateNacionalidadesDiretor(id, dadosNacionalidadeDiretorUpdate)

                if (nacionalidadeDiretorAtualizado) {
                    updateNacionalidadeDiretorJson.id = validaId
                    updateNacionalidadeDiretorJson.status = message.SUCCES_UPDATED_ITEM.status
                    updateNacionalidadeDiretorJson.status_code = message.SUCCES_UPDATED_ITEM.status_code
                    updateNacionalidadeDiretorJson.message = message.SUCCES_UPDATED_ITEM.message
                    updateNacionalidadeDiretorJson.nacionalidadeDiretor = nacionalidadeDiretorAtualizado

                    return updateNacionalidadeDiretorJson
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

const setExcluirNacionalidadeDiretor = async function (id) {
    let deleteNacionalidadeDiretorJson = {}

    try {
        const validaId = await nacionalidadesDiretorDAO.selectNacionalidadesDiretorById(id)

        if (validaId) {
            const apagarNacionalidadeDiretor = await nacionalidadesDiretorDAO.deleteNacionalidadesDiretor(id)

            if (apagarNacionalidadeDiretor) {
                deleteNacionalidadeDiretorJson.status = message.SUCCES_DELETED_ITEM.status
                deleteNacionalidadeDiretorJson.status_code = message.SUCCES_DELETED_ITEM.status_code
                deleteNacionalidadeDiretorJson.message = message.SUCCES_DELETED_ITEM.message
                deleteNacionalidadeDiretorJson.id = validaId

                return deleteNacionalidadeDiretorJson
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

const setExcluirNacionalidadeDiretorByDiretorId = async function (idDiretor) {
    let deleteNacionalidadeDiretorJson = {}

    try {
        const validaId = await nacionalidadesDiretorDAO.selectNacionalidadesDiretorByIdDiretor(idDiretor)

        if (validaId) {
            const apagarNacionalidadeDiretor = await nacionalidadesDiretorDAO.deleteNacionalidadesDiretorPorIdDiretor(idDiretor)

            if (apagarNacionalidadeDiretor) {
                deleteNacionalidadeDiretorJson.status = message.SUCCES_DELETED_ITEM.status
                deleteNacionalidadeDiretorJson.status_code = message.SUCCES_DELETED_ITEM.status_code
                deleteNacionalidadeDiretorJson.message = message.SUCCES_DELETED_ITEM.message
                deleteNacionalidadeDiretorJson.id = validaId

                return deleteNacionalidadeDiretorJson
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

const setExcluirNacionalidadeDiretorByNacionalideId = async function (idNacionalidade) {
    let deleteNacionalidadeDiretorJson = {}

    try {
        const validaId = await nacionalidadesDiretorDAO.selectNacionalidadesDiretorByIdNacionalidade(idNacionalidade)

        if (validaId) {
            const apagarNacionalidadeDiretor = await nacionalidadesDiretorDAO.deleteNacionalidadesDiretorPorIdNacionalidade(idNacionalidade)

            if (apagarNacionalidadeDiretor) {
                deleteNacionalidadeDiretorJson.status = message.SUCCES_DELETED_ITEM.status
                deleteNacionalidadeDiretorJson.status_code = message.SUCCES_DELETED_ITEM.status_code
                deleteNacionalidadeDiretorJson.message = message.SUCCES_DELETED_ITEM.message
                deleteNacionalidadeDiretorJson.id = validaId

                return deleteNacionalidadeDiretorJson
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

module.exports = {
    getListarNacionalidadesDiretor,
    getBuscarNacionalidadeDiretorById,
    setAtualizarNovoNacionalidadeDiretor,
    setExcluirNacionalidadeDiretor,
    setInserirNovoNacionalidadeDiretor,
    setExcluirNacionalidadeDiretorByDiretorId,
    setExcluirNacionalidadeDiretorByNacionalideId
}