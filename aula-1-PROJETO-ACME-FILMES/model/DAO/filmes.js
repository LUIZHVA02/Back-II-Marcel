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
const InsertFilme = async function (dadosFilme) {
    let sql

    try {
        //ScriptSQL para buscar um dos registros pelo nome no BD

        if (dadosFilme.data_relancamento == undefined ||
            dadosFilme.data_relancamento == null ||
            dadosFilme.data_relancamento == '') {

            sql = `
                insert into tbl_filmes  (
                                            nome, 
                                            sinopse, 
                                            duracao, 
                                            data_lancamento,
                                            foto_capa, 
                                            valor_unitario
                                        )values(
                                                '${dadosFilme.nome}', 
                                                '${dadosFilme.sinopse}', 
                                                '${dadosFilme.duracao}', 
                                                '${dadosFilme.data_lancamento}',
                                                '${dadosFilme.foto_capa}', 
                                                '${dadosFilme.valor_unitario}'
                                );
            `  
        } else {
            sql = `
                insert into tbl_filmes  (
                                            nome, 
                                            sinopse, 
                                            duracao, 
                                            data_lancamento, 
                                            data_relancamento, 
                                            foto_capa, 
                                            valor_unitario
                                        )values(
                                                '${dadosFilme.nome}', 
                                                '${dadosFilme.sinopse}', 
                                                '${dadosFilme.duracao}', 
                                                '${dadosFilme.data_lancamento}', 
                                                '${dadosFilme.data_relancamento}', 
                                                '${dadosFilme.foto_capa}', 
                                                '${dadosFilme.valor_unitario}'
                                        );
                `
            
        }
        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let result = await prisma.$executeRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false

        if (result) {
            return true
        } else {
            return false
        }
        
    } catch (error) {
        return false
    }
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

//Função para retornar um filme no banco de dados pelo id
const selectByNameFilmes = async function (nome) {

    try {
        //ScriptSQL para buscar um dos registros pelo nome no BD
        let sql = `select* from tbl_filmes where nome like '%${nome}%';`

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
    selectByIdFilmes,
    selectByNameFilmes
}