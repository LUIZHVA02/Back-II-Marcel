/**
 * Objetivo: Arquivo para realizar as requisições de filmes
 * Data: 30/01/2024
 * Autor: Luiz Henrique Vidal
 * Versão: 1.0 
 */

/*
 * Para realizar a interação com banco de dados precisamos de uma biblioteca
 *      - SEQUELIZE ORM (Biblioteca mais antiga)
 *      - PRISMA ORM    (Biblioteca mais atual)
 *      - FASTFY ORM    (Biblioteca mais atual)
 * 
 *      instalação do PRISMA ORM
 *          npm install prisma --save (É quem realiza a conexão com o banco de dados)
 *          npm install @prisma/client --save (É quem executa os scripts SQL no BD)
 * 
 *      Após as intalações devemos rodar o comando:
 *          npx prisma init (Esse comando inicializa a utilização do projeto)
 * 
 *      Caso ocorra algum problema, execute:
 *              npx prisma generate 
 *              npm i 
 */

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS')

    app.use(cors())

    next()
})

const bodyParserJson = bodyParser.json()

/*************** Import dos arquivos internos do projeto ***************/

const controllerFilmes = require('./controller/controller_filme.js')
const controllerClassificacoes = require('./controller/controller_classificacoes.js')
const controllerGeneros = require('./controller/controller_generos.js')
const controllerSexos = require('./controller/controller_sexos.js')
const controllerNacionalidades = require('./controller/controller_nacionalidades.js')
const controllerAtores = require('./controller/controller_atores.js')
const { METHOD_NOT_ALLOWED } = require('./modulo/config.js')

/***********************************************************************/

//EndPoint: Retorna os dados do arquivo JSON
app.get('/v1/acme-filmes/filmes', cors(), async function (request, response, next) {

    let controleNomeFilmes = require('./controller/funcoes.js')

    let infoFilmes = await controleNomeFilmes.getFilmes()

    if (infoFilmes) {
        response.json(infoFilmes)
        response.status(200)
    } else {
        response.status(404)
        response.json({ erro: 'Não foi possível encontrar um item!' })
    }
})

app.get('/v1/acme-filmes/filmes/:id', cors(), async function (request, response, next) {

    let filmeIdUser = request.params.id

    let controleFilmesID = require('./controller/funcoes.js')

    let filmesID = controleFilmesID.getFilmesID(filmeIdUser)

    if (filmesID) {
        response.json(filmesID)
        response.status(200)
    } else {
        response.status(404)
        response.json({ erro: 'Não foi possível encontrar um item!' })
    }
})





//EndPoint: Retorna os dados do BD(Banco de Dados)
app.get('/v2/acmefilmes/filmes', cors(), async function (request, response, next) {

    //Chama a função para retornar os dados de filme
    let dadosFilmes = await controllerFilmes.getListarFilmes()

    response.status(dadosFilmes.status_code)
    response.json(dadosFilmes)
})

app.get('/v2/acmefilmes/filme/foto_capa', cors(), async function (request, response, next) {

    //Chama a função para retornar os dados de filme
    let dadosFilmes = await controllerFilmes.getListarFotosFilmes()

    response.status(dadosFilmes.status_code)
    response.json(dadosFilmes)
})

