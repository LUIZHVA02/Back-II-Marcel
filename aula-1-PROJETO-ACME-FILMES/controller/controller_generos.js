/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para generos.
 * Data: 30/01/2024
 * Autor: Luiz Henrique Vidal
 * Versão: 1.0 
 ********************************************************/


const generosDAO = require('../model/DAO/generos.js')

//Import do Arquivo de Configuração do Projeto
const message = require('../modulo/config.js')

const getListarGeneros = async function () {

    //Criar o objeto JSON
    let GenerosJSON = {}

    //Chama a função do DAO para retornar os dados do BD
    let dadosGeneros = await generosDAO.selectAllGeneros()

    //Validação para criar o JSON dos dados
    if (dadosGeneros) {
        if (dadosGeneros.length > 0) {

            //Cria o JSON de retorno dos dados
            GenerosJSON.Generos = dadosGeneros
            GenerosJSON.quantidade = dadosGeneros.length
            GenerosJSON.status_code = 200

            return GenerosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.INTERNAL_SERVER_ERROR_DB
    }
}

const setInserirNovoGenero = async function (dadosGenero, content) {
    
    try {

        if (String(content).toLowerCase() === 'application/json') {

            let novoGeneroJson = {}
            let statusvalidate = false
            if (
                dadosGenero.nome == '' || dadosGenero.nome == undefined || 
                dadosGenero.nome == null || dadosGenero.nome.length > 100) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                statusvalidate = true // validação para liberar a inserção dos dados no DAO
            }
            if (statusvalidate) {
                let novoGenero = await generosDAO.insertGeneros(dadosGenero)

                if (novoGenero) {

                    let idNovoGenero = await generosDAO.selectLastGenero()

                    novoGeneroJson.status = message.SUCCES_CREATED_ITEM.status
                    novoGeneroJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                    novoGeneroJson.message = message.SUCCES_CREATED_ITEM.message
                    novoGeneroJson.id = idNovoGenero
                    novoGeneroJson.Genero = dadosGenero

                    return novoGeneroJson
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

const setAtualizarGeneros = async function (id, dadosGeneroUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {
        
        let updateGeneroJson = {}
        try {
            const validaId = await getBuscarGenero(id)
            
            if (validaId) {
                const GeneroAtualizado = await generosDAO.updateGeneros(id, dadosGeneroUpdate)
                
                if (GeneroAtualizado) {
                    updateGeneroJson.id = validaId
                    updateGeneroJson.status = message.SUCCES_UPDATED_ITEM.status
                    updateGeneroJson.status_code = message.SUCCES_UPDATED_ITEM.status_code
                    updateGeneroJson.message = message.SUCCES_UPDATED_ITEM.message
                    updateGeneroJson.Genero = GeneroAtualizado

                    return updateGeneroJson
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

const setExcluirGenero = async function (id) {
    let deleteGeneroJson ={}
    
    try {
        const validaId = await getBuscarGenero(id)
        
        if (validaId) {
            const apagarGenero = await generosDAO.deleteGenero(id)
            
            if (apagarGenero) {
                deleteGeneroJson.status = message.SUCCES_DELETED_ITEM.status
                deleteGeneroJson.status_code = message.SUCCES_DELETED_ITEM.status_code
                deleteGeneroJson.message = message.SUCCES_DELETED_ITEM.message
                deleteGeneroJson.id = validaId

                return deleteGeneroJson
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

const getBuscarGenero = async function (id) {
    let idGenero = id

    let generoIdJSON = {}

    if (idGenero == '' || idGenero == undefined || isNaN(idGenero)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosGenero = await generosDAO.selectByIdGeneros(idGenero)

        if (dadosGenero) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosGenero.length > 0) {
                generoIdJSON.Genero = dadosGenero
                generoIdJSON.status_code = 200

                return generoIdJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }

}

const getGeneroPeloNome = async function (nome) {
    let nomeGenero = nome

    let generoIdJSON = {}

    if (nomeGenero == '' || nomeGenero == undefined) {
        return message.ERROR_INVALID_NAME_ENTER
        
    } else {

        let dadosGenero = await generosDAO.selectByNameGeneros(nomeGenero)

        if (dadosGenero) {
            if (dadosGenero.length > 0) {
                generoIdJSON.Genero = dadosGenero
                generoIdJSON.status_code = 200
                
                return generoIdJSON
            } else {
                return message.ERROR_INVALID_NAME_ENTER
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }
}

module.exports = {
    getListarGeneros,
    setInserirNovoGenero,
    setAtualizarGeneros,
    setExcluirGenero,
    getBuscarGenero,
    getGeneroPeloNome
}