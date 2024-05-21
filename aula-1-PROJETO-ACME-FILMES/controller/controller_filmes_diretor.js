/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para os FilmeDiretor.
 * Data: 30/01/2024
 * Autor: Luiz Henrique Vidal
 * Versão: 1.0 
 ********************************************************/


const filmeDiretorDAO = require('../model/DAO/filmes_diretor.js')

const controller_genero = require('../controller/controller_generos.js')
const controller_filme = require('../controller/controller_filme.js')


//Import do Arquivo de Configuração do Projeto
const message = require('../modulo/config.js')


//Função para inserir um novo FilmeDiretor
const setInserirNovoFilmeDiretor = async function (dadosFilmeDiretor, content) {

    try {

        if (String(content).toLowerCase() === 'application/json') {

            let novoFilmeDiretorJson = {}
            let statusvalidate = false
            if (
                dadosFilmeDiretor.id_diretor == '' ||
                dadosFilmeDiretor.id_diretor == undefined ||
                dadosFilmeDiretor.id_diretor == null ||
                dadosFilmeDiretor.id_filme == '' ||
                dadosFilmeDiretor.id_filme == undefined ||
                dadosFilmeDiretor.id_filme == null
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                statusvalidate = true // validação para liberar a inserção dos dados no DAO
            }

            if (statusvalidate) {
                let id_diretor = dadosFilmeDiretor.id_diretor
                let id_filme = dadosFilmeDiretor.id_filme

                let infoGenero = await controller_genero.getBuscarGenero(id_diretor)
                let infoFilme = await controller_filme.getBuscarFilmes(id_filme)

                if (infoFilme && infoGenero) {
                    let jsonDadosFilmeDiretor = {}

                    jsonDadosFilmeDiretor.id_diretor = id_diretor
                    jsonDadosFilmeDiretor.id_filme = id_filme

                    let novoFilmeDiretor = await filmeDiretorDAO.insertFilmesDiretor(jsonDadosFilmeDiretor)
                    let idNovoFilmeDiretor = await filmeDiretorDAO.selectLastidDiretorFilmes()

                    if (novoFilmeDiretor) {

                        novoFilmeDiretorJson.status = message.SUCCES_CREATED_ITEM.status
                        novoFilmeDiretorJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                        novoFilmeDiretorJson.message = message.SUCCES_CREATED_ITEM.message
                        novoFilmeDiretorJson.id = idNovoFilmeDiretor[0].id
                        novoFilmeDiretorJson.filmeDiretor = jsonDadosFilmeDiretor

                        return novoFilmeDiretorJson
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

//Função para atualizar um FilmeDiretor existente
const setAtualizarNovoFilmeDiretor = async function (id, dadosFilmeDiretorNacionalidadeUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {

        let updateFilmeDiretorJson = {}
        let dadosFilmeDiretorUpdate = {}

        try {
            const validaId = await getBuscarFilmeDiretor(id)

            if (validaId) {
                let id_diretor = dadosFilmeDiretorNacionalidadeUpdate.id_diretor
                let id_filme = dadosFilmeDiretorNacionalidadeUpdate.id_filme

                if (
                    id_diretor != '' &&
                    id_diretor != undefined &&
                    id_diretor != null &&
                    id_diretor.length < 200
                ) {
                    dadosFilmeDiretorUpdate.id_diretor = id_diretor
                } else if (
                    id_diretor == '' &&
                    id_diretor == undefined &&
                    id_diretor == null
                ) { }

                if (
                    id_filme != '' &&
                    id_filme != undefined &&
                    id_filme != null &&
                    id_filme.length < 300
                ) {
                    dadosFilmeDiretorUpdate.id_filme = id_filme
                } else if (
                    id_filme == '' &&
                    id_filme == undefined &&
                    id_filme == null
                ) { }

                const FilmeDiretorAtualizado = await filmeDiretorDAO.updateFilmesDiretor(id, dadosFilmeDiretorUpdate)

                if (FilmeDiretorAtualizado) {

                    updateFilmeDiretorJson.status = message.SUCCES_UPDATED_ITEM.status
                    updateFilmeDiretorJson.status_code = message.SUCCES_UPDATED_ITEM.status_code
                    updateFilmeDiretorJson.message = message.SUCCES_UPDATED_ITEM.message
                    updateFilmeDiretorJson.filmeDiretor = dadosFilmeDiretorUpdate

                    return updateFilmeDiretorJson
                } else {
                    console.log(dadosFilmeDiretorUpdate, FilmeDiretorAtualizado)
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

//Função para excluir um FilmeDiretor existente
const setExcluirFilmeDiretor = async function (id) {
    let deleteFilmeDiretorJson = {}

    try {
        const validaId = await getBuscarFilmeDiretor(id)

        if (validaId) {

            const apagarFilmeDiretor = await filmeDiretorDAO.deleteFilmesDiretor(id)

            if (apagarFilmeDiretor) {
                deleteFilmeDiretorJson.status = message.SUCCES_DELETED_ITEM.status
                deleteFilmeDiretorJson.status_code = message.SUCCES_DELETED_ITEM.status_code
                deleteFilmeDiretorJson.message = message.SUCCES_DELETED_ITEM.message
                deleteFilmeDiretorJson.id = validaId

                return deleteFilmeDiretorJson
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

const setExcluirFilmeDiretorByIdDiretor = async function (id) {
    let deleteFilmeDiretorJson = {}

    try {
        const validaId = await getBuscarFilmeDiretor(id)

        if (validaId) {

            const apagarFilmeDiretor = await filmeDiretorDAO.deleteFilmesDiretorByIdDiretor(id)

            if (apagarFilmeDiretor) {
                deleteFilmeDiretorJson.status = message.SUCCES_DELETED_ITEM.status
                deleteFilmeDiretorJson.status_code = message.SUCCES_DELETED_ITEM.status_code
                deleteFilmeDiretorJson.message = message.SUCCES_DELETED_ITEM.message
                deleteFilmeDiretorJson.id = validaId

                return deleteFilmeDiretorJson
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

const setExcluirFilmeDiretorByIdFilme = async function (id) {
    let deleteFilmeDiretorJson = {}

    try {
        const validaId = await getBuscarFilmeDiretor(id)

        if (validaId) {

            const apagarFilmeDiretor = await filmeDiretorDAO.deleteFilmesDiretorByIdFilme(id)

            if (apagarFilmeDiretor) {
                deleteFilmeDiretorJson.status = message.SUCCES_DELETED_ITEM.status
                deleteFilmeDiretorJson.status_code = message.SUCCES_DELETED_ITEM.status_code
                deleteFilmeDiretorJson.message = message.SUCCES_DELETED_ITEM.message
                deleteFilmeDiretorJson.id = validaId

                return deleteFilmeDiretorJson
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

//Função para retornar todos os FilmeDiretor do banco de dados
const getListarFilmeDiretor = async function () {

    let FilmeDiretorJSON = {}

    //Chama a função do DAO para retornar os dados do BD
    let dadosFilmeDiretor = await filmeDiretorDAO.selectAllFilmesDiretores()

    //Validação para criar o JSON dos dados
    if (dadosFilmeDiretor) {
        if (dadosFilmeDiretor.length > 0) {

            //Cria o JSON de retorno dos dados
            FilmeDiretorJSON.info = dadosFilmeDiretor
            FilmeDiretorJSON.quantidade = dadosFilmeDiretor.length
            FilmeDiretorJSON.status_code = 200

            return FilmeDiretorJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.INTERNAL_SERVER_ERROR_DB
    }
}

//Função para retornar o filtro de um FilmeDiretor pelo id
const getBuscarFilmeDiretor = async function (id) {

    let idFilmeDiretor = id

    let idFilmeDiretorJson = {}

    if (idFilmeDiretor == '' || idFilmeDiretor == undefined || isNaN(idFilmeDiretor)) {
        return message.ERROR_INVALID_ID
    } else {

        //Encaminha o ID do FilmeDiretor para o DAO para o retorno do banco de dados 
        let dadosFilmeDiretor = await filmeDiretorDAO.selectByidDiretorFilmes(idFilmeDiretor)

        if (dadosFilmeDiretor) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosFilmeDiretor.length > 0) {
                idFilmeDiretorJson.filmeDiretor = dadosFilmeDiretor
                idFilmeDiretorJson.status_code = 200

                return idFilmeDiretorJson
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }
}

const getBuscarFilmeDiretorPeloId_diretor = async function (id_diretor) {
    let id_diretorFilmeDiretor = id_diretor

    let id_diretorFilmeDiretorJson = {}

    if (id_diretorFilmeDiretor == '' || id_diretorFilmeDiretor == undefined) {
        return message.ERROR_INVALID_NAME_ENTER
    } else {

        //Encaminha o ID do FilmeDiretor para o DAO para o retorno do banco de dados 
        let dadosFilmeDiretor = await filmeDiretorDAO.selectFilmesDiretoresByidDiretor(id_diretorFilmeDiretor)

        if (dadosFilmeDiretor) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosFilmeDiretor.length > 0) {
                id_diretorFilmeDiretorJson.filmeDiretor = dadosFilmeDiretor
                id_diretorFilmeDiretorJson.status_code = 200

                return id_diretorFilmeDiretorJson
            } else {
                return message.ERROR_INVALID_NAME_ENTER
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }
}

const getBuscarFilmeDiretorPeloId_filme = async function (id_filme) {
    let id_filmeFilmeDiretor = id_filme

    let id_filmeFilmeDiretorJson = {}

    if (id_filmeFilmeDiretor == '' || id_filmeFilmeDiretor == undefined) {
        return message.ERROR_INVALID_ID
    } else {

        //Encaminha o ID do FilmeDiretor para o DAO para o retorno do banco de dados 
        let dadosFilmeDiretor = await filmeDiretorDAO.selectFilmesDiretoresByIdFilme(id_filmeFilmeDiretor)

        if (dadosFilmeDiretor) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosFilmeDiretor.length > 0) {
                id_filmeFilmeDiretorJson.filmeDiretor = dadosFilmeDiretor
                id_filmeFilmeDiretorJson.status_code = 200

                return id_filmeFilmeDiretorJson
            } else {
                return message.ERROR_INVALID_NAME_ENTER
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }
}

const getBuscarFilmeDiretorPeloId_diretorId_filme = async function (id_diretor, id_filme) {
    let id_diretorFilmeDiretor = id_diretor
    let id_filmeFilmeDiretor = id_filme

    let id_diretorFilmeDiretorJson = {}

    if (id_diretorFilmeDiretor == '' || id_diretorFilmeDiretor == undefined||
        id_filmeFilmeDiretor   == '' || id_filmeFilmeDiretor   == undefined) {
        return message.ERROR_INVALID_ID
    } else {

        //Encaminha o ID do FilmeDiretor para o DAO para o retorno do banco de dados 
        let dadosFilmeDiretor = await filmeDiretorDAO.selectFilmesDiretorByIdDiretorByIdFilme(id_diretorFilmeDiretor, id_filmeFilmeDiretor)

        if (dadosFilmeDiretor) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosFilmeDiretor.length > 0) {
                id_diretorFilmeDiretorJson.filmeDiretor = dadosFilmeDiretor
                id_diretorFilmeDiretorJson.status_code = 200

                return id_diretorFilmeDiretorJson
            } else {
                return message.ERROR_INVALID_NAME_ENTER
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }
}

module.exports = {
    setInserirNovoFilmeDiretor,
    setAtualizarNovoFilmeDiretor,
    setExcluirFilmeDiretor,
    setExcluirFilmeDiretorByIdDiretor,
    setExcluirFilmeDiretorByIdFilme,
    getListarFilmeDiretor,
    getBuscarFilmeDiretor,
    getBuscarFilmeDiretorPeloId_diretor,
    getBuscarFilmeDiretorPeloId_filme,
    getBuscarFilmeDiretorPeloId_diretorId_filme
}