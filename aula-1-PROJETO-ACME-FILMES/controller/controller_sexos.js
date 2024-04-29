/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para Sexos.
 * Data: 30/01/2024
 * Autor: Luiz Henrique Vidal
 * Versão: 1.0 
 ********************************************************/


const sexosDAO = require('../model/DAO/sexos.js')

//Import do Arquivo de Configuração do Projeto
const message = require('../modulo/config.js')

const getListarSexos = async function () {

    //Criar o objeto JSON
    let sexosJSON = {}

    //Chama a função do DAO para retornar os dados do BD
    let dadosSexos = await sexosDAO.selectAllSexos()

    //Validação para criar o JSON dos dados
    if (dadosSexos) {
        if (dadosSexos.length > 0) {

            //Cria o JSON de retorno dos dados
            sexosJSON.Sexos = dadosSexos
            sexosJSON.quantidade = dadosSexos.length
            sexosJSON.status_code = 200

            return sexosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.INTERNAL_SERVER_ERROR_DB
    }
}

const setInserirNovoSexo = async function (dadosSexo, content) {
    
    try {

        if (String(content).toLowerCase() === 'application/json') {

            let novoSexoJson = {}
            let statusvalidate = false
            if (
                dadosSexo.sexo == '' || dadosSexo.sexo == undefined || 
                dadosSexo.sexo == null || dadosSexo.sexo.length > 100) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                statusvalidate = true // validação para liberar a inserção dos dados no DAO
            }
            if (statusvalidate) {
                let novoSexo = await sexosDAO.insertSexos(dadosSexo)

                if (novoSexo) {

                    let idNovoSexo = await sexosDAO.selectLastSexo()

                    novoSexoJson.status = message.SUCCES_CREATED_ITEM.status
                    novoSexoJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                    novoSexoJson.message = message.SUCCES_CREATED_ITEM.message
                    novoSexoJson.id = idNovoSexo
                    novoSexoJson.Sexo = dadosSexo

                    return novoSexoJson
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

const setAtualizarSexos = async function (id, dadosSexoUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {
        
        let updateSexoJson = {}
        try {
            const validaId = await getBuscarSexo(id)
            
            if (validaId) {
                const SexoAtualizado = await sexosDAO.updateSexos(id, dadosSexoUpdate)
                
                if (SexoAtualizado) {
                    updateSexoJson.id = validaId
                    updateSexoJson.status = message.SUCCES_UPDATED_ITEM.status
                    updateSexoJson.status_code = message.SUCCES_UPDATED_ITEM.status_code
                    updateSexoJson.message = message.SUCCES_UPDATED_ITEM.message
                    updateSexoJson.Sexo = SexoAtualizado

                    return updateSexoJson
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

const setExcluirSexo = async function (id) {
    let deleteSexoJson ={}
    
    try {
        const validaId = await getBuscarSexo(id)
        
        if (validaId) {
            const apagarSexo = await sexosDAO.deleteSexo(id)
            
            if (apagarSexo) {
                deleteSexoJson.status = message.SUCCES_DELETED_ITEM.status
                deleteSexoJson.status_code = message.SUCCES_DELETED_ITEM.status_code
                deleteSexoJson.message = message.SUCCES_DELETED_ITEM.message
                deleteSexoJson.id = validaId

                return deleteSexoJson
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

const getBuscarSexo = async function (id) {
    let idSexo = id

    let SexoIdJSON = {}

    if (idSexo == '' || idSexo == undefined || isNaN(idSexo)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosSexo = await sexosDAO.selectByIdSexos(idSexo)

        if (dadosSexo) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosSexo.length > 0) {
                SexoIdJSON.Sexo = dadosSexo
                SexoIdJSON.status_code = 200

                return SexoIdJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }

}

const getSexoPeloNome = async function (nome) {
    let nomeSexo = nome

    let SexoIdJSON = {}

    if (nomeSexo == '' || nomeSexo == undefined) {
        return message.ERROR_INVALID_NAME_ENTER
        
    } else {

        let dadosSexo = await sexosDAO.selectByNameSexos(nomeSexo)

        if (dadosSexo) {
            if (dadosSexo.length > 0) {
                SexoIdJSON.Sexo = dadosSexo
                SexoIdJSON.status_code = 200
                
                return SexoIdJSON
            } else {
                return message.ERROR_INVALID_NAME_ENTER
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }
}

module.exports = {
    getListarSexos,
    setInserirNovoSexo,
    setAtualizarSexos,
    setExcluirSexo,
    getBuscarSexo,
    getSexoPeloNome
}