//EndPoint: Retorna os dados de um filme pelo ID
app.get('/v2/acmefilmes/filme/:id', cors(), async function (request, response, next) {

    let idFilme = request.params.id

    let dadosFilme = await controllerFilmes.getBuscarFilmes(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

//EndPoint: Retorna os dados de um filme pelo nome
app.get('/v2/acmefilmes/filtro/filme/', cors(), async function (request, response, next) {

    let nomeFilme = request.query.nome

    let dadosFilme = await controllerFilmes.getBuscarFilmesPeloNome(nomeFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

app.post('/v2/acmefilmes/filme/', cors(), bodyParserJson, async function (request, response, next) {

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

app.put('/v2/acmefilmes/updateFilme/:id', cors(), bodyParserJson, async function (request, response, next) {

    let idFilme = request.params.id
    let contentType = request.headers['content-type']
    let dadosFilmeUpdate = request.body

    let resultDados = await controllerFilmes.setAtualizarNovoFilme(idFilme, dadosFilmeUpdate, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v2/acmefilmes/deleteFilme/:id', cors(), bodyParserJson, async function (request, response, next) {

    let idFilme = request.params.id

    let resultDados = await controllerFilmes.setExcluirFilme(idFilme)

    response.status(resultDados.status_code)
    response.json(resultDados)
})





app.get('/v2/acmefilmes/classificacoes', cors(), async function (request, response, next){
    let dadosClassificacoes = await controllerClassificacoes.getListarClassificacoes()

    response.status(dadosClassificacoes.status_code)
    response.json(dadosClassificacoes)
})

app.post('/v2/acmefilmes/classificacao/', cors(), bodyParserJson, async function (request, response, next) {

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controllerClassificacoes.setInserirNovaClassificacao(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

app.get('/v2/acmefilmes/filtro/classificacao/siglas/', cors(), async function (request, response, next){
    
    let siglaClassificacao = request.query.sigla
    
    let dadosClassificacao = await controllerClassificacoes.getClassificacaoPelaSigla(siglaClassificacao)

    response.status(dadosClassificacao.status_code)
    response.json(dadosClassificacao)
})

app.get('/v2/acmefilmes/filtro/classificacao/legenda/', cors(), async function (request, response, next){
    
    let legendaClassificacao = request.query.legenda

    
    let dadosClassificacao = await controllerClassificacoes.getClassificacaoPelaLegenda(legendaClassificacao)

    response.status(dadosClassificacao.status_code)
    response.json(dadosClassificacao)
})

app.put('/v2/acmefilmes/updateClassificacao/:id', cors(), bodyParserJson, async function (request, response, next) {

    let idClassificacao = request.params.id
    let contentType = request.headers['content-type']
    let dadosFilmeUpdate = request.body

    let resultDados = await controllerClassificacoes.setAtualizarClassificacoes(idClassificacao, dadosFilmeUpdate, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.get('/v2/acmefilmes/classificacao/:id', cors(), async function (request, response, next){
    
    let idClassificacao = request.params.id

    
    let dadosClassificacao = await controllerClassificacoes.getBuscarClassificacao(idClassificacao)

    response.status(dadosClassificacao.status_code)
    response.json(dadosClassificacao)
})

app.delete('/v2/acmefilmes/deleteClassificacao/:id', cors(), bodyParserJson, async function (request, response, next) {

    let idClassificacao = request.params.id

    let resultDados = await controllerClassificacoes.setExcluirClassificacao(idClassificacao)

    response.status(resultDados.status_code)
    response.json(resultDados)
})





app.get('/v2/acmefilmes/genero', cors(), async function (request, response, next) {

    //Chama a função para retornar os dados de filme
    let dadosGeneros = await controllerGeneros.getListarGeneros()

    response.status(dadosGeneros.status_code)
    response.json(dadosGeneros)
})


//EndPoint: Retorna os dados de um filme pelo ID
app.get('/v2/acmefilmes/genero/:id', cors(), async function (request, response, next) {

    let idGenero = request.params.id

    let dadosGenero = await controllerGeneros.getBuscarGenero(idGenero)

    response.status(dadosGenero.status_code)
    response.json(dadosGenero)
})

//EndPoint: Retorna os dados de um filme pelo nome
app.get('/v2/acmefilmes/filtro/genero/nome/', cors(), async function (request, response, next) {

    let nomeGenero = request.query.nome

    let dadosGenero = await controllerGeneros.getGeneroPeloNome(nomeGenero)

    response.status(dadosGenero.status_code)
    response.json(dadosGenero)
})

app.post('/v2/acmefilmes/genero/', cors(), bodyParserJson, async function (request, response, next) {

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controllerGeneros.setInserirNovoGenero(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

app.put('/v2/acmefilmes/updateGenero/:id', cors(), bodyParserJson, async function (request, response, next) {

    let idGenero = request.params.id
    let contentType = request.headers['content-type']
    let dadosGeneroUpdate = request.body

    let resultDados = await controllerGeneros.setAtualizarGeneros(idGenero, dadosGeneroUpdate, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v2/acmefilmes/deleteGenero/:id', cors(), bodyParserJson, async function (request, response, next) {

    let idGenero = request.params.id

    let resultDados = await controllerGeneros.setExcluirGenero(idGenero)

    response.status(resultDados.status_code)
    response.json(resultDados)
})





app.get('/v2/acmefilmes/nacionalidades', cors(), async function (request, response, next) {

    //Chama a função para retornar os dados de filme
    let dadosNacionalidade = await controllerNacionalidades.getListarNacionalidades()

    response.status(dadosNacionalidade.status_code)
    response.json(dadosNacionalidade)
})


//EndPoint: Retorna os dados de um filme pelo ID
app.get('/v2/acmefilmes/nacionalidade/:id', cors(), async function (request, response, next) {

    let idNacionalidade = request.params.id

    let dadosNacionalidade = await controllerNacionalidades.getBuscarNacionalidade(idNacionalidade)

    response.status(dadosNacionalidade.status_code)
    response.json(dadosNacionalidade)
})

//EndPoint: Retorna os dados de um filme pelo nome
app.get('/v2/acmefilmes/filtro/nacionalidade/nome/', cors(), async function (request, response, next) {

    let nomeNacionalidade = request.query.nome

    let dadosNacionalidade = await controllerNacionalidades.getNacionalidadePelaNacionalidade(nomeNacionalidade)

    response.status(dadosNacionalidade.status_code)
    response.json(dadosNacionalidade)
})

app.get('/v2/acmefilmes/filtro/nacionalidade/paisOrigem/nome/', cors(), async function (request, response, next) {

    let nomePaisOrigem = request.query.nome

    let dadosNacionalidade = await controllerNacionalidades.getNacionalidadePeloPaisOrigem(nomePaisOrigem)

    response.status(dadosNacionalidade.status_code)
    response.json(dadosNacionalidade)
})

app.post('/v2/acmefilmes/InsertNacionalidade/', cors(), bodyParserJson, async function (request, response, next) {

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controllerNacionalidades.setInserirNovaNacionalidade(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

app.put('/v2/acmefilmes/updateNacionalidade/:id', cors(), bodyParserJson, async function (request, response, next) {

    let idNacionalidade = request.params.id
    let contentType = request.headers['content-type']
    let dadosNacionalidadeUpdate = request.body

    let resultDados = await controllerNacionalidades.setAtualizarNacionalidades(idNacionalidade, dadosNacionalidadeUpdate, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v2/acmefilmes/deleteNacionalidade/:id', cors(), bodyParserJson, async function (request, response, next) {

    let idNacionalidade = request.params.id

    let resultDados = await controllerNacionalidades.setExcluirNacionalidade(idNacionalidade)

    response.status(resultDados.status_code)
    response.json(resultDados)
})





app.get('/v2/acmefilmes/sexos', cors(), async function (request, response, next) {

    //Chama a função para retornar os dados de filme
    let dadosSexo = await controllerSexos.getListarSexos()

    response.status(dadosSexo.status_code)
    response.json(dadosSexo)
})


//EndPoint: Retorna os dados de um filme pelo ID
app.get('/v2/acmefilmes/sexo/:id', cors(), async function (request, response, next) {

    let idSexo = request.params.id

    let dadosSexo = await controllerSexos.getBuscarSexo(idSexo)

    response.status(dadosSexo.status_code)
    response.json(dadosSexo)
})

//EndPoint: Retorna os dados de um filme pelo nome
app.get('/v2/acmefilmes/filtro/sexo/nome/', cors(), async function (request, response, next) {

    let nomeSexo = request.query.nome

    let dadosSexo = await controllerSexos.getSexoPeloNome(nomeSexo)

    response.status(dadosSexo.status_code)
    response.json(dadosSexo)
})

app.post('/v2/acmefilmes/InsertSexo/', cors(), bodyParserJson, async function (request, response, next) {

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controllerSexos.setInserirNovoSexo(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

app.put('/v2/acmefilmes/updateSexo/:id', cors(), bodyParserJson, async function (request, response, next) {

    let idSexo = request.params.id
    let contentType = request.headers['content-type']
    let dadosSexoUpdate = request.body

    let resultDados = await controllerSexos.setAtualizarSexos(idSexo, dadosSexoUpdate, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v2/acmefilmes/deleteSexo/:id', cors(), bodyParserJson, async function (request, response, next) {

    let idSexo = request.params.id

    let resultDados = await controllerSexos.setExcluirSexo(idSexo)

    response.status(resultDados.status_code)
    response.json(resultDados)
})




app.get('/v2/acmefilmes/atores', cors(), async function (request, response, next) {

    //Chama a função para retornar os dados de filme
    let dadosAtor = await controllerAtores.getListarAtores()

    response.status(dadosAtor.status_code)
    response.json(dadosAtor)
})


//EndPoint: Retorna os dados de um filme pelo ID
app.get('/v2/acmefilmes/ator/:id', cors(), async function (request, response, next) {

    let idAtor = request.params.id

    let dadosAtor = await controllerAtores.getBuscarAtores(idAtor)

    response.status(dadosAtor.status_code)
    response.json(dadosAtor)
})

//EndPoint: Retorna os dados de um filme pelo nome
app.get('/v2/acmefilmes/filtro/ator/nome/', cors(), async function (request, response, next) {

    let nomeAtor = request.query.nome

    let dadosAtor = await controllerAtores.getBuscarAtoresPeloNome(nomeAtor)

    response.status(dadosAtor.status_code)
    response.json(dadosAtor)
})

app.post('/v2/acmefilmes/InsertAtor/', cors(), bodyParserJson, async function (request, response, next) {

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controllerAtores.setInserirNovoAtor(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

app.put('/v2/acmefilmes/updateAtor/:id', cors(), bodyParserJson, async function (request, response, next) {

    let idAtor = request.params.id
    let contentType = request.headers['content-type']
    let dadosAtorUpdate = request.body

    let resultDados = await controllerAtores.setAtualizarNovoAtor(idAtor, dadosAtorUpdate, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v2/acmefilmes/deleteAtor/:id', cors(), bodyParserJson, async function (request, response, next) {

    let idAtor = request.params.id

    let resultDados = await controllerAtores.setExcluirAtor(idAtor)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.listen(8080, function () {
    console.log('Serviço funcionando e aguardando requisições')
})