/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para os FilmeAtor.
 * Data: 30/01/2024
 * Autor: Luiz Henrique Vidal
 * Versão: 1.0 
 ********************************************************/


const filmeAtorDAO = require('../model/DAO/filmes_ator.js')

const controller_genero = require('../controller/controller_generos.js')
const controller_filme = require('../controller/controller_filme.js')


//Import do Arquivo de Configuração do Projeto
const message = require('../modulo/config.js')


//Função para inserir um novo FilmeAtor
const setInserirNovoFilmeAtor = async function (dadosFilmeAtor, content) {

    try {

        if (String(content).toLowerCase() === 'application/json') {

            let novoFilmeAtorJson = {}
            let statusvalidate = false
            if (
                dadosFilmeAtor.id_ator == '' ||
                dadosFilmeAtor.id_ator == undefined ||
                dadosFilmeAtor.id_ator == null ||
                dadosFilmeAtor.id_filme == '' ||
                dadosFilmeAtor.id_filme == undefined ||
                dadosFilmeAtor.id_filme == null
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                statusvalidate = true // validação para liberar a inserção dos dados no DAO
            }

            if (statusvalidate) {
                let id_ator = dadosFilmeAtor.id_ator
                let id_filme = dadosFilmeAtor.id_filme

                let infoGenero = await controller_genero.getBuscarGenero(id_ator)
                let infoFilme = await controller_filme.getBuscarFilmes(id_filme)

                if (infoFilme && infoGenero) {
                    let jsonDadosFilmeAtor = {}

                    jsonDadosFilmeAtor.id_ator = id_ator
                    jsonDadosFilmeAtor.id_filme = id_filme

                    let novoFilmeAtor = await filmeAtorDAO.insertFilmeAtor(jsonDadosFilmeAtor)
                    let idNovoFilmeAtor = await filmeAtorDAO.selectLastidAtorFilme()

                    if (novoFilmeAtor) {

                        novoFilmeAtorJson.status = message.SUCCES_CREATED_ITEM.status
                        novoFilmeAtorJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                        novoFilmeAtorJson.message = message.SUCCES_CREATED_ITEM.message
                        novoFilmeAtorJson.id = idNovoFilmeAtor[0].id
                        novoFilmeAtorJson.filmeAtor = jsonDadosFilmeAtor

                        return novoFilmeAtorJson
                    } else {
                        return message.INTERNAL_SERVER_ERROR_DB
                    }
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_DB
            }

        } else {
            return message.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

//Função para atualizar um FilmeAtor existente
const setAtualizarNovoFilmeAtor = async function (id, dadosFilmeAtorNacionalidadeUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {

        let updateFilmeAtorJson = {}
        let dadosFilmeAtorUpdate = {}

        try {
            const validaId = await getBuscarFilmeAtor(id)

            if (validaId) {
                let id_ator = dadosFilmeAtorNacionalidadeUpdate.id_ator
                let id_filme = dadosFilmeAtorNacionalidadeUpdate.id_filme

                if (
                    id_ator != '' &&
                    id_ator != undefined &&
                    id_ator != null &&
                    id_ator.length < 200
                ) {
                    dadosFilmeAtorUpdate.id_ator = id_ator
                } else if (
                    id_ator == '' &&
                    id_ator == undefined &&
                    id_ator == null
                ) { }

                if (
                    id_filme != '' &&
                    id_filme != undefined &&
                    id_filme != null &&
                    id_filme.length < 300
                ) {
                    dadosFilmeAtorUpdate.id_filme = id_filme
                } else if (
                    id_filme == '' &&
                    id_filme == undefined &&
                    id_filme == null
                ) { }

                const FilmeAtorAtualizado = await filmeAtorDAO.updateFilmeAtor(id, dadosFilmeAtorUpdate)

                if (FilmeAtorAtualizado) {

                    updateFilmeAtorJson.status = message.SUCCES_UPDATED_ITEM.status
                    updateFilmeAtorJson.status_code = message.SUCCES_UPDATED_ITEM.status_code
                    updateFilmeAtorJson.message = message.SUCCES_UPDATED_ITEM.message
                    updateFilmeAtorJson.filmeAtor = dadosFilmeAtorUpdate

                    return updateFilmeAtorJson
                } else {
                    console.log(dadosFilmeAtorUpdate, FilmeAtorAtualizado)
                    return message.ERROR_INTERNAL_SERVER_DB
                }

            } else {
                return message.ERROR_NOT_FOUND
            }

        } catch (error) {
            console.log(error)
            return message.ERROR_UPDATED_ITEM
        }
    } else {
        return message.ERROR_CONTENT_TYPE
    }
}

//Função para excluir um FilmeAtor existente
const setExcluirFilmeAtor = async function (id) {
    let deleteFilmeAtorJson = {}

    try {
        const validaId = await getBuscarFilmeAtor(id)

        if (validaId) {

            const apagarFilmeAtor = await filmeAtorDAO.deleteFilmesAtor(id)

            if (apagarFilmeAtor) {
                deleteFilmeAtorJson.status = message.SUCCES_DELETED_ITEM.status
                deleteFilmeAtorJson.status_code = message.SUCCES_DELETED_ITEM.status_code
                deleteFilmeAtorJson.message = message.SUCCES_DELETED_ITEM.message
                deleteFilmeAtorJson.id = validaId

                return deleteFilmeAtorJson
            } else {
                return message.ERROR_INTERNAL_SERVER_DB
            }


        } else {
            return message.ERROR_NOT_FOUND
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setExcluirFilmeAtorByIdAtor = async function (id) {
    let deleteFilmeAtorJson = {}

    try {
        const validaId = await getBuscarFilmeAtor(id)

        if (validaId) {

            const apagarFilmeAtor = await filmeAtorDAO.deleteFilmesAtorByIdAtor(id)

            if (apagarFilmeAtor) {
                deleteFilmeAtorJson.status = message.SUCCES_DELETED_ITEM.status
                deleteFilmeAtorJson.status_code = message.SUCCES_DELETED_ITEM.status_code
                deleteFilmeAtorJson.message = message.SUCCES_DELETED_ITEM.message
                deleteFilmeAtorJson.id = validaId

                return deleteFilmeAtorJson
            } else {
                return message.ERROR_INTERNAL_SERVER_DB
            }


        } else {
            return message.ERROR_NOT_FOUND
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setExcluirFilmeAtorByIdFilme = async function (id) {
    let deleteFilmeAtorJson = {}

    try {
        const validaId = await getBuscarFilmeAtor(id)

        if (validaId) {

            const apagarFilmeAtor = await filmeAtorDAO.deleteFilmesAtorByIdFilme(id)

            if (apagarFilmeAtor) {
                deleteFilmeAtorJson.status = message.SUCCES_DELETED_ITEM.status
                deleteFilmeAtorJson.status_code = message.SUCCES_DELETED_ITEM.status_code
                deleteFilmeAtorJson.message = message.SUCCES_DELETED_ITEM.message
                deleteFilmeAtorJson.id = validaId

                return deleteFilmeAtorJson
            } else {
                return message.ERROR_INTERNAL_SERVER_DB
            }


        } else {
            return message.ERROR_NOT_FOUND
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

//Função para retornar todos os FilmeAtor do banco de dados
const getListarFilmeAtor = async function () {

    let FilmeAtorJSON = {}

    //Chama a função do DAO para retornar os dados do BD
    let dadosFilmeAtor = await filmeAtorDAO.selectAllFilmesAtor()

    //Validação para criar o JSON dos dados
    if (dadosFilmeAtor) {
        if (dadosFilmeAtor.length > 0) {

            //Cria o JSON de retorno dos dados
            FilmeAtorJSON.info = dadosFilmeAtor
            FilmeAtorJSON.quantidade = dadosFilmeAtor.length
            FilmeAtorJSON.status_code = 200

            return FilmeAtorJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.INTERNAL_SERVER_ERROR_DB
    }
}

//Função para retornar o filtro de um FilmeAtor pelo id
const getBuscarFilmeAtor = async function (id) {

    let idFilmeAtor = id

    let idFilmeAtorJson = {}

    if (idFilmeAtor == '' || idFilmeAtor == undefined || isNaN(idFilmeAtor)) {
        return message.ERROR_INVALID_ID
    } else {

        //Encaminha o ID do FilmeAtor para o DAO para o retorno do banco de dados 
        let dadosFilmeAtor = await filmeAtorDAO.selectByIdFilmesAtor(idFilmeAtor)

        if (dadosFilmeAtor) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosFilmeAtor.length > 0) {
                idFilmeAtorJson.filmeAtor = dadosFilmeAtor
                idFilmeAtorJson.status_code = 200

                return idFilmeAtorJson
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }
}

const getBuscarFilmeAtorPeloId_ator = async function (id_ator) {
    let id_atorFilmeAtor = id_ator

    let id_atorFilmeAtorJson = {}

    if (id_atorFilmeAtor == '' || id_atorFilmeAtor == undefined) {
        return message.ERROR_INVALID_NAME_ENTER
    } else {

        //Encaminha o ID do FilmeAtor para o DAO para o retorno do banco de dados 
        let dadosFilmeAtor = await filmeAtorDAO.selectFilmesAtorByIdAtor(id_atorFilmeAtor)

        if (dadosFilmeAtor) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosFilmeAtor.length > 0) {
                id_atorFilmeAtorJson.filmeAtor = dadosFilmeAtor
                id_atorFilmeAtorJson.status_code = 200

                return id_atorFilmeAtorJson
            } else {
                return message.ERROR_INVALID_NAME_ENTER
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }
}

const getBuscarFilmeAtorPeloId_filme = async function (id_filme) {
    let id_filmeFilmeAtor = id_filme

    let id_filmeFilmeAtorJson = {}

    if (id_filmeFilmeAtor == '' || id_filmeFilmeAtor == undefined) {
        return message.ERROR_INVALID_ID
    } else {

        //Encaminha o ID do FilmeAtor para o DAO para o retorno do banco de dados 
        let dadosFilmeAtor = await filmeAtorDAO.selectFilmesAtorByIdFilme(id_filmeFilmeAtor)

        if (dadosFilmeAtor) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosFilmeAtor.length > 0) {
                id_filmeFilmeAtorJson.filmeAtor = dadosFilmeAtor
                id_filmeFilmeAtorJson.status_code = 200

                return id_filmeFilmeAtorJson
            } else {
                return message.ERROR_INVALID_NAME_ENTER
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }
}

const getBuscarFilmeAtorPeloId_atorId_filme = async function (id_ator, id_filme) {
    let id_atorFilmeAtor = id_ator
    let id_filmeFilmeAtor = id_filme

    let id_atorFilmeAtorJson = {}

    if (id_atorFilmeAtor == '' || id_atorFilmeAtor == undefined||
        id_filmeFilmeAtor   == '' || id_filmeFilmeAtor   == undefined) {
        return message.ERROR_INVALID_ID
    } else {

        //Encaminha o ID do FilmeAtor para o DAO para o retorno do banco de dados 
        let dadosFilmeAtor = await filmeAtorDAO.selectFilmeAtorByIdAtorByIdFilme(id_atorFilmeAtor, id_filmeFilmeAtor)

        if (dadosFilmeAtor) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosFilmeAtor.length > 0) {
                id_atorFilmeAtorJson.filmeAtor = dadosFilmeAtor
                id_atorFilmeAtorJson.status_code = 200

                return id_atorFilmeAtorJson
            } else {
                return message.ERROR_INVALID_NAME_ENTER
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }
}

module.exports = {
    setInserirNovoFilmeAtor,
    setAtualizarNovoFilmeAtor,
    setExcluirFilmeAtor,
    setExcluirFilmeAtorByIdAtor,
    setExcluirFilmeAtorByIdFilme,
    getListarFilmeAtor,
    getBuscarFilmeAtor,
    getBuscarFilmeAtorPeloId_ator,
    getBuscarFilmeAtorPeloId_filme,
    getBuscarFilmeAtorPeloId_atorId_filme
}