/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para os Diretor.
 * Data: 30/01/2024
 * Autor: Luiz Henrique Vidal
 * Versão: 1.0 
 ********************************************************/


const diretoresDAO = require('../model/DAO/diretores.js')
const nacionalidadesDiretorDAO = require('../model/DAO/nacionalidade_diretor.js')
const nacionalidadesDAO = require('../model/DAO/nacionalidades.js')
const sexosDAO = require('../model/DAO/sexos.js')

const controller_nacionalidades_diretor = require('./controller_nacionalidade_diretor.js')
const controller_nacionalidades = require('./controller_nacionalidades.js')
const controller_sexos = require('./controller_sexos.js')


//Import do Arquivo de Configuração do Projeto
const message = require('../modulo/config.js')


//Função para inserir um novo Diretor
const setInserirNovoDiretor = async function (dadosDiretor, content) {

    try {

        if (String(content).toLowerCase() === 'application/json') {

            let novoDiretorJson = {}
            let statusvalidate = false
            if (
                dadosDiretor.nome == '' || dadosDiretor.nome == undefined || dadosDiretor.nome == null || dadosDiretor.nome.length > 200 ||
                dadosDiretor.foto_diretor == '' || dadosDiretor.foto_diretor == undefined || dadosDiretor.foto_diretor == null || dadosDiretor.foto_diretor.length > 300 ||
                dadosDiretor.dt_nasc == '' || dadosDiretor.dt_nasc == undefined || dadosDiretor.dt_nasc == null || dadosDiretor.dt_nasc.length != 10 ||
                dadosDiretor.sexo == '' || dadosDiretor.sexo == undefined || dadosDiretor.sexo == null ||
                dadosDiretor.nacionalidade == '' || dadosDiretor.nacionalidade == undefined || dadosDiretor.nacionalidade == null || dadosDiretor.nacionalidade.length > 100 ||
                dadosDiretor.pais_origem == '' || dadosDiretor.pais_origem == undefined || dadosDiretor.pais_origem == null || dadosDiretor.pais_origem.length > 100
            ) {
                console.log(dadosDiretor)
                return message.ERROR_REQUIRED_FIELDS
            } else {
                if (
                    dadosDiretor.dt_falec != '' &&
                    dadosDiretor.dt_falec != null &&
                    dadosDiretor.dt_falec != undefined &&
                    dadosDiretor.sobre != '' &&
                    dadosDiretor.sobre != undefined &&
                    dadosDiretor.sobre != null

                ) {
                    if (dadosDiretor.dt_falec.length != 10 && dadosDiretor.sobre.length > 65000) {
                        return message.ERROR_REQUIRED_FIELDS
                    } else {
                        statusvalidate = true // validação para liberar a inserção dos dados no DAO
                    }
                } else {
                    statusvalidate = true // validação para liberar a inserção dos dados no DAO
                }
            }
            if (statusvalidate) {
                let nome = dadosDiretor.nome
                let foto_diretor = dadosDiretor.foto_diretor
                let dt_nasc = dadosDiretor.dt_nasc
                let dt_falec = dadosDiretor.dt_falec
                let sobre = dadosDiretor.sobre

                let nacionalidade = {}
                nacionalidade.nacionalidade = dadosDiretor.nacionalidade
                nacionalidade.pais_origem = dadosDiretor.pais_origem

                let nomeSexo = dadosDiretor.sexo
                let infoSexo = await controller_sexos.getSexoPeloNome(nomeSexo)
                let id_sexo = infoSexo.sexo[0].id

                if (id_sexo && dt_falec && sobre) {
                    let jsonDadosDiretor = {}

                    jsonDadosDiretor.nome = nome
                    jsonDadosDiretor.foto_diretor = foto_diretor
                    jsonDadosDiretor.dt_nasc = dt_nasc
                    jsonDadosDiretor.dt_falec = dt_falec
                    jsonDadosDiretor.sobre = sobre
                    jsonDadosDiretor.id_sexo = id_sexo

                    let novoDiretor = await diretoresDAO.insertDiretor(jsonDadosDiretor)

                    if (novoDiretor) {
                        let idNovoDiretor = await diretoresDAO.selectLastIdDiretores()

                        let infoNacionalidade = await controller_nacionalidades.getNacionalidadePelaNacionalidade(nacionalidade.nacionalidade)
                        let idNacionalidade = infoNacionalidade.nacionalidade[0].id

                        let dadosDiretorNacionalidade = {}
                        dadosDiretorNacionalidade.id_diretor = idNovoDiretor[0].id
                        dadosDiretorNacionalidade.id_nacionalidade = idNacionalidade

                        let novaNacionalidadeDiretor = await controller_nacionalidades_diretor.setInserirNovoNacionalidadeDiretor(dadosDiretorNacionalidade, content)

                        if (novoDiretor && novaNacionalidadeDiretor) {

                            novoDiretorJson.status = message.SUCCES_CREATED_ITEM.status
                            novoDiretorJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                            novoDiretorJson.message = message.SUCCES_CREATED_ITEM.message
                            novoDiretorJson.id = idNovoDiretor[0].id
                            novoDiretorJson.diretor = jsonDadosDiretor
                            novoDiretorJson.nacionalidade = nacionalidade

                            return novoDiretorJson
                        } else {
                            return message.INTERNAL_SERVER_ERROR_DB
                        }
                    }
                } if (id_sexo && dt_falec) {
                    let jsonDadosDiretor = {}

                    jsonDadosDiretor.nome = nome
                    jsonDadosDiretor.foto_diretor = foto_diretor
                    jsonDadosDiretor.dt_nasc = dt_nasc
                    jsonDadosDiretor.dt_falec = dt_falec
                    jsonDadosDiretor.id_sexo = id_sexo

                    let novoDiretor = await diretoresDAO.insertDiretor(jsonDadosDiretor)

                    if (novoDiretor) {
                        let idNovoDiretor = await diretoresDAO.selectLastIdDiretores()

                        let infoNacionalidade = await controller_nacionalidades.getNacionalidadePelaNacionalidade(nacionalidade.nacionalidade)
                        let idNacionalidade = infoNacionalidade.nacionalidade[0].id

                        let dadosDiretorNacionalidade = {}
                        dadosDiretorNacionalidade.id_diretor = idNovoDiretor[0].id
                        dadosDiretorNacionalidade.id_nacionalidade = idNacionalidade

                        let novaNacionalidadeDiretor = await controller_nacionalidades_diretor.setInserirNovoNacionalidadeDiretor(dadosDiretorNacionalidade, content)

                        if (novoDiretor && novaNacionalidadeDiretor) {

                            novoDiretorJson.status = message.SUCCES_CREATED_ITEM.status
                            novoDiretorJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                            novoDiretorJson.message = message.SUCCES_CREATED_ITEM.message
                            novoDiretorJson.id = idNovoDiretor[0].id
                            novoDiretorJson.diretor = jsonDadosDiretor
                            novoDiretorJson.nacionalidade = nacionalidade

                            return novoDiretorJson
                        } else {
                            return message.INTERNAL_SERVER_ERROR_DB
                        }
                    }
                } if (id_sexo && sobre) {
                    let jsonDadosDiretor = {}

                    jsonDadosDiretor.nome = nome
                    jsonDadosDiretor.foto_diretor = foto_diretor
                    jsonDadosDiretor.dt_nasc = dt_nasc
                    jsonDadosDiretor.sobre = sobre
                    jsonDadosDiretor.id_sexo = id_sexo

                    let novoDiretor = await diretoresDAO.insertDiretor(jsonDadosDiretor)

                    if (novoDiretor) {
                        let idNovoDiretor = await diretoresDAO.selectLastIdDiretores()

                        let infoNacionalidade = await controller_nacionalidades.getNacionalidadePelaNacionalidade(nacionalidade.nacionalidade)
                        let idNacionalidade = infoNacionalidade.nacionalidade[0].id

                        let dadosDiretorNacionalidade = {}
                        dadosDiretorNacionalidade.id_diretor = idNovoDiretor[0].id
                        dadosDiretorNacionalidade.id_nacionalidade = idNacionalidade

                        let novaNacionalidadeDiretor = await controller_nacionalidades_diretor.setInserirNovoNacionalidadeDiretor(dadosDiretorNacionalidade, content)

                        if (novoDiretor && novaNacionalidadeDiretor) {

                            novoDiretorJson.status = message.SUCCES_CREATED_ITEM.status
                            novoDiretorJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                            novoDiretorJson.message = message.SUCCES_CREATED_ITEM.message
                            novoDiretorJson.id = idNovoDiretor[0].id
                            novoDiretorJson.diretor = jsonDadosDiretor
                            novoDiretorJson.nacionalidade = nacionalidade

                            return novoDiretorJson
                        } else {
                            return message.INTERNAL_SERVER_ERROR_DB
                        }
                    }
                } if (id_sexo) {

                    let jsonDadosDiretor = {}

                    jsonDadosDiretor.nome = nome
                    jsonDadosDiretor.foto_diretor = foto_diretor
                    jsonDadosDiretor.dt_nasc = dt_nasc
                    jsonDadosDiretor.id_sexo = id_sexo

                    let novoDiretor = await diretoresDAO.insertDiretor(jsonDadosDiretor)

                    if (novoDiretor) {
                        let idNovoDiretor = await diretoresDAO.selectLastIdDiretores()

                        let infoNacionalidade = await controller_nacionalidades.getNacionalidadePelaNacionalidade(nacionalidade.nacionalidade)
                        let idNacionalidade = infoNacionalidade.nacionalidade[0].id

                        let dadosDiretorNacionalidade = {}
                        dadosDiretorNacionalidade.id_diretor = idNovoDiretor[0].id
                        dadosDiretorNacionalidade.id_nacionalidade = idNacionalidade

                        let novaNacionalidadeDiretor = await controller_nacionalidades_diretor.setInserirNovoNacionalidadeDiretor(dadosDiretorNacionalidade, content)

                        if (novoDiretor && novaNacionalidadeDiretor) {

                            novoDiretorJson.status = message.SUCCES_CREATED_ITEM.status
                            novoDiretorJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                            novoDiretorJson.message = message.SUCCES_CREATED_ITEM.message
                            novoDiretorJson.id = idNovoDiretor[0].id
                            novoDiretorJson.diretor = jsonDadosDiretor
                            novoDiretorJson.nacionalidade = nacionalidade

                            return novoDiretorJson
                        } else {
                            return message.INTERNAL_SERVER_ERROR_DB
                        }
                    }
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

//Função para atualizar um Diretor existente
const setAtualizarNovoDiretor = async function (id, dadosDiretorNacionalidadeUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {

        let dadosDiretorNacionalidade = {}
        let updateDiretorJson = {}
        let dadosDiretorUpdate = {}
        let dadosNacionalidadeUpdate = {}

        try {
            const validaId = await getBuscarDiretores(id)

            if (validaId) {
                let id_diretor = id
                let nome = dadosDiretorNacionalidadeUpdate.nome
                let foto_diretor = dadosDiretorNacionalidadeUpdate.foto_diretor
                let dt_nasc = dadosDiretorNacionalidadeUpdate.dt_nasc
                let dt_falec = dadosDiretorNacionalidadeUpdate.dt_falec
                let sobre = dadosDiretorNacionalidadeUpdate.sobre

                let nomeSexo = dadosDiretorNacionalidadeUpdate.sexo
                let infoSexo = await controller_sexos.getSexoPeloNome(nomeSexo)
                let id_sexo = infoSexo.sexo[0].id

                let nacionalidade = {}
                nacionalidade.nacionalidade = dadosDiretorNacionalidadeUpdate.nacionalidade
                nacionalidade.pais_origem = dadosDiretorNacionalidadeUpdate.pais_origem

                
                if (
                    nome != '' &&
                    nome != undefined &&
                    nome != null &&
                    nome.length < 200
                ) {
                    dadosDiretorUpdate.nome = nome
                } else if (
                    nome == '' &&
                    nome == undefined &&
                    nome == null
                ){}

                if (
                    foto_diretor != '' &&
                    foto_diretor != undefined &&
                    foto_diretor != null &&
                    foto_diretor.length < 300
                ) {
                    dadosDiretorUpdate.foto_diretor = foto_diretor
                } else if (
                    foto_diretor == '' &&
                    foto_diretor == undefined &&
                    foto_diretor == null
                ){}

                if (
                    dt_nasc != '' &&
                    dt_nasc != undefined &&
                    dt_nasc != null &&
                    dt_nasc.length == 10
                ) {
                    dadosDiretorUpdate.dt_nasc = dt_nasc
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
                    dadosDiretorUpdate.dt_falec = dt_falec
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
                    dadosDiretorUpdate.sobre = sobre
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
                    dadosDiretorUpdate.id_sexo = id_sexo
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

                dadosDiretorNacionalidade.id_nacionalidade = validaId.diretor[0].id_nacionalidade
                dadosDiretorNacionalidade.id_diretor = id_diretor

                let infoNacionalidadeDiretor = {}
                infoNacionalidadeDiretor = await controller_nacionalidades_diretor.getBuscarNacionalidadeDiretorByIdDiretorIdNacionalidade(content, dadosDiretorNacionalidade)
                
                let idNacionalidadeDiretor = infoNacionalidadeDiretor.nacionalidadeDiretorInfo[0].id


                if (idNacionalidade && idNacionalidadeDiretor) {
                    const nacionalidadeDiretorAtualizado = await controller_nacionalidades_diretor.setAtualizarNovoNacionalidadeDiretor(idNacionalidadeDiretor, idNacionalidade, content)

                    dadosNacionalidadeUpdate = nacionalidadeDiretorAtualizado
                }

                const diretorAtualizado = await diretoresDAO.updateDiretor(id, dadosDiretorUpdate)

                if (diretorAtualizado) {

                    updateDiretorJson.status = message.SUCCES_UPDATED_ITEM.status
                    updateDiretorJson.status_code = message.SUCCES_UPDATED_ITEM.status_code
                    updateDiretorJson.message = message.SUCCES_UPDATED_ITEM.message
                    updateDiretorJson.diretor = dadosDiretorUpdate
                    updateDiretorJson.nacionalidade = dadosNacionalidadeUpdate

                    return updateDiretorJson
                } else {
                    console.log(dadosDiretorUpdate, diretorAtualizado)
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

//Função para excluir um Diretor existente
const setExcluirDiretor = async function (id) {
    let deleteDiretorJson = {}

    try {
        const validaId = await getBuscarDiretores(id)

        if (validaId) {
            const apagarNacionalidadeDiretor = await controller_nacionalidades_diretor.setExcluirNacionalidadeDiretorByDiretorId(id)

            if (apagarNacionalidadeDiretor) {
                const apagarDiretor = await diretoresDAO.deleteDiretor(id)

                if (apagarDiretor) {
                    deleteDiretorJson.status = message.SUCCES_DELETED_ITEM.status
                    deleteDiretorJson.status_code = message.SUCCES_DELETED_ITEM.status_code
                    deleteDiretorJson.message = message.SUCCES_DELETED_ITEM.message
                    deleteDiretorJson.id = validaId

                    return deleteDiretorJson
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

//Função para retornar todos os Diretores do banco de dados
const getListarDiretores = async function () {

    let nacionalidadesDiretoresJSON = {}

    //Chama a função do DAO para retornar os dados do BD
    let dadosDiretores = await diretoresDAO.selectAllDiretores()

    //Validação para criar o JSON dos dados
    if (dadosDiretores) {
        if (dadosDiretores.length > 0) {

            //Cria o JSON de retorno dos dados
            nacionalidadesDiretoresJSON.info = dadosDiretores
            nacionalidadesDiretoresJSON.quantidade = dadosDiretores.length
            nacionalidadesDiretoresJSON.status_code = 200

            return nacionalidadesDiretoresJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.INTERNAL_SERVER_ERROR_DB
    }
}

const getListarFotosDiretores = async function () {

    //Criar o objeto JSON
    let fotoDiretoresJSON = {}

    //Chama a função do DAO para retornar os dados do BD
    let dadosFotoDiretores = await diretoresDAO.selectAllPhotoDiretores()

    //Validação para criar o JSON dos dados
    if (dadosFotoDiretores) {
        if (dadosFotoDiretores.length > 0) {

            //Cria o JSON de retorno dos dados
            fotoDiretoresJSON.Diretores = dadosFotoDiretores
            fotoDiretoresJSON.quantidade = dadosFotoDiretores.length
            fotoDiretoresJSON.status_code = 200

            return fotoDiretoresJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.INTERNAL_SERVER_ERROR_DB
    }
}


//Função para retornar o filtro de um Diretor pelo id
const getBuscarDiretores = async function (id) {

    let idDiretor = id

    let idDiretorJson = {}

    if (idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)) {
        return message.ERROR_INVALID_ID
    } else {

        //Encaminha o ID do Diretor para o DAO para o retorno do banco de dados 
        let dadosDiretor = await diretoresDAO.selectByIdDiretores(idDiretor)

        if (dadosDiretor) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosDiretor.length > 0) {
                idDiretorJson.diretor = dadosDiretor
                idDiretorJson.status_code = 200

                return idDiretorJson
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }
}

const getBuscarDiretoresPeloNome = async function (nome) {
    let nomeDiretor = nome

    let nomeDiretorJson = {}

    if (nomeDiretor == '' || nomeDiretor == undefined) {
        return message.ERROR_INVALID_NAME_ENTER
    } else {

        //Encaminha o ID do Diretor para o DAO para o retorno do banco de dados 
        let dadosDiretor = await diretoresDAO.selectByNameDiretores(nomeDiretor)

        if (dadosDiretor) {
            //Validação para verificar se o DAO retornou os dados
            if (dadosDiretor.length > 0) {
                nomeDiretorJson.Diretor = dadosDiretor
                nomeDiretorJson.status_code = 200

                return nomeDiretorJson
            } else {
                return message.ERROR_INVALID_NAME_ENTER
            }
        } else {
            return message.INTERNAL_SERVER_ERROR_DB
        }
    }
}

module.exports = {
    setInserirNovoDiretor,
    setAtualizarNovoDiretor,
    setExcluirDiretor,
    getListarDiretores,
    getBuscarDiretores,
    getBuscarDiretoresPeloNome,
    getListarFotosDiretores
}