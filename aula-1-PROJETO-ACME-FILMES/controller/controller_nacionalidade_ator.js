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

const setInserirNovoNacionalidadeAtor = async function (dadosNacionalidadeAtor, content) {

    try {

        if (String(content).toLowerCase() === 'application/json') {

            let novoNacionalidadeAtorJson = {}
            let statusvalidate = false
            if (
                dadosNacionalidadeAtor.nome == '' || dadosNacionalidadeAtor.nome == undefined || dadosNacionalidadeAtor.nome == null || dadosNacionalidadeAtor.nome.length > 80 ||
                dadosNacionalidadeAtor.sinopse == '' || dadosNacionalidadeAtor.sinopse == undefined || dadosNacionalidadeAtor.sinopse == null || dadosNacionalidadeAtor.sinopse.length > 65000 ||
                dadosNacionalidadeAtor.duracao == '' || dadosNacionalidadeAtor.duracao == undefined || dadosNacionalidadeAtor.duracao == null || dadosNacionalidadeAtor.duracao.length > 8 ||
                dadosNacionalidadeAtor.data_lancamento == '' || dadosNacionalidadeAtor.data_lancamento == undefined || dadosNacionalidadeAtor.data_lancamento == null || dadosNacionalidadeAtor.data_lancamento.length != 10 ||
                dadosNacionalidadeAtor.foto_capa == '' || dadosNacionalidadeAtor.foto_capa == undefined || dadosNacionalidadeAtor.foto_capa == null || dadosNacionalidadeAtor.foto_capa.length > 200 ||
                dadosNacionalidadeAtor.valor_unitario.length > 8 || isNaN(dadosNacionalidadeAtor.valor_unitario) || dadosNacionalidadeAtor.id_classificacao == '' || dadosNacionalidadeAtor.id_classificacao == undefined ||
                dadosNacionalidadeAtor.id_classificacao == null || dadosNacionalidadeAtor.id_classificacao.length > 6
                ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                if (
                    dadosNacionalidadeAtor.data_relancamento != '' &&
                    dadosNacionalidadeAtor.data_relancamento != null &&
                    dadosNacionalidadeAtor.data_relancamento != undefined
                ) {
                    if (dadosNacionalidadeAtor.data_relancamento.length != 10) {
                        return message.ERROR_REQUIRED_FIELDS
                    } else {
                        statusvalidate = true // validação para liberar a inserção dos dados no DAO
                    }
                } else {
                    statusvalidate = true // validação para liberar a inserção dos dados no DAO
                }
            }
            if (statusvalidate) {
                let novoNacionalidadeAtor = await nacionalidadesAtorDAO.insertNacionalidadeAtor(dadosNacionalidadeAtor)

                if (novoNacionalidadeAtor) {

                    let idNovoNacionalidadeAtor = await nacionalidadesAtorDAO.selectLastIdNacionalidadesAtor()

                    novoNacionalidadeAtorJson.status = message.SUCCES_CREATED_ITEM.status
                    novoNacionalidadeAtorJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                    novoNacionalidadeAtorJson.message = message.SUCCES_CREATED_ITEM.message
                    novoNacionalidadeAtorJson.id = idNovoNacionalidadeAtor
                    novoNacionalidadeAtorJson.NacionalidadeAtor = dadosNacionalidadeAtor

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
            const validaId = await getBuscarNacionalidadesAtor(id)
            
            if (validaId) {
                const NacionalidadeAtorAtualizado = await nacionalidadesAtorDAO.updateNacionalidadeAtor(id, dadosNacionalidadeAtorUpdate)
                
                if (NacionalidadeAtorAtualizado) {
                    updateNacionalidadeAtorJson.id = validaId
                    updateNacionalidadeAtorJson.status = message.SUCCES_UPDATED_ITEM.status
                    updateNacionalidadeAtorJson.status_code = message.SUCCES_UPDATED_ITEM.status_code
                    updateNacionalidadeAtorJson.message = message.SUCCES_UPDATED_ITEM.message
                    updateNacionalidadeAtorJson.NacionalidadeAtor = NacionalidadeAtorAtualizado

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
    let deleteNacionalidadeAtorJson ={}
    
    try {
        const validaId = await nacionalidadesAtorDAO.getBuscarNacionalidadesAtor(id)
        
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

module.exports = {
    getListarNacionalidadesAtor,
    setAtualizarNovoNacionalidadeAtor,
    setExcluirNacionalidadeAtor,
    setInserirNovoNacionalidadeAtor
}