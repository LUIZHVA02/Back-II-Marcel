/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para Nacionalidades.
 * Data: 30/01/2024
 * Autor: Luiz Henrique Vidal
 * Versão: 1.0 
 ********************************************************/


const nacionalidadesDAO = require('../model/DAO/nacionalidades.js')

//Import do Arquivo de Configuração do Projeto
const message = require('../modulo/config.js')

const getListarNacionalidades = async function () {

    //Criar o objeto JSON
    let nacionalidadesJSON = {}

    //Chama a função do DAO para retornar os dados do BD
    let dadosNacionalidades = await nacionalidadesDAO.selectAllNacionalidades()

    //Validação para criar o JSON dos dados
    if (dadosNacionalidades) {
        if (dadosNacionalidades.length > 0) {

            //Cria o JSON de retorno dos dados
            nacionalidadesJSON.nacionalidades = dadosNacionalidades
            nacionalidadesJSON.quantidade = dadosNacionalidades.length
            nacionalidadesJSON.status_code = 200

            return nacionalidadesJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.INTERNAL_SERVER_ERROR_DB
    }
}

const setInserirNovaNacionalidade = async function (dadosNacionalidade, content) {
    
    try {

        if (String(content).toLowerCase() === 'application/json') {

            let novaNacionalidadeJson = {}
            let statusvalidate = false
            if (
                dadosNacionalidade.pais_origem == '' || dadosNacionalidade.pais_origem == undefined || 
                dadosNacionalidade.pais_origem == null || dadosNacionalidade.pais_origem.length > 100 ||
                dadosNacionalidade.nacionalidade == '' || dadosNacionalidade.nacionalidade == undefined || 
                dadosNacionalidade.nacionalidade == null || dadosNacionalidade.nacionalidade.length > 100) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                statusvalidate = true // validação para liberar a inserção dos dados no DAO
            }
            if (statusvalidate) {
                let novaNacionalidade = await nacionalidadesDAO.insertNacionalidades(dadosNacionalidade)

                if (novaNacionalidade) {

                    let idNovaNacionalidade = await nacionalidadesDAO.selectLastNacionalidade()

                    novaNacionalidadeJson.status = message.SUCCES_CREATED_ITEM.status
                    novaNacionalidadeJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                    novaNacionalidadeJson.message = message.SUCCES_CREATED_ITEM.message
                    novaNacionalidadeJson.id = idNovaNacionalidade
                    novaNacionalidadeJson.nacionalidade = dadosNacionalidade

                    return novaNacionalidadeJson
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

const setAtualizarNacionalidades = async function (id, dadosNacionalidadeUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {
        
        let updateNacionalidadeJson = {}
        try {
            const validaId = await getBuscarNacionalidade(id)
            
            if (validaId) {
                const nacionalidadeAtualizado = await nacionalidadesDAO.updateNacionalidades(id, dadosNacionalidadeUpdate)
                
                if (nacionalidadeAtualizado) {
                    updateNacionalidadeJson.id = validaId
                    updateNacionalidadeJson.status = message.SUCCES_UPDATED_ITEM.status
                    updateNacionalidadeJson.status_code = message.SUCCES_UPDATED_ITEM.status_code
                    updateNacionalidadeJson.message = message.SUCCES_UPDATED_ITEM.message
                    updateNacionalidadeJson.nacionalidade = nacionalidadeAtualizado

                    return updateNacionalidadeJson
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

const setExcluirNacionalidade = async function (id) {
    let deleteNacionalidadeJson ={}
    
    try {
        const validaId = await getBuscarNacionalidade(id)
        
        if (validaId) {
            const apagarNacionalidade = await nacionalidadesDAO.deleteNacionalidade(id)
            
            if (apagarNacionalidade) {
                deleteNacionalidadeJson.status = message.SUCCES_DELETED_ITEM.status
                deleteNacionalidadeJson.status_code = message.SUCCES_DELETED_ITEM.status_code
                deleteNacionalidadeJson.message = message.SUCCES_DELETED_ITEM.message
                deleteNacionalidadeJson.id = validaId

                return deleteNacionalidadeJson
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

const getBuscarNacionalidade = async function (id) {
    let idNacionalidade = id

    let nacionalidadeIdJSON = {}

    if (idNacionalidade == '' || idNacionalidade == undefined || isNaN(idNacionalidade)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosNacionalidade = await nacionalidadesDAO.selectByIdNacionalidades(idNacionalidade)

        if (dadosNacionalidade) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosNacionalidade.length > 0) {
                nacionalidadeIdJSON.Nacionalidade = dadosNacionalidade
                nacionalidadeIdJSON.status_code = 200

                return nacionalidadeIdJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }

}

const getNacionalidadePeloPaisOrigem = async function (pais_origem) {
    let pais_origemNacionalidade = pais_origem

    let nacionalidadeIdJSON = {}

    if (pais_origemNacionalidade == '' || pais_origemNacionalidade == undefined) {
        return message.ERROR_INVALID_NAME_ENTER
        
    } else {

        let dadosNacionalidade = await nacionalidadesDAO.selectByNamePaisOrigem(pais_origemNacionalidade)

        if (dadosNacionalidade) {
            if (dadosNacionalidade.length > 0) {
                nacionalidadeIdJSON.Nacionalidade = dadosNacionalidade
                nacionalidadeIdJSON.status_code = 200
                
                return nacionalidadeIdJSON
            } else {
                return message.ERROR_INVALID_NAME_ENTER
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }
}

const getNacionalidadePelaNacionalidade = async function (nacionalidade) {
    let nomeNacionalidade = nacionalidade

    let nacionalidadeIdJSON = {}

    if (nomeNacionalidade == '' || nomeNacionalidade == undefined) {
        return message.ERROR_INVALID_NAME_ENTER
        
    } else {

        let dadosNacionalidade = await nacionalidadesDAO.selectByNameNacionalidades(nomeNacionalidade)

        if (dadosNacionalidade) {
            if (dadosNacionalidade.length > 0) {
                nacionalidadeIdJSON.Nacionalidade = dadosNacionalidade
                nacionalidadeIdJSON.status_code = 200
                
                return nacionalidadeIdJSON
            } else {
                return message.ERROR_INVALID_NAME_ENTER
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }
}

module.exports = {
    getListarNacionalidades,
    setInserirNovaNacionalidade,
    setAtualizarNacionalidades,
    setExcluirNacionalidade,
    getBuscarNacionalidade,
    getNacionalidadePelaNacionalidade,
    getNacionalidadePeloPaisOrigem
}