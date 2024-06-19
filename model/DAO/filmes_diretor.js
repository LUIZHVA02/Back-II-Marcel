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

const selectLastidDiretorFilmes = async function () {

    try {
        //ScriptSQL para buscar um dos registros pelo id no BD
        let sql = `select cast(last_insert_id() as decimal) as id from tbl_filmes_diretor limit 1`

        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let lastFilmesDiretor = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        if (lastFilmesDiretor) {
            return lastFilmesDiretor
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

//Função para excluir um FilmesDiretor no banco de dados
const insertFilmesDiretor = async function (dadosFilmesDiretor) {
    let sql

    try {
        sql = `
                insert into tbl_filmes_diretor  (
                                            id_diretor,
                                            id_filme
                                        )values(
                                                "${dadosFilmesDiretor.id_diretor}", 
                                                "${dadosFilmesDiretor.id_filme}"
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

//Função para atualizar um FilmesDiretor no banco de dados
const updateFilmesDiretor = async function (id, dadosFilmesDiretorUpdate) {
    try {
        let sql = `UPDATE tbl_filmes_diretor SET `
        const keys = Object.keys(dadosFilmesDiretorUpdate)

        keys.forEach((key, index) => {
            sql += `${key} = '${dadosFilmesDiretorUpdate[key]}'`
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

//Função para excluir um FilmesDiretor no banco de dados
const deleteFilmesDiretor = async function (id) {
    try {
        let sql = `delete from tbl_filmes_diretor where id = ${id};`
        let result = await prisma.$executeRawUnsafe(sql)

        return result
    } catch (error) {
        return false
    }
}

const deleteFilmesDiretorByIdFilme = async function (id) {
    try {
        let sql = `delete from tbl_filmes_diretor where id_filme = ${id};`
        let result = await prisma.$executeRawUnsafe(sql)

        return result
    } catch (error) {
        return false
    }
}

const deleteFilmesDiretorByIdDiretor = async function (id) {
    try {
        let sql = `delete from tbl_filmes_diretor where id_diretor = ${id};`
        let result = await prisma.$executeRawUnsafe(sql)

        return result
    } catch (error) {
        return false
    }
}

//Função para retornar todos os FilmesDiretores do banco de dados
const selectAllFilmesDiretores = async function () {

    try {
        //Script SQL para buscar todos os registros do BD
        let sql = `select *from tbl_filmes_diretor`

        /**
         * $queryRawUnsafe(sql)                 ----- Encaminha uma variável
         * $queryRaw('select*from tbl_FilmesDiretor')   ----- Encaminha direto o script
        */

        //Executa o scriptSQL no DB e guarda o retorno dos dados
        let rsFilmesDiretores = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsFilmesDiretores

    } catch (error) {
        return false
    }
}

//Função para retornar um FilmesDiretor no banco de dados pelo id
const selectByidDiretorFilmes = async function (id) {

    try {
        //ScriptSQL para buscar um dos registros pelo id no BD
        let sql = `select *from tbl_filmes_diretor where id = ${id}`

        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let rsFilmesDiretor = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsFilmesDiretor
    } catch (error) {
        return false
    }
}

const selectFilmesDiretoresByidDiretor = async function (id) {

    try {
        //ScriptSQL para buscar um dos registros pelo id no BD
        let sql = `select *from tbl_filmes_diretor where id_diretor = ${id}`

        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let rsFilmesDiretor = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsFilmesDiretor
    } catch (error) {
        return false
    }
}

const selectFilmesDiretoresByIdFilme = async function (id) {

    try {
        //ScriptSQL para buscar um dos registros pelo id no BD
        let sql = `select *from tbl_filmes_diretor where id_filme = ${id}`

        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let rsFilmesDiretor = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsFilmesDiretor
    } catch (error) {
        return false
    }
}

const selectFilmesDiretorByIdDiretorByIdFilme = async function (idDiretor, idFilme) {

    try {
        //ScriptSQL para buscar um dos registros pelo id no BD
        let sql = `select *from tbl_filmes_diretor where id_diretor = ${idDiretor} and id_filme = ${idFilme}`

        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let rsFilmesDiretor = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsFilmesDiretor
    } catch (error) {
        return false
    }
}

module.exports = {
    insertFilmesDiretor,
    updateFilmesDiretor,
    deleteFilmesDiretor,
    deleteFilmesDiretorByIdDiretor,
    deleteFilmesDiretorByIdFilme,
    selectAllFilmesDiretores,
    selectByidDiretorFilmes,
    selectFilmesDiretoresByidDiretor,
    selectFilmesDiretoresByIdFilme,
    selectFilmesDiretorByIdDiretorByIdFilme,
    selectLastidDiretorFilmes,
}