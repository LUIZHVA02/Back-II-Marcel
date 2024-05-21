/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para os GeneroFilme.
 * Data: 30/01/2024
 * Autor: Luiz Henrique Vidal
 * Versão: 1.0 
 ********************************************************/


const generoFilmeDAO = require('../model/DAO/generos_filme.js')

const controller_genero = require('../controller/controller_generos.js')
const controller_filme = require('../controller/controller_filme.js')


//Import do Arquivo de Configuração do Projeto
const message = require('../modulo/config.js')


//Função para inserir um novo GeneroFilme
const setInserirNovoGeneroFilme = async function (dadosGeneroFilme, content) {

    try {

        if (String(content).toLowerCase() === 'application/json') {

            let novoGeneroFilmeJson = {}
            let statusvalidate = false
            if (
                dadosGeneroFilme.id_genero == '' ||
                dadosGeneroFilme.id_genero == undefined ||
                dadosGeneroFilme.id_genero == null ||
                dadosGeneroFilme.id_filme == '' ||
                dadosGeneroFilme.id_filme == undefined ||
                dadosGeneroFilme.id_filme == null
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                statusvalidate = true // validação para liberar a inserção dos dados no DAO
            }

            if (statusvalidate) {
                let id_genero = dadosGeneroFilme.id_genero
                let id_filme = dadosGeneroFilme.id_filme

                let infoGenero = await controller_genero.getBuscarGenero(id_genero)
                let infoFilme = await controller_filme.getBuscarFilmes(id_filme)

                if (infoFilme && infoGenero) {
                    let jsonDadosGeneroFilme = {}

                    jsonDadosGeneroFilme.id_genero = id_genero
                    jsonDadosGeneroFilme.id_filme = id_filme

                    let novoGeneroFilme = await generoFilmeDAO.insertGeneroFilme(jsonDadosGeneroFilme)
                    let idNovoGeneroFilme = await generoFilmeDAO.selectLastIdGeneroFilmes()

                    if (novoGeneroFilme) {

                        novoGeneroFilmeJson.status = message.SUCCES_CREATED_ITEM.status
                        novoGeneroFilmeJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                        novoGeneroFilmeJson.message = message.SUCCES_CREATED_ITEM.message
                        novoGeneroFilmeJson.id = idNovoGeneroFilme[0].id
                        novoGeneroFilmeJson.GeneroFilme = jsonDadosGeneroFilme

                        return novoGeneroFilmeJson
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

//Função para atualizar um GeneroFilme existente
const setAtualizarNovoGeneroFilme = async function (id, dadosGeneroFilmeNacionalidadeUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {

        let updateGeneroFilmeJson = {}
        let dadosGeneroFilmeUpdate = {}

        try {
            const validaId = await getBuscarGeneroFilme(id)

            if (validaId) {
                let id_genero = dadosGeneroFilmeNacionalidadeUpdate.id_genero
                let id_filme = dadosGeneroFilmeNacionalidadeUpdate.id_filme

                if (
                    id_genero != '' &&
                    id_genero != undefined &&
                    id_genero != null &&
                    id_genero.length < 200
                ) {
                    dadosGeneroFilmeUpdate.id_genero = id_genero
                } else if (
                    id_genero == '' &&
                    id_genero == undefined &&
                    id_genero == null
                ) { }

                if (
                    id_filme != '' &&
                    id_filme != undefined &&
                    id_filme != null &&
                    id_filme.length < 300
                ) {
                    dadosGeneroFilmeUpdate.id_filme = id_filme
                } else if (
                    id_filme == '' &&
                    id_filme == undefined &&
                    id_filme == null
                ) { }

                const generoFilmeAtualizado = await generoFilmeDAO.updateGeneroFilme(id, dadosGeneroFilmeUpdate)

                if (generoFilmeAtualizado) {

                    updateGeneroFilmeJson.status = message.SUCCES_UPDATED_ITEM.status
                    updateGeneroFilmeJson.status_code = message.SUCCES_UPDATED_ITEM.status_code
                    updateGeneroFilmeJson.message = message.SUCCES_UPDATED_ITEM.message
                    updateGeneroFilmeJson.GeneroFilme = dadosGeneroFilmeUpdate

                    return updateGeneroFilmeJson
                } else {
                    console.log(dadosGeneroFilmeUpdate, generoFilmeAtualizado)
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

//Função para excluir um GeneroFilme existente
const setExcluirGeneroFilme = async function (id) {
    let deleteGeneroFilmeJson = {}

    try {
        const validaId = await getBuscarGeneroFilme(id)

        if (validaId) {

            const apagarGeneroFilme = await generoFilmeDAO.deleteGeneroFilme(id)

            if (apagarGeneroFilme) {
                deleteGeneroFilmeJson.status = message.SUCCES_DELETED_ITEM.status
                deleteGeneroFilmeJson.status_code = message.SUCCES_DELETED_ITEM.status_code
                deleteGeneroFilmeJson.message = message.SUCCES_DELETED_ITEM.message
                deleteGeneroFilmeJson.id = validaId

                return deleteGeneroFilmeJson
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

const setExcluirGeneroFilmeByIdFilme = async function (id) {
    let deleteGeneroFilmeJson = {}

    try {
        const validaId = await getBuscarGeneroFilme(id)

        if (validaId) {

            const apagarGeneroFilme = await generoFilmeDAO.deleteGeneroFilmeByIdFilme(id)

            if (apagarGeneroFilme) {
                deleteGeneroFilmeJson.status = message.SUCCES_DELETED_ITEM.status
                deleteGeneroFilmeJson.status_code = message.SUCCES_DELETED_ITEM.status_code
                deleteGeneroFilmeJson.message = message.SUCCES_DELETED_ITEM.message
                deleteGeneroFilmeJson.id = validaId

                return deleteGeneroFilmeJson
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

const setExcluirGeneroFilmeByIdGenero = async function (id) {
    let deleteGeneroFilmeJson = {}

    try {
        const validaId = await getBuscarGeneroFilme(id)

        if (validaId) {

            const apagarGeneroFilme = await generoFilmeDAO.deleteGeneroFilmeByIdGenero(id)

            if (apagarGeneroFilme) {
                deleteGeneroFilmeJson.status = message.SUCCES_DELETED_ITEM.status
                deleteGeneroFilmeJson.status_code = message.SUCCES_DELETED_ITEM.status_code
                deleteGeneroFilmeJson.message = message.SUCCES_DELETED_ITEM.message
                deleteGeneroFilmeJson.id = validaId

                return deleteGeneroFilmeJson
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

//Função para retornar todos os GeneroFilme do banco de dados
const getListarGeneroFilme = async function () {

    let generoFilmeJSON = {}

    //Chama a função do DAO para retornar os dados do BD
    let dadosGeneroFilme = await generoFilmeDAO.selectAllGeneroFilmes()

    //Validação para criar o JSON dos dados
    if (dadosGeneroFilme) {
        if (dadosGeneroFilme.length > 0) {

            //Cria o JSON de retorno dos dados
            generoFilmeJSON.info = dadosGeneroFilme
            generoFilmeJSON.quantidade = dadosGeneroFilme.length
            generoFilmeJSON.status_code = 200

            return generoFilmeJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.INTERNAL_SERVER_ERROR_DB
    }
}

//Função para retornar o filtro de um GeneroFilme pelo id
const getBuscarGeneroFilme = async function (id) {

    let idGeneroFilme = id

    let idGeneroFilmeJson = {}

    if (idGeneroFilme == '' || idGeneroFilme == undefined || isNaN(idGeneroFilme)) {
        return message.ERROR_INVALID_ID
    } else {

        //Encaminha o ID do GeneroFilme para o DAO para o retorno do banco de dados 
        let dadosGeneroFilme = await generoFilmeDAO.selectByIdGeneroFilmes(idGeneroFilme)

        if (dadosGeneroFilme) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosGeneroFilme.length > 0) {
                idGeneroFilmeJson.GeneroFilme = dadosGeneroFilme
                idGeneroFilmeJson.status_code = 200

                return idGeneroFilmeJson
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }
}

const getBuscarGeneroFilmePeloId_genero = async function (id_genero) {
    let id_generoGeneroFilme = id_genero

    let id_generoGeneroFilmeJson = {}

    if (id_generoGeneroFilme == '' || id_generoGeneroFilme == undefined) {
        return message.ERROR_INVALID_NAME_ENTER
    } else {

        //Encaminha o ID do GeneroFilme para o DAO para o retorno do banco de dados 
        let dadosGeneroFilme = await generoFilmeDAO.selectGeneroFilmesByIdGenero(id_generoGeneroFilme)

        if (dadosGeneroFilme) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosGeneroFilme.length > 0) {
                id_generoGeneroFilmeJson.GeneroFilme = dadosGeneroFilme
                id_generoGeneroFilmeJson.status_code = 200

                return id_generoGeneroFilmeJson
            } else {
                return message.ERROR_INVALID_NAME_ENTER
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }
}

const getBuscarGeneroFilmePeloId_filme = async function (id_genero) {
    let id_filmeGeneroFilme = id_filme

    let id_filmeGeneroFilmeJson = {}

    if (id_filmeGeneroFilme == '' || id_filmeGeneroFilme == undefined) {
        return message.ERROR_INVALID_NAME_ENTER
    } else {

        //Encaminha o ID do GeneroFilme para o DAO para o retorno do banco de dados 
        let dadosGeneroFilme = await generoFilmeDAO.selectGeneroFilmesByIdFilme(id_filmeGeneroFilme)

        if (dadosGeneroFilme) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosGeneroFilme.length > 0) {
                id_filmeGeneroFilmeJson.GeneroFilme = dadosGeneroFilme
                id_filmeGeneroFilmeJson.status_code = 200

                return id_filmeGeneroFilmeJson
            } else {
                return message.ERROR_INVALID_NAME_ENTER
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }
}

const getBuscarGeneroFilmePeloId_generoId_filme = async function (id_genero, id_filme) {
    let id_generoGeneroFilme = id_genero
    let id_filmeGeneroFilme = id_filme

    let id_generoGeneroFilmeJson = {}

    if (id_generoGeneroFilme == '' || id_generoGeneroFilme == undefined) {
        return message.ERROR_INVALID_NAME_ENTER
    } else {

        //Encaminha o ID do GeneroFilme para o DAO para o retorno do banco de dados 
        let dadosGeneroFilme = await generoFilmeDAO.selectGeneroFilmesByIdFilmeByIdGenero(id_generoGeneroFilme, id_filmeGeneroFilme)

        if (dadosGeneroFilme) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosGeneroFilme.length > 0) {
                id_generoGeneroFilmeJson.GeneroFilme = dadosGeneroFilme
                id_generoGeneroFilmeJson.status_code = 200

                return id_generoGeneroFilmeJson
            } else {
                return message.ERROR_INVALID_NAME_ENTER
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }
}

module.exports = {
    setInserirNovoGeneroFilme,
    setAtualizarNovoGeneroFilme,
    setExcluirGeneroFilme,
    setExcluirGeneroFilmeByIdFilme,
    setExcluirGeneroFilmeByIdGenero,
    getListarGeneroFilme,
    getBuscarGeneroFilme,
    getBuscarGeneroFilmePeloId_genero,
    getBuscarGeneroFilmePeloId_filme,
    getBuscarGeneroFilmePeloId_generoId_filme
}