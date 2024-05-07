/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para os Ator.
 * Data: 30/01/2024
 * Autor: Luiz Henrique Vidal
 * Versão: 1.0 
 ********************************************************/


const atoresDAO = require('../model/DAO/atores.js')
const nacionalidadesAtorDAO = require('../model/DAO/nacionalidade_ator.js')

//Import do Arquivo de Configuração do Projeto
const message = require('../modulo/config.js')


//Função para inserir um novo Ator
const setInserirNovoAtor = async function (dadosAtor, content) {

    try {

        if (String(content).toLowerCase() === 'application/json') {

            let novoAtorJson = {}
            let statusvalidate = false
            if (
                dadosAtor.nome                 == ''|| dadosAtor.nome               == undefined|| dadosAtor.nome        == null|| dadosAtor.nome.length         > 200  ||
                dadosAtor.foto_ator            == ''|| dadosAtor.foto_ator          == undefined|| dadosAtor.foto_ator   == null|| dadosAtor.foto_ator.length    > 300  ||
                dadosAtor.dt_nasc              == ''|| dadosAtor.dt_nasc            == undefined|| dadosAtor.dt_nasc     == null|| dadosAtor.dt_nasc.length      != 10  ||
                dadosAtor.sobre                == ''|| dadosAtor.sobre              == undefined|| dadosAtor.sobre       == null|| dadosAtor.sobre.length        > 65000|| 
                dadosAtor.id_sexo              == ''|| dadosAtor.id_sexo            == undefined|| dadosAtor.id_sexo     == null||
                dadosAtor.nome                 == ''|| dadosAtor.nome               == undefined|| dadosAtor.nome        == null|| dadosAtor.nome.length         > 200  ||
                dadosAtor.nome                 == ''|| dadosAtor.nome               == undefined|| dadosAtor.nome        == null|| dadosAtor.nome.length         > 200
                ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                if (
                    dadosAtor.dt_falec != '' &&
                    dadosAtor.dt_falec != null &&
                    dadosAtor.dt_falec != undefined
                ) {
                    if (dadosAtor.dt_falec.length != 10) {
                        return message.ERROR_REQUIRED_FIELDS
                    } else {
                        statusvalidate = true // validação para liberar a inserção dos dados no DAO
                    }
                } else {
                    statusvalidate = true // validação para liberar a inserção dos dados no DAO
                }
            }
            if (statusvalidate) {
                let novoAtor = await atoresDAO.insertAtor(dadosAtor)

                if (novoAtor) {

                    let idNovoAtor = await atoresDAO.selectLastIdAtores()

                    novoAtorJson.status = message.SUCCES_CREATED_ITEM.status
                    novoAtorJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                    novoAtorJson.message = message.SUCCES_CREATED_ITEM.message
                    novoAtorJson.id = idNovoAtor
                    novoAtorJson.ator = dadosAtor

                    return novoAtorJson
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

//Função para atualizar um Ator existente
const setAtualizarNovoAtor = async function (id, dadosAtorNacionalidadeUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {
        
        let updateAtorJson = {}
        let dadosAtorUpdate = {}
        let dadosNacionalidadeUpdate = {}

        dadosAtorNacionalidadeUpdate.nome = dadosAtorNacionalidadeUpdate.nome


        try {
            const validaId = await getBuscarAtores(id)

            if (validaId) {

                const atorAtualizado = await atoresDAO.updateAtor(id, dadosAtorUpdate)
                const nacionalidadeAtorAtualizado = await nacionalidadesAtorDAO.updateNacionalidadesAtor(dadosNacionalidadeUpdate)
                
                if (atorAtualizado) {
                    updateAtorJson.id = validaId
                    updateAtorJson.status = message.SUCCES_UPDATED_ITEM.status
                    updateAtorJson.status_code = message.SUCCES_UPDATED_ITEM.status_code
                    updateAtorJson.message = message.SUCCES_UPDATED_ITEM.message
                    updateAtorJson.ator = atorAtualizado

                    return updateAtorJson
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

//Função para excluir um Ator existente
const setExcluirAtor = async function (id) {
    let deleteAtorJson ={}
    
    try {
        const validaId = await getBuscarAtores(id)
        
        if (validaId) {
            const apagarAtor = await atoresDAO.deleteAtor(id)
            const apagarNacionalidadeAtor = await nacionalidadesAtorDAO.deleteNacionalidadesAtor(id)
            
            if (apagarAtor && apagarNacionalidadeAtor) {
                deleteAtorJson.status = message.SUCCES_DELETED_ITEM.status
                deleteAtorJson.status_code = message.SUCCES_DELETED_ITEM.status_code
                deleteAtorJson.message = message.SUCCES_DELETED_ITEM.message
                deleteAtorJson.id = validaId

                return deleteAtorJson
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

//Função para retornar todos os Atores do banco de dados
const getListarAtores = async function () {

    //Criar o objeto JSON
    let atoresNacionalidadesJSON = {}
    let atoresNacionalidadesARRAY = []
    let atoresJSON = {}
    let atoresARRAY = []
    let nacionalidadesJSON = {}
    let nacionalidadesArray = []


    //Chama a função do DAO para retornar os dados do BD
    let dadosAtores = await atoresDAO.selectAllAtores()
    let dadosNacionalidadeAtor = await nacionalidadesAtorDAO.selectAllNacionalidadesAtor()

    atoresARRAY.push(dadosAtores)

    nacionalidadesArray.push(dadosNacionalidadeAtor)

    atoresJSON.atores = atoresARRAY
    atoresJSON.nacionalidades = nacionalidadesArray

    atoresNacionalidadesARRAY.push(atoresJSON)

    //Validação para criar o JSON dos dados
    if (dadosAtores && dadosNacionalidadeAtor) {
        if (dadosAtores.length > 0) {

            //Cria o JSON de retorno dos dados
            atoresNacionalidadesJSON.info = atoresNacionalidadesARRAY
            atoresNacionalidadesJSON.quantidade = dadosAtores.length
            atoresNacionalidadesJSON.status_code = 200

            return atoresNacionalidadesJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.INTERNAL_SERVER_ERROR_DB
    }
}

const getListarFotosAtores = async function () {

    //Criar o objeto JSON
    let fotoAtoresJSON = {}

    //Chama a função do DAO para retornar os dados do BD
    let dadosFotoAtores = await atoresDAO.selectAllPhotoAtores()

    //Validação para criar o JSON dos dados
    if (dadosFotoAtores) {
        if (dadosFotoAtores.length > 0) {

            //Cria o JSON de retorno dos dados
            fotoAtoresJSON.atores = dadosFotoAtores
            fotoAtoresJSON.quantidade = dadosFotoAtores.length
            fotoAtoresJSON.status_code = 200

            return fotoAtoresJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.INTERNAL_SERVER_ERROR_DB
    }
}


//Função para retornar o filtro de um Ator pelo id
const getBuscarAtores = async function (id) {

    let idAtor = id

    let atorIdJson = {}

    if (idAtor ==  '' || idAtor ==  undefined || isNaN(idAtor)) {
        return message.ERROR_INVALID_ID
    } else {

        //Encaminha o ID do Ator para o DAO para o retorno do banco de dados 
        let dadosAtor = await atoresDAO.selectByIdAtores(idAtor)

        if (dadosAtor) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosAtor.length > 0) {
                atorIdJson.ator = dadosAtor
                atorIdJson.status_code = 200

                return atorIdJson
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }
}

const getBuscarAtoresPeloNome = async function (nome) {
    let nomeAtor = nome

    let atorNomeJson = {}

    if (nomeAtor ==  '' || nomeAtor ==  undefined) {
        return message.ERROR_INVALID_NAME_ENTER
    } else {

        //Encaminha o ID do Ator para o DAO para o retorno do banco de dados 
        let dadosAtor = await atoresDAO.selectByNameAtores(nomeAtor)

        if (dadosAtor) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosAtor.length > 0) {
                atorNomeJson.Ator = dadosAtor
                atorNomeJson.status_code = 200

                return atorNomeJson
            } else {
                return message.ERROR_INVALID_NAME_ENTER
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }
}

module.exports = {
    setInserirNovoAtor,
    setAtualizarNovoAtor,
    setExcluirAtor,
    getListarAtores,
    getBuscarAtores,
    getBuscarAtoresPeloNome,
    getListarFotosAtores
}