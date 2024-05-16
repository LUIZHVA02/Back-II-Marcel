/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para os Ator.
 * Data: 30/01/2024
 * Autor: Luiz Henrique Vidal
 * Versão: 1.0 
 ********************************************************/

const nacionalidadesAtorDAO = require('../model/DAO/nacionalidade_ator.js')

//Import do Arquivo de Configuração do Projeto
const message = require('../modulo/config.js')



const getListarNacionalidadesAtor = async function () {

    //Criar o objeto JSON
    let NacionalidadesAtorJSON = {}

    //Chama a função do DAO para retornar os dados do BD
    let dadosNacionalidadesAtor = await nacionalidadesAtorDAO.selectAllNacionalidadesAtor()

    //Validação para criar o JSON dos dados
    if (dadosNacionalidadesAtor) {
        if (dadosNacionalidadesAtor.length > 0) {

            //Cria o JSON de retorno dos dados
            NacionalidadesAtorJSON.NacionalidadesAtor = dadosNacionalidadesAtor
            NacionalidadesAtorJSON.quantidade = dadosNacionalidadesAtor.length
            NacionalidadesAtorJSON.status_code = 200

            return NacionalidadesAtorJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.INTERNAL_SERVER_ERROR_DB
    }
}

const getBuscarNacionalidadeAtorById = async function (id) {
    let idNacionalidadeAtor = id

    let nacionalidadeAtorIdJSON = {}

    if (idNacionalidadeAtor == '' || idNacionalidadeAtor == undefined || isNaN(idNacionalidadeAtor)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosNacionalidadeAtor = await nacionalidadesAtorDAO.selectNacionalidadesAtorById(idNacionalidadeAtor)

        if (dadosNacionalidadeAtor) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosNacionalidadeAtor.length > 0) {
                nacionalidadeAtorIdJSON.nacionalidadeAtor = dadosNacionalidadeAtor
                nacionalidadeAtorIdJSON.status_code = 200

                return nacionalidadeAtorIdJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }

}

const getBuscarNacionalidadeAtorByIdAtorIdNacionalidade = async function (content, dadosAtorNacionalidade) {

    try {
        if (String(content).toLowerCase() === 'application/json') {
            let idNacionalidade = dadosAtorNacionalidade.id_nacionalidade
            let idAtor = dadosAtorNacionalidade.id_ator
        
            let nacionalidadeAtorIdJSON = {}
        
            if (
                idNacionalidade == '' || idNacionalidade == undefined || isNaN(idNacionalidade) &&
                idAtor == '' || idAtor == undefined || isNaN(idAtor)
            ) {
                return message.ERROR_INVALID_ID
            } else {
                let dadosNacionalidadeAtor = await nacionalidadesAtorDAO.selectNacionalidadesAtorByIdAtorIdNacionalidade(idAtor,idNacionalidade)
        
                if (dadosNacionalidadeAtor) {
                    //Validação para verificar se o DAO retornou os dados
                    if (dadosNacionalidadeAtor.length > 0) {
                        nacionalidadeAtorIdJSON.nacionalidadeAtorInfo = dadosNacionalidadeAtor
                        nacionalidadeAtorIdJSON.status_code = 200
        
                        return nacionalidadeAtorIdJSON
                    } else {
                        return message.ERROR_NOT_FOUND
                    }
                } else {
                    return message.INTERNAL_SERVER_ERROR_DB
                }
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }

}

const setInserirNovoNacionalidadeAtor = async function (dadosNacionalidadeAtor, content) {

    try {

        if (String(content).toLowerCase() === 'application/json') {

            let novoNacionalidadeAtorJson = {}
            let statusvalidate = false
            if (
                dadosNacionalidadeAtor.id_ator == '' || dadosNacionalidadeAtor.id_ator == undefined ||
                dadosNacionalidadeAtor.id_ator == null ||
                dadosNacionalidadeAtor.id_nacionalidade == '' || dadosNacionalidadeAtor.id_nacionalidade == undefined ||
                dadosNacionalidadeAtor.id_nacionalidade == null
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                statusvalidate = true // validação para liberar a inserção dos dados no DAO
            }
            if (statusvalidate) {
                let novoNacionalidadeAtor = await nacionalidadesAtorDAO.insertNacionalidadesAtor(dadosNacionalidadeAtor)

                if (novoNacionalidadeAtor) {

                    let idNovoNacionalidadeAtor = await nacionalidadesAtorDAO.selectLastIdNacionalidadesAtor()

                    novoNacionalidadeAtorJson.status = message.SUCCES_CREATED_ITEM.status
                    novoNacionalidadeAtorJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                    novoNacionalidadeAtorJson.message = message.SUCCES_CREATED_ITEM.message
                    novoNacionalidadeAtorJson.id = idNovoNacionalidadeAtor
                    novoNacionalidadeAtorJson.nacionalidadeAtor = dadosNacionalidadeAtor

                    return novoNacionalidadeAtorJson
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

const setAtualizarNovoNacionalidadeAtor = async function (id, dadosNacionalidadeAtorUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {

        let updateNacionalidadeAtorJson = {}
        try {
            const validaId = await nacionalidadesAtorDAO.selectNacionalidadesAtorById(id)

            if (validaId) {
                const nacionalidadeAtorAtualizado = await nacionalidadesAtorDAO.updateNacionalidadesAtor(id, dadosNacionalidadeAtorUpdate)

                if (nacionalidadeAtorAtualizado) {
                    updateNacionalidadeAtorJson.id = validaId
                    updateNacionalidadeAtorJson.status = message.SUCCES_UPDATED_ITEM.status
                    updateNacionalidadeAtorJson.status_code = message.SUCCES_UPDATED_ITEM.status_code
                    updateNacionalidadeAtorJson.message = message.SUCCES_UPDATED_ITEM.message
                    updateNacionalidadeAtorJson.nacionalidadeAtor = nacionalidadeAtorAtualizado

                    return updateNacionalidadeAtorJson
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

const setExcluirNacionalidadeAtor = async function (id) {
    let deleteNacionalidadeAtorJson = {}

    try {
        const validaId = await nacionalidadesAtorDAO.selectNacionalidadesAtorById(id)

        if (validaId) {
            const apagarNacionalidadeAtor = await nacionalidadesAtorDAO.deleteNacionalidadesAtor(id)

            if (apagarNacionalidadeAtor) {
                deleteNacionalidadeAtorJson.status = message.SUCCES_DELETED_ITEM.status
                deleteNacionalidadeAtorJson.status_code = message.SUCCES_DELETED_ITEM.status_code
                deleteNacionalidadeAtorJson.message = message.SUCCES_DELETED_ITEM.message
                deleteNacionalidadeAtorJson.id = validaId

                return deleteNacionalidadeAtorJson
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

const setExcluirNacionalidadeAtorByAtorId = async function (idAtor) {
    let deleteNacionalidadeAtorJson = {}

    try {
        const validaId = await nacionalidadesAtorDAO.selectNacionalidadesAtorByIdAtor(idAtor)

        if (validaId) {
            const apagarNacionalidadeAtor = await nacionalidadesAtorDAO.deleteNacionalidadesAtorPorIdAtor(idAtor)

            if (apagarNacionalidadeAtor) {
                deleteNacionalidadeAtorJson.status = message.SUCCES_DELETED_ITEM.status
                deleteNacionalidadeAtorJson.status_code = message.SUCCES_DELETED_ITEM.status_code
                deleteNacionalidadeAtorJson.message = message.SUCCES_DELETED_ITEM.message
                deleteNacionalidadeAtorJson.id = validaId

                return deleteNacionalidadeAtorJson
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

const setExcluirNacionalidadeAtorByNacionalideId = async function (idNacionalidade) {
    let deleteNacionalidadeAtorJson = {}

    try {
        const validaId = await nacionalidadesAtorDAO.selectNacionalidadesAtorByIdNacionalidade(idNacionalidade)

        if (validaId) {
            const apagarNacionalidadeAtor = await nacionalidadesAtorDAO.deleteNacionalidadesAtorPorIdNacionalidade(idNacionalidade)

            if (apagarNacionalidadeAtor) {
                deleteNacionalidadeAtorJson.status = message.SUCCES_DELETED_ITEM.status
                deleteNacionalidadeAtorJson.status_code = message.SUCCES_DELETED_ITEM.status_code
                deleteNacionalidadeAtorJson.message = message.SUCCES_DELETED_ITEM.message
                deleteNacionalidadeAtorJson.id = validaId

                return deleteNacionalidadeAtorJson
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
    getListarNacionalidadesAtor,
    getBuscarNacionalidadeAtorById,
    getBuscarNacionalidadeAtorByIdAtorIdNacionalidade,
    setAtualizarNovoNacionalidadeAtor,
    setExcluirNacionalidadeAtor,
    setInserirNovoNacionalidadeAtor,
    setExcluirNacionalidadeAtorByAtorId,
    setExcluirNacionalidadeAtorByNacionalideId
}