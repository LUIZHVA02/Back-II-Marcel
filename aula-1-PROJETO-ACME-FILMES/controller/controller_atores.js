/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para os Ator.
 * Data: 30/01/2024
 * Autor: Luiz Henrique Vidal
 * Versão: 1.0 
 ********************************************************/


const atoresDAO = require('../model/DAO/atores.js')
const nacionalidadesAtorDAO = require('../model/DAO/nacionalidade_ator.js')
const nacionalidadesDAO = require('../model/DAO/nacionalidades.js')
const sexosDAO = require('../model/DAO/sexos.js')

const controller_nacionalidades_ator = require('./controller_nacionalidade_ator.js')
const controller_nacionalidades = require('./controller_nacionalidades.js')
const controller_sexos = require('./controller_sexos.js')


//Import do Arquivo de Configuração do Projeto
const message = require('../modulo/config.js')


//Função para inserir um novo Ator
const setInserirNovoAtor = async function (dadosAtor, content) {

    try {
        if (String(content).toLowerCase() === 'application/json') {

            let novoAtorJson = {}
            let statusvalidate = false
            if (
                dadosAtor.nome == '' || dadosAtor.nome == undefined || dadosAtor.nome == null || dadosAtor.nome.length > 200 ||
                dadosAtor.foto_ator == '' || dadosAtor.foto_ator == undefined || dadosAtor.foto_ator == null || dadosAtor.foto_ator.length > 300 ||
                dadosAtor.dt_nasc == '' || dadosAtor.dt_nasc == undefined || dadosAtor.dt_nasc == null || dadosAtor.dt_nasc.length != 10 ||
                dadosAtor.sexo == '' || dadosAtor.sexo == undefined || dadosAtor.sexo == null ||
                dadosAtor.nacionalidade == '' || dadosAtor.nacionalidade == undefined || dadosAtor.nacionalidade == null || dadosAtor.nacionalidade.length > 100 ||
                dadosAtor.pais_origem == '' || dadosAtor.pais_origem == undefined || dadosAtor.pais_origem == null || dadosAtor.pais_origem.length > 100
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                if (
                    dadosAtor.dt_falec != '' &&
                    dadosAtor.dt_falec != null &&
                    dadosAtor.dt_falec != undefined ||
                    dadosAtor.sobre != '' &&
                    dadosAtor.sobre != undefined &&
                    dadosAtor.sobre != null

                ) {
                    if (dadosAtor.dt_falec.length != 10 && dadosAtor.sobre.length > 65000) {
                        return message.ERROR_REQUIRED_FIELDS
                    } else {
                        statusvalidate = true // validação para liberar a inserção dos dados no DAO
                    }
                } else {
                    statusvalidate = true // validação para liberar a inserção dos dados no DAO
                }
            }
            if (statusvalidate) {
                let nome = dadosAtor.nome
                let foto_ator = dadosAtor.foto_ator
                let dt_nasc = dadosAtor.dt_nasc
                let dt_falec = dadosAtor.dt_falec
                let sobre = dadosAtor.sobre

                let nacionalidade = {}
                nacionalidade.nacionalidade = dadosAtor.nacionalidade
                nacionalidade.pais_origem = dadosAtor.pais_origem

                let nomeSexo = dadosAtor.sexo
                let infoSexo = await controller_sexos.getSexoPeloNome(nomeSexo)
                let id_sexo = infoSexo.sexo[0].id

                if (id_sexo && dt_falec && sobre) {
                    let jsonDadosAtor = {}

                    jsonDadosAtor.nome = nome
                    jsonDadosAtor.foto_ator = foto_ator
                    jsonDadosAtor.dt_nasc = dt_nasc
                    jsonDadosAtor.dt_falec = dt_falec
                    jsonDadosAtor.sobre = sobre
                    jsonDadosAtor.id_sexo = id_sexo

                    let novoAtor = await atoresDAO.insertAtor(jsonDadosAtor)

                    if (novoAtor) {
                        let idNovoAtor = await atoresDAO.selectLastIdAtores()

                        let infoNacionalidade = await controller_nacionalidades.getNacionalidadePelaNacionalidade(nacionalidade.nacionalidade)
                        let idNacionalidade = infoNacionalidade.nacionalidade[0].id

                        if (idNovoAtor && idNacionalidade) {

                            let dadosAtorNacionalidade = {}
                            dadosAtorNacionalidade.id_ator = idNovoAtor[0].id
                            dadosAtorNacionalidade.id_nacionalidade = idNacionalidade

                            let novaNacionalidadeAtor = await controller_nacionalidades_ator.setInserirNovoNacionalidadeAtor(dadosAtorNacionalidade, content)

                            if (novaNacionalidadeAtor) {

                                novoAtorJson.status = message.SUCCES_CREATED_ITEM.status
                                novoAtorJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                                novoAtorJson.message = message.SUCCES_CREATED_ITEM.message
                                novoAtorJson.id = idNovoAtor[0].id
                                novoAtorJson.ator = jsonDadosAtor
                                novoAtorJson.nacionalidade = nacionalidade

                                return novoAtorJson
                            } else {
                                return message.ERROR_INTERNAL_SERVER_DB
                            }
                        }
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB
                    }
                } else if (id_sexo && dt_falec) {
                    let jsonDadosAtor = {}

                    jsonDadosAtor.nome = nome
                    jsonDadosAtor.foto_ator = foto_ator
                    jsonDadosAtor.dt_nasc = dt_nasc
                    jsonDadosAtor.dt_falec = dt_falec
                    jsonDadosAtor.id_sexo = id_sexo

                    let novoAtor = await atoresDAO.insertAtor(jsonDadosAtor)

                    if (novoAtor) {
                        let idNovoAtor = await atoresDAO.selectLastIdAtores()

                        let infoNacionalidade = await controller_nacionalidades.getNacionalidadePelaNacionalidade(nacionalidade.nacionalidade)
                        let idNacionalidade = infoNacionalidade.nacionalidade[0].id

                        if (idNovoAtor && idNacionalidade) {

                            let dadosAtorNacionalidade = {}
                            dadosAtorNacionalidade.id_ator = idNovoAtor[0].id
                            dadosAtorNacionalidade.id_nacionalidade = idNacionalidade

                            let novaNacionalidadeAtor = await controller_nacionalidades_ator.setInserirNovoNacionalidadeAtor(dadosAtorNacionalidade, content)

                            if (novaNacionalidadeAtor) {

                                novoAtorJson.status = message.SUCCES_CREATED_ITEM.status
                                novoAtorJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                                novoAtorJson.message = message.SUCCES_CREATED_ITEM.message
                                novoAtorJson.id = idNovoAtor[0].id
                                novoAtorJson.ator = jsonDadosAtor
                                novoAtorJson.nacionalidade = nacionalidade

                                return novoAtorJson
                            } else {
                                return message.ERROR_INTERNAL_SERVER_DB
                            }
                        }
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB
                    }
                } else if (id_sexo && sobre) {
                    let jsonDadosAtor = {}

                    jsonDadosAtor.nome = nome
                    jsonDadosAtor.foto_ator = foto_ator
                    jsonDadosAtor.dt_nasc = dt_nasc
                    jsonDadosAtor.sobre = sobre
                    jsonDadosAtor.id_sexo = id_sexo

                    let novoAtor = await atoresDAO.insertAtor(jsonDadosAtor)

                    if (novoAtor) {
                        let idNovoAtor = await atoresDAO.selectLastIdAtores()

                        let infoNacionalidade = await controller_nacionalidades.getNacionalidadePelaNacionalidade(nacionalidade.nacionalidade)
                        let idNacionalidade = infoNacionalidade.nacionalidade[0].id

                        if (idNovoAtor && idNacionalidade) {

                            let dadosAtorNacionalidade = {}
                            dadosAtorNacionalidade.id_ator = idNovoAtor[0].id
                            dadosAtorNacionalidade.id_nacionalidade = idNacionalidade

                            let novaNacionalidadeAtor = await controller_nacionalidades_ator.setInserirNovoNacionalidadeAtor(dadosAtorNacionalidade, content)

                            if (novaNacionalidadeAtor) {

                                novoAtorJson.status = message.SUCCES_CREATED_ITEM.status
                                novoAtorJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                                novoAtorJson.message = message.SUCCES_CREATED_ITEM.message
                                novoAtorJson.id = idNovoAtor[0].id
                                novoAtorJson.ator = jsonDadosAtor
                                novoAtorJson.nacionalidade = nacionalidade

                                return novoAtorJson
                            } else {
                                return message.ERROR_INTERNAL_SERVER_DB
                            }
                        }
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB
                    }
                } else if (id_sexo) {
                    let jsonDadosAtor = {}

                    jsonDadosAtor.nome = nome
                    jsonDadosAtor.foto_ator = foto_ator
                    jsonDadosAtor.dt_nasc = dt_nasc
                    jsonDadosAtor.id_sexo = id_sexo

                    let novoAtor = await atoresDAO.insertAtor(jsonDadosAtor)

                    if (novoAtor) {
                        let idNovoAtor = await atoresDAO.selectLastIdAtores()

                        let infoNacionalidade = await controller_nacionalidades.getNacionalidadePelaNacionalidade(nacionalidade.nacionalidade)
                        let idNacionalidade = infoNacionalidade.nacionalidade[0].id

                        if (idNovoAtor && idNacionalidade) {

                            let dadosAtorNacionalidade = {}
                            dadosAtorNacionalidade.id_ator = idNovoAtor[0].id
                            dadosAtorNacionalidade.id_nacionalidade = idNacionalidade

                            let novaNacionalidadeAtor = await controller_nacionalidades_ator.setInserirNovoNacionalidadeAtor(dadosAtorNacionalidade, content)

                            if (novaNacionalidadeAtor) {

                                novoAtorJson.status = message.SUCCES_CREATED_ITEM.status
                                novoAtorJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                                novoAtorJson.message = message.SUCCES_CREATED_ITEM.message
                                novoAtorJson.id = idNovoAtor[0].id
                                novoAtorJson.ator = jsonDadosAtor
                                novoAtorJson.nacionalidade = nacionalidade

                                return novoAtorJson
                            } else {
                                return message.ERROR_INTERNAL_SERVER_DB
                            }
                        }
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB
                    }
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

//Função para atualizar um Ator existente
const setAtualizarNovoAtor = async function (id, dadosAtorNacionalidadeUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {

        let dadosAtorNacionalidade = {}
        let updateAtorJson = {}
        let dadosAtorUpdate = {}
        let dadosNacionalidadeUpdate = {}

        try {
            const validaId = await getBuscarAtores(id)

            if (validaId) {
                let id_ator = id
                let nome = dadosAtorNacionalidadeUpdate.nome
                let foto_ator = dadosAtorNacionalidadeUpdate.foto_ator
                let dt_nasc = dadosAtorNacionalidadeUpdate.dt_nasc
                let dt_falec = dadosAtorNacionalidadeUpdate.dt_falec
                let sobre = dadosAtorNacionalidadeUpdate.sobre

                let nomeSexo = dadosAtorNacionalidadeUpdate.sexo
                let infoSexo = await controller_sexos.getSexoPeloNome(nomeSexo)
                let id_sexo = infoSexo.sexo[0].id

                let nacionalidade = {}
                nacionalidade.nacionalidade = dadosAtorNacionalidadeUpdate.nacionalidade
                nacionalidade.pais_origem = dadosAtorNacionalidadeUpdate.pais_origem

                
                if (
                    nome != '' &&
                    nome != undefined &&
                    nome != null &&
                    nome.length < 200
                ) {
                    dadosAtorUpdate.nome = nome
                } else if (
                    nome == '' &&
                    nome == undefined &&
                    nome == null
                ){}

                if (
                    foto_ator != '' &&
                    foto_ator != undefined &&
                    foto_ator != null &&
                    foto_ator.length < 300
                ) {
                    dadosAtorUpdate.foto_ator = foto_ator
                } else if (
                    foto_ator == '' &&
                    foto_ator == undefined &&
                    foto_ator == null
                ){}

                if (
                    dt_nasc != '' &&
                    dt_nasc != undefined &&
                    dt_nasc != null &&
                    dt_nasc.length == 10
                ) {
                    dadosAtorUpdate.dt_nasc = dt_nasc
                } else if (
                    dt_nasc == '' &&
                    dt_nasc == undefined &&
                    dt_nasc == null
                ){}

                if (
                    dt_falec != '' &&
                    dt_falec != undefined &&
                    dt_falec != null &&
                    dt_falec.length == 10
                ) {                   
                    dadosAtorUpdate.dt_falec = dt_falec
                } else if (
                    dt_falec == '' &&
                    dt_falec == undefined &&
                    dt_falec == null
                ){}

                if (
                    sobre != '' &&
                    sobre != undefined &&
                    sobre != null &&
                    sobre.length < 65000
                ) {
                    dadosAtorUpdate.sobre = sobre
                } else if (
                    sobre == '' &&
                    sobre == undefined &&
                    sobre == null
                ){}

                if (
                    id_sexo != '' &&
                    id_sexo != undefined &&
                    id_sexo != null
                ) {
                    dadosAtorUpdate.id_sexo = id_sexo
                } else if (
                    id_sexo == '' &&
                    id_sexo == undefined &&
                    id_sexo == null
                ){}

                let infoNacionalidade

                if (
                    nacionalidade.nacionalidade != '' && 
                    nacionalidade.nacionalidade != undefined &&
                    nacionalidade.nacionalidade != null &&
                    nacionalidade.nacionalidade.length < 100
                ) {
                    infoNacionalidade = await controller_nacionalidades.getNacionalidadePelaNacionalidade(nacionalidade.nacionalidade)
                } else if (
                    nacionalidade.pais_origem != '' && 
                    nacionalidade.pais_origem != undefined && 
                    nacionalidade.pais_origem != null &&
                    nacionalidade.pais_origem.length < 100
                ) {
                    infoNacionalidade = await controller_nacionalidades.getNacionalidadePeloPaisOrigem(nacionalidade.pais_origem)
                }

                let idNacionalidade = {}
                idNacionalidade.id_nacionalidade = infoNacionalidade.nacionalidade[0].id

                dadosAtorNacionalidade.id_nacionalidade = validaId.ator[0].id_nacionalidade
                dadosAtorNacionalidade.id_ator = id_ator

                let infoNacionalidadeAtor = {}
                infoNacionalidadeAtor = await controller_nacionalidades_ator.getBuscarNacionalidadeAtorByIdAtorIdNacionalidade(content, dadosAtorNacionalidade)
                
                let idNacionalidadeAtor = infoNacionalidadeAtor.nacionalidadeAtorInfo[0].id


                if (idNacionalidade && idNacionalidadeAtor) {
                    const nacionalidadeAtorAtualizado = await controller_nacionalidades_ator.setAtualizarNovoNacionalidadeAtor(idNacionalidadeAtor, idNacionalidade, content)

                    dadosNacionalidadeUpdate = nacionalidadeAtorAtualizado
                }

                const atorAtualizado = await atoresDAO.updateAtor(id, dadosAtorUpdate)

                if (atorAtualizado) {

                    updateAtorJson.status = message.SUCCES_UPDATED_ITEM.status
                    updateAtorJson.status_code = message.SUCCES_UPDATED_ITEM.status_code
                    updateAtorJson.message = message.SUCCES_UPDATED_ITEM.message
                    updateAtorJson.ator = dadosAtorUpdate
                    updateAtorJson.nacionalidade = dadosNacionalidadeUpdate

                    return updateAtorJson
                } else {
                    console.log(dadosAtorUpdate, atorAtualizado)
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

//Função para excluir um Ator existente
const setExcluirAtor = async function (id) {
    let deleteAtorJson = {}

    try {
        const validaId = await getBuscarAtores(id)

        if (validaId) {
            const apagarNacionalidadeAtor = await controller_nacionalidades_ator.setExcluirNacionalidadeAtorByAtorId(id)

            if (apagarNacionalidadeAtor) {
                const apagarAtor = await atoresDAO.deleteAtor(id)

                if (apagarAtor) {
                    deleteAtorJson.status = message.SUCCES_DELETED_ITEM.status
                    deleteAtorJson.status_code = message.SUCCES_DELETED_ITEM.status_code
                    deleteAtorJson.message = message.SUCCES_DELETED_ITEM.message
                    deleteAtorJson.id = validaId

                    return deleteAtorJson
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }

        } else {
            return message.ERROR_NOT_FOUND
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

//Função para retornar todos os Atores do banco de dados
const getListarAtores = async function () {

    let nacionalidadesAtoresJSON = {}

    //Chama a função do DAO para retornar os dados do BD
    let dadosAtores = await atoresDAO.selectAllAtores()

    //Validação para criar o JSON dos dados
    if (dadosAtores) {
        if (dadosAtores.length > 0) {

            //Cria o JSON de retorno dos dados
            nacionalidadesAtoresJSON.info = dadosAtores
            nacionalidadesAtoresJSON.quantidade = dadosAtores.length
            nacionalidadesAtoresJSON.status_code = 200

            return nacionalidadesAtoresJSON
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

    let idAtorJson = {}

    if (idAtor == '' || idAtor == undefined || isNaN(idAtor)) {
        return message.ERROR_INVALID_ID
    } else {

        //Encaminha o ID do Ator para o DAO para o retorno do banco de dados 
        let dadosAtor = await atoresDAO.selectByIdAtores(idAtor)

        if (dadosAtor) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosAtor.length > 0) {
                idAtorJson.ator = dadosAtor
                idAtorJson.status_code = 200

                return idAtorJson
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

    let nomeAtorJson = {}

    if (nomeAtor == '' || nomeAtor == undefined) {
        return message.ERROR_INVALID_NAME_ENTER
    } else {

        //Encaminha o ID do Ator para o DAO para o retorno do banco de dados 
        let dadosAtor = await atoresDAO.selectByNameAtores(nomeAtor)

        if (dadosAtor) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosAtor.length > 0) {
                nomeAtorJson.Ator = dadosAtor
                nomeAtorJson.status_code = 200

                return nomeAtorJson
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