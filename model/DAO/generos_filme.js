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

const selectLastIdGeneroFilmes = async function () {

    try {
        //ScriptSQL para buscar um dos registros pelo id no BD
        let sql = `select cast(last_insert_id() as decimal) as id from tbl_genero_filme limit 1`

        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let lastGeneroFilme = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        if (lastGeneroFilme) {
            return lastGeneroFilme
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

//Função para excluir um GeneroFilme no banco de dados
const insertGeneroFilme = async function (dadosGeneroFilme) {
    let sql

    try {
        sql = `
                insert into tbl_genero_filme  (
                                            id_genero,
                                            id_filme
                                        )values(
                                                "${dadosGeneroFilme.id_genero}", 
                                                "${dadosGeneroFilme.id_filme}"
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

//Função para atualizar um GeneroFilme no banco de dados
const updateGeneroFilme = async function (id, dadosGeneroFilmeUpdate) {
    try {
        let sql = `UPDATE tbl_genero_filme SET `
        const keys = Object.keys(dadosGeneroFilmeUpdate)

        keys.forEach((key, index) => {
            sql += `${key} = '${dadosGeneroFilmeUpdate[key]}'`
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

//Função para excluir um GeneroFilme no banco de dados
const deleteGeneroFilme = async function (id) {
    try {
        let sql = `delete from tbl_genero_filme where id = ${id};`
        let result = await prisma.$executeRawUnsafe(sql)

        return result
    } catch (error) {
        return false
    }
}

const deleteGeneroFilmeByIdGenero = async function (id) {
    try {
        let sql = `delete from tbl_genero_filme where id_genero = ${id};`
        let result = await prisma.$executeRawUnsafe(sql)

        return result
    } catch (error) {
        return false
    }
}

const deleteGeneroFilmeByIdFilme = async function (id) {
    try {
        let sql = `delete from tbl_genero_filme where id_filme = ${id};`
        let result = await prisma.$executeRawUnsafe(sql)

        return result
    } catch (error) {
        return false
    }
}

//Função para retornar todos os GeneroFilmes do banco de dados
const selectAllGeneroFilmes = async function () {

    try {
        //Script SQL para buscar todos os registros do BD
        let sql = `select *from tbl_genero_filme`

        /**
         * $queryRawUnsafe(sql)                 ----- Encaminha uma variável
         * $queryRaw('select*from tbl_GeneroFilme')   ----- Encaminha direto o script
        */

        //Executa o scriptSQL no DB e guarda o retorno dos dados
        let rsGeneroFilmes = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsGeneroFilmes

    } catch (error) {
        return false
    }
}

//Função para retornar um GeneroFilme no banco de dados pelo id
const selectByIdGeneroFilmes = async function (id) {

    try {
        //ScriptSQL para buscar um dos registros pelo id no BD
        let sql = `select *from tbl_genero_filme where id = ${id}`

        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let rsGeneroFilme = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsGeneroFilme
    } catch (error) {
        return false
    }
}

const selectGeneroFilmesByIdGenero = async function (id) {

    try {
        //ScriptSQL para buscar um dos registros pelo id no BD
        let sql = `select *from tbl_genero_filme where id_genero = ${id}`

        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let rsGeneroFilme = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsGeneroFilme
    } catch (error) {
        return false
    }
}

const selectGeneroFilmesByIdFilme = async function (id) {

    try {
        //ScriptSQL para buscar um dos registros pelo id no BD
        let sql = `select *from tbl_genero_filme where id_filme = ${id}`

        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let rsGeneroFilme = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsGeneroFilme
    } catch (error) {
        return false
    }
}

const selectGeneroFilmesByIdFilmeByIdGenero = async function (idGenero, idFilme) {

    try {
        //ScriptSQL para buscar um dos registros pelo id no BD
        let sql = `select *from tbl_genero_filme where id_genero = ${idGenero} and id_filme = ${idFilme}`

        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let rsGeneroFilme = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsGeneroFilme
    } catch (error) {
        return false
    }
}

//Função para retornar um GeneroFilme no banco de dados pelo id

module.exports = {
    insertGeneroFilme,
    updateGeneroFilme,
    deleteGeneroFilme,
    deleteGeneroFilmeByIdFilme,
    deleteGeneroFilmeByIdGenero,
    selectAllGeneroFilmes,
    selectByIdGeneroFilmes,
    selectGeneroFilmesByIdGenero,
    selectGeneroFilmesByIdFilme,
    selectGeneroFilmesByIdFilmeByIdGenero,
    selectLastIdGeneroFilmes,
}