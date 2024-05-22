/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para os filme.
 * Data: 30/01/2024
 * Autor: Luiz Henrique Vidal
 * Versão: 1.0 
 ********************************************************/


const filmesDAO = require('../model/DAO/filmes.js')
const controller_filme_ator = require('../controller/controller_filmes_ator.js')
const controller_filme_diretor = require('../controller/controller_filmes_diretor.js')
const controller_genero_filme = require('../controller/controller_genero_filme.js')

//Import do Arquivo de Configuração do Projeto
const message = require('../modulo/config.js')


//Função para inserir um novo filme
const setInserirNovoFilme = async function (dadosFilme, content) {

    try {

        if (String(content).toLowerCase() === 'application/json') {

            let novoFilmeJson = {}
            let statusvalidate = false
            if (
                dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome == null || dadosFilme.nome.length > 80 ||
                dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse == null || dadosFilme.sinopse.length > 65000 ||
                dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao == null || dadosFilme.duracao.length > 8 ||
                dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10 ||
                dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa == null || dadosFilme.foto_capa.length > 200 ||
                dadosFilme.valor_unitario.length > 8 || isNaN(dadosFilme.valor_unitario) || dadosFilme.id_classificacao == '' || dadosFilme.id_classificacao == undefined ||
                dadosFilme.id_classificacao == null || dadosFilme.id_classificacao.length > 6
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                if (
                    dadosFilme.data_relancamento != '' &&
                    dadosFilme.data_relancamento != null &&
                    dadosFilme.data_relancamento != undefined
                ) {
                    if (dadosFilme.data_relancamento.length != 10) {
                        return message.ERROR_REQUIRED_FIELDS
                    } else {
                        statusvalidate = true // validação para liberar a inserção dos dados no DAO
                    }
                } else {
                    statusvalidate = true // validação para liberar a inserção dos dados no DAO
                }
            }
            if (statusvalidate) {
                let novoFilme = await filmesDAO.insertFilme(dadosFilme)

                if (novoFilme) {

                    let idNovoFilme = await filmesDAO.selectLastIdFilmes()

                    novoFilmeJson.status = message.SUCCES_CREATED_ITEM.status
                    novoFilmeJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                    novoFilmeJson.message = message.SUCCES_CREATED_ITEM.message
                    novoFilmeJson.id = idNovoFilme
                    novoFilmeJson.filme = dadosFilme

                    return novoFilmeJson
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

const setInserirNovoFilmeV3 = async function (dadosFilme, content) {

    try {

        if (String(content).toLowerCase() === 'application/json') {

            let novoFilmeJson = {}
            let statusvalidate = false
            if (
                dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome == null || dadosFilme.nome.length > 80 ||
                dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse == null || dadosFilme.sinopse.length > 65000 ||
                dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao == null || dadosFilme.duracao.length > 8 ||
                dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10 ||
                dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa == null || dadosFilme.foto_capa.length > 200 ||
                dadosFilme.valor_unitario.length > 8 || isNaN(dadosFilme.valor_unitario) || dadosFilme.id_classificacao == '' || dadosFilme.id_classificacao == undefined ||
                dadosFilme.id_classificacao == null || dadosFilme.id_classificacao.length > 6
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                if (
                    dadosFilme.data_relancamento != '' &&
                    dadosFilme.data_relancamento != null &&
                    dadosFilme.data_relancamento != undefined
                ) {
                    if (dadosFilme.data_relancamento.length != 10) {
                        return message.ERROR_REQUIRED_FIELDS
                    } else {
                        statusvalidate = true // validação para liberar a inserção dos dados no DAO
                    }
                } else {
                    statusvalidate = true // validação para liberar a inserção dos dados no DAO
                }
            }
            if (statusvalidate) {
                let novoFilme = await filmesDAO.insertFilme(dadosFilme)

                if (novoFilme) {

                    let idNovoFilme = await filmesDAO.selectLastIdFilmes()

                    novoFilmeJson.status = message.SUCCES_CREATED_ITEM.status
                    novoFilmeJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                    novoFilmeJson.message = message.SUCCES_CREATED_ITEM.message
                    novoFilmeJson.id = idNovoFilme
                    novoFilmeJson.filme = dadosFilme

                    return novoFilmeJson
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

//Função para atualizar um filme existente
const setAtualizarNovoFilme = async function (id, dadosFilmeUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {

        let updateFilmeJson = {}
        try {
            const validaId = await getBuscarFilmes(id)

            if (validaId) {
                const filmeAtualizado = await filmesDAO.updateFilme(id, dadosFilmeUpdate)

                if (filmeAtualizado) {
                    updateFilmeJson.id = validaId
                    updateFilmeJson.status = message.SUCCES_UPDATED_ITEM.status
                    updateFilmeJson.status_code = message.SUCCES_UPDATED_ITEM.status_code
                    updateFilmeJson.message = message.SUCCES_UPDATED_ITEM.message
                    updateFilmeJson.filme = filmeAtualizado

                    return updateFilmeJson
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

const setAtualizarNovoFilmeV3 = async function (id, dadosFilmeUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {

        let updateFilmeJson = {}
        try {
            const validaId = await getBuscarFilmes(id)

            if (validaId) {
                const filmeAtualizado = await filmesDAO.updateFilme(id, dadosFilmeUpdate)

                if (filmeAtualizado) {
                    updateFilmeJson.id = validaId
                    updateFilmeJson.status = message.SUCCES_UPDATED_ITEM.status
                    updateFilmeJson.status_code = message.SUCCES_UPDATED_ITEM.status_code
                    updateFilmeJson.message = message.SUCCES_UPDATED_ITEM.message
                    updateFilmeJson.filme = filmeAtualizado

                    return updateFilmeJson
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

//Função para excluir um filme existente
const setExcluirFilme = async function (id) {
    let deleteFilmeJson = {}

    try {
        const validaId = await getBuscarFilmes(id)

        if (validaId) {

            const apagarFilmeAtor = await controller_filme_ator.setExcluirFilmeAtorByIdFilme(id)
            const apagarFilmeDiretor = await controller_filme_diretor.setExcluirFilmeDiretorByIdFilme(id)
            const apagarGeneroFilme = await controller_genero_filme.setExcluirGeneroFilmeByIdFilme(id)

            if (apagarFilmeAtor && apagarFilmeDiretor && apagarGeneroFilme) {

                const apagarFilme = await filmesDAO.deleteFilme(id)

                if (apagarFilme) {
                    deleteFilmeJson.status = message.SUCCES_DELETED_ITEM.status
                    deleteFilmeJson.status_code = message.SUCCES_DELETED_ITEM.status_code
                    deleteFilmeJson.message = message.SUCCES_DELETED_ITEM.message
                    deleteFilmeJson.id = validaId

                    return deleteFilmeJson
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            } else {
                return message.ERROR_INTERNAL_SERVER
            }

        } else {
            return message.ERROR_NOT_FOUND
        }

    } catch (error) {
        return message.ERROR_UPDATED_ITEM
    }
}

//Função para retornar todos os filmes do banco de dados
const getListarFilmes = async function () {

    //Criar o objeto JSON
    let filmesJSON = {}

    //Chama a função do DAO para retornar os dados do BD
    let dadosFilmes = await filmesDAO.selectAllFilmes()

    //Validação para criar o JSON dos dados
    if (dadosFilmes) {
        if (dadosFilmes.length > 0) {

            //Cria o JSON de retorno dos dados
            filmesJSON.filmes = dadosFilmes
            filmesJSON.quantidade = dadosFilmes.length
            filmesJSON.status_code = 200

            return filmesJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.INTERNAL_SERVER_ERROR_DB
    }
}

const getListarFotosFilmes = async function () {

    //Criar o objeto JSON
    let fotoFilmesJSON = {}

    //Chama a função do DAO para retornar os dados do BD
    let dadosFotoFilmes = await filmesDAO.selectAllPhotoFilmes()

    //Validação para criar o JSON dos dados
    if (dadosFotoFilmes) {
        if (dadosFotoFilmes.length > 0) {

            //Cria o JSON de retorno dos dados
            fotoFilmesJSON.filmes = dadosFotoFilmes
            fotoFilmesJSON.quantidade = dadosFotoFilmes.length
            fotoFilmesJSON.status_code = 200

            return fotoFilmesJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.INTERNAL_SERVER_ERROR_DB
    }
}


//Função para retornar o filtro de um filme pelo id
const getBuscarFilmes = async function (id) {

    let idFilme = id

    let filmeIdJson = {}

    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID
    } else {

        //Encaminha o ID do filme para o DAO para o retorno do banco de dados 
        let dadosFilme = await filmesDAO.selectByIdFilmes(idFilme)

        if (dadosFilme) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosFilme.length > 0) {
                filmeIdJson.filme = dadosFilme
                filmeIdJson.status_code = 200

                return filmeIdJson
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }
}

const getBuscarFilmesPeloNome = async function (nome) {
    let nomeFilme = nome

    let filmeNomeJson = {}

    if (nomeFilme == '' || nomeFilme == undefined) {
        return message.ERROR_INVALID_NAME_ENTER
    } else {

        //Encaminha o ID do filme para o DAO para o retorno do banco de dados 
        let dadosFilme = await filmesDAO.selectByNameFilmes(nomeFilme)

        if (dadosFilme) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosFilme.length > 0) {
                filmeNomeJson.filme = dadosFilme
                filmeNomeJson.status_code = 200

                return filmeNomeJson
            } else {
                return message.ERROR_INVALID_NAME_ENTER
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }
}

module.exports = {
    setInserirNovoFilme,
    setAtualizarNovoFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilmes,
    getBuscarFilmesPeloNome,
    getListarFotosFilmes
}