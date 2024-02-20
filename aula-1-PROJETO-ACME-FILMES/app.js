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
 */

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use ((request, response, next)=>{

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')

    app.use(cors())

    next()
})

/*************** Import dos arquivos internos do projeto ***************/

    const controllerFilmes = require('./controller/controller_filme.js')

/***********************************************************************/

// app.get('/v1/acme-filmes/filmes/:id', cors(), async function (request, response, next) {

//     let filmeIdUser = request.params.id

//     let controleFilmesID = require('./controller/funcoes.js')

//     let filmesID = controleFilmesID.getFilmesID(filmeIdUser)

//     if(filmesID){
//         response.json(filmesID)
//         response.status(200)
//     }else{
//         response.status(404)
//         response.json({erro:'Não foi possível encontrar um item!'})
//     }
// })

//EndPoint: Retorna os dados do arquivo JSON
app.get('/v1/acme-filmes/filmes', cors(), async function (request, response, next) {

    let controleNomeFilmes = require('./controller/funcoes.js')

    let infoFilmes = await controleNomeFilmes.getFilmes()

    if(infoFilmes){
        response.json(infoFilmes)
        response.status(200)
    }else{
        response.status(404)
        response.json({erro:'Não foi possível encontrar um item!'})
    }
})

//EndPoint: Retorna os dados do BD(Banco de Dados)
app.get('/v2/acmefilmes/filmes', cors(), async function(request, response, next){

    //Chama a função para retornar os dados de filme
    let dadosFilmes = await controllerFilmes.getListarFilmes()

    response.status(dadosFilmes.status_code)
    response.json(dadosFilmes)
})

//EndPoint: Retorna os dados de um filme pelo ID
app.get('/v2/acmefilmes/filme/:id', cors(), async function(request, response, next){

    let idFilme = request.params.id
    
    let dadosFilme = await controllerFilmes.getBuscarFilmes(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

app.listen(8080, function(){
    console.log('Serviço funcionando e aguardando requisições')
})