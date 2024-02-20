/*********************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD no
 * banco de dados MySQL
 * Data: 30/01/2024
 * Autor: Luiz Henrique Vidal
 * Versão: 1.0 
 ********************************************************/

//Import da biblioteca do prisma cliente
const { PrismaClient } = require('@prisma/client')

//Instânciando a classe do PrismaCliente
const prisma = new PrismaClient()

//Função para excluir um filme no banco de dados
const InsertFilme = async function () {

}

//Função para atualizar um filme no banco de dados
const updateFilme = async function () {

}

//Função para excluir um filme no banco de dados
const deleteFilme = async function () {

}

//Função para retornar todos os filmes do banco de dados
const selectAllFilmes = async function () {

    try {
        //Script SQL para buscar todos os registros do BD
    let sql = 'select * from tbl_filmes'

    /**
     * $queryRawUnsafe(sql)                 ----- Encaminha uma variável
     * $queryRaw('select*from tbl_filme')   ----- Encaminha direto o script
    */

    //Executa o scriptSQL no DB e guarda o retorno dos dados
    let rsFilmes = await prisma.$queryRawUnsafe(sql)

    //Validação para retornar os dados ou retornar false
        return rsFilmes

    } catch (error) {
        return false
    }
}

//Função para retornar um filme no banco de dados pelo id
const selectByIdFilmes = async function (id) {

    try {
        //ScriptSQL para buscar um dos registros pelo id no BD
        let sql = `select* from tbl_filmes where id = ${id}`

        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let rsFilme = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsFilme
    } catch (error) {
        return false
    }
}

module.exports = {
    InsertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilmes
}