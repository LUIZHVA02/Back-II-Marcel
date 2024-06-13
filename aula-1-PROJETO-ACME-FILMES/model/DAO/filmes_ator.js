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

const selectLastIdFilmesAtor = async function () {

    try {
        //ScriptSQL para buscar um dos registros pelo id no BD
        let sql = `select cast(last_insert_id() as decimal) as id from tbl_filmes_ator limit 1`

        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let lastFilmeAtor = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        if (lastFilmeAtor) {
            return lastFilmeAtor
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

//Função para excluir um FilmeAtor no banco de dados
const insertFilmeAtor = async function (dadosFilmeAtor) {
    let sql

    try {
        sql = `
                insert into tbl_filmes_ator  (
                                            id_ator,
                                            id_filme
                                        )values(
                                                "${dadosFilmeAtor.id_ator}", 
                                                "${dadosFilmeAtor.id_filme}"
                                        );
            `

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

//Função para atualizar um FilmeAtor no banco de dados
const updateFilmeAtor = async function (id, dadosFilmeAtorUpdate) {
    try {
        let sql = `UPDATE tbl_filmes_ator SET `
        const keys = Object.keys(dadosFilmeAtorUpdate)

        keys.forEach((key, index) => {
            sql += `${key} = '${dadosFilmeAtorUpdate[key]}'`
            if (index !== keys.length - 1) {
                sql += `, `
            }
        })

        sql += ` WHERE id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        return result
    } catch (error) {
        return false
    }

}

//Função para excluir um FilmeAtor no banco de dados
const deleteFilmeAtor = async function (id) {
    try {
        let sql = `delete from tbl_filmes_ator where id = ${id};`
        let result = await prisma.$executeRawUnsafe(sql)

        return result
    } catch (error) {
        return false
    }
}

const deleteFilmesAtorByIdFilme = async function (id) {
    try {
        let sql = `delete from tbl_filmes_ator where id_filme = ${id};`
        let result = await prisma.$executeRawUnsafe(sql)

        return result
    } catch (error) {
        return false
    }
}

const deleteFilmesAtorByIdAtor = async function (id) {
    try {
        let sql = `delete from tbl_filmes_ator where id_ator = ${id};`
        let result = await prisma.$executeRawUnsafe(sql)

        return result
    } catch (error) {
        return false
    }
}

//Função para retornar todos os FilmesAtor do banco de dados
const selectAllFilmesAtor = async function () {

    try {
        //Script SQL para buscar todos os registros do BD
        let sql = `select *from tbl_filmes_ator`

        /**
         * $queryRawUnsafe(sql)                 ----- Encaminha uma variável
         * $queryRaw('select*from tbl_FilmeAtor')   ----- Encaminha direto o script
        */

        //Executa o scriptSQL no DB e guarda o retorno dos dados
        let rsFilmesAtor = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsFilmesAtor

    } catch (error) {
        return false
    }
}

//Função para retornar um FilmeAtor no banco de dados pelo id
const selectByIdFilmesAtor = async function (id) {

    try {
        //ScriptSQL para buscar um dos registros pelo id no BD
        let sql = `select *from tbl_filmes_ator where id = ${id}`

        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let rsFilmeAtor = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsFilmeAtor
    } catch (error) {
        return false
    }
}

const selectFilmesAtorByIdAtor = async function (id) {

    try {
        //ScriptSQL para buscar um dos registros pelo id no BD
        let sql = `select *from tbl_filmes_ator where id_ator = ${id}`

        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let rsFilmeAtor = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsFilmeAtor
    } catch (error) {
        return false
    }
}

const selectFilmesAtorByIdFilme = async function (id) {

    try {
        //ScriptSQL para buscar um dos registros pelo id no BD
        let sql = `select *from tbl_filmes_ator where id_filme = ${id}`

        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let rsFilmeAtor = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsFilmeAtor
    } catch (error) {
        return false
    }
}

const selectFilmeAtorByIdAtorByIdFilme = async function (idAtor, idFilme) {

    try {
        //ScriptSQL para buscar um dos registros pelo id no BD
        let sql = `select *from tbl_filmes_ator where id_ator = ${idAtor} and id_filme = ${idFilme}`

        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let rsGeneroFilme = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsGeneroFilme
    } catch (error) {
        return false
    }
}

module.exports = {
    insertFilmeAtor,
    updateFilmeAtor,
    deleteFilmeAtor,
    deleteFilmesAtorByIdAtor,
    deleteFilmesAtorByIdFilme,
    selectAllFilmesAtor,
    selectByIdFilmesAtor,
    selectFilmesAtorByIdAtor,
    selectFilmesAtorByIdFilme,
    selectFilmeAtorByIdAtorByIdFilme,
    selectLastIdFilmesAtor,
}