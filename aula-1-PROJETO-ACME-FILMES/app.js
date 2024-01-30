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

app.get('/v1/acme-filmes/filmes/:id', cors(), async function (request, response, next) {

    let filmeIdUser = request.params.id

    let controleFilmesID = require('./controller/funcoes')

    let filmesID = controleFilmesID.getFilmesID(filmeIdUser)

    if(filmesID){
        response.json(filmesID)
        response.status(200)
    }else{
        response.status(404)
        response.json({erro:'Não foi possível encontrar um item!'})
    }
})

app.get('/v1/acme-filmes/filmes', cors(), async function (request, response, next) {

    let controleNomeFilmes = require('./controller/funcoes')

    let infoFilmes = controleNomeFilmes.getFilmes()

    if(infoFilmes){
        response.json(infoFilmes)
        response.status(200)
    }else{
        response.status(404)
        response.json({erro:'Não foi possível encontrar um item!'})
    }
})

app.listen(8080, function(){
    console.log('Serviço funcionando e aguardando requisições')
})