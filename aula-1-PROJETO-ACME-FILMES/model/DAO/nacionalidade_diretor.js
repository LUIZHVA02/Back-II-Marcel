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

const selectAllNacionalidadesDiretor = async function () {

    try {
        //Script SQL para buscar todos os registros do BD
        let sql = `select *from tbl_nacionalidades_diretor where id > 0;`

        /**
         * $queryRawUnsafe(sql)                 ----- Encaminha uma variável
         * $queryRaw('select*from tbl_nacionalidades_diretor')   ----- Encaminha direto o script
        */

        //Executa o scriptSQL no DB e guarda o retorno dos dados
        let rsNacionalidadesDiretor = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsNacionalidadesDiretor

    } catch (error) {
        return false
    }
}

const selectNacionalidadesDiretorById = async function (id) {

    try {
        //Script SQL para buscar todos os registros do BD
        let sql = `select *from tbl_nacionalidades_diretor where id = ${id};`

        /**
         * $queryRawUnsafe(sql)                 ----- Encaminha uma variável
         * $queryRaw('select*from tbl_nacionalidades_diretor')   ----- Encaminha direto o script
        */

        //Executa o scriptSQL no DB e guarda o retorno dos dados
        let rsNacionalidadesDiretor = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsNacionalidadesDiretor

    } catch (error) {
        return false
    }
}

const selectNacionalidadesDiretorByIdNacionalidade = async function (id) {

    try {
        //Script SQL para buscar todos os registros do BD
        let sql = `select *from tbl_nacionalidades_diretor where id_nacionalidade = ${id};`

        /**
         * $queryRawUnsafe(sql)                 ----- Encaminha uma variável
         * $queryRaw('select*from tbl_nacionalidades_diretor')   ----- Encaminha direto o script
        */

        //Executa o scriptSQL no DB e guarda o retorno dos dados
        let rsNacionalidadesDiretor = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsNacionalidadesDiretor

    } catch (error) {
        return false
    }
}

const selectNacionalidadesDiretorByIdDiretor = async function (id) {

    try {
        //Script SQL para buscar todos os registros do BD
        let sql = `select *from tbl_nacionalidades_diretor where id_diretor = ${id};`

        /**
         * $queryRawUnsafe(sql)                 ----- Encaminha uma variável
         * $queryRaw('select*from tbl_nacionalidades_diretor')   ----- Encaminha direto o script
        */

        //Executa o scriptSQL no DB e guarda o retorno dos dados
        let rsNacionalidadesDiretor = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsNacionalidadesDiretor

    } catch (error) {
        return false
    }
}

const selectLastIdNacionalidadesDiretor = async function () {

    try {
        //ScriptSQL para buscar um dos registros pelo id no BD
        let sql = `select cast(last_insert_id() as decimal) as id from tbl_nacionalidades_diretor limit 1`

        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let lastNacionalidadesDiretor = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        if (lastNacionalidadesDiretor) {
            return lastNacionalidadesDiretor
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

const insertNacionalidadesDiretor = async function (dadosNacionalidadesDiretor) {
    let sql

    try {
        //ScriptSQL para buscar um dos registros pelo nome no BD

        if (dadosNacionalidadesDiretor.id_diretor != undefined ||
            dadosNacionalidadesDiretor.id_diretor != null ||
            dadosNacionalidadesDiretor.id_diretor != '' &&
            dadosNacionalidadesDiretor.id_nacionalidade != undefined ||
            dadosNacionalidadesDiretor.id_nacionalidade != null ||
            dadosNacionalidadesDiretor.id_nacionalidade != '') {

            sql = `
                insert into tbl_nacionalidades_diretor (
                                                        id_diretor, 
                                                        id_nacionalidade
                                                    )values(
                                                            "${dadosNacionalidadesDiretor.id_diretor}", 
                                                            "${dadosNacionalidadesDiretor.id_nacionalidade}"
                                                    );
            `
        } else {

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

const updateNacionalidadesDiretor = async function (id, dadosNacionalidadesDiretorUpdate) {
    try {
        let sql = `UPDATE tbl_nacionalidades_diretor SET `
        const keys = Object.keys(dadosNacionalidadesDiretorUpdate)

        keys.forEach((key, index) => {
            sql += `${key} = '${dadosNacionalidadesDiretorUpdate[key]}'`
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

const deleteNacionalidadesDiretor = async function (id) {
    try {
        let sql = `delete from tbl_nacionalidades_diretor where id = ${id};`
        let result = await prisma.$executeRawUnsafe(sql)

        return result
    } catch (error) {
        return false
    }
}

const deleteNacionalidadesDiretorPorIdDiretor = async function (id) {
    try {
        let sql = `delete from tbl_nacionalidades_diretor where id_diretor = ${id};`
        let result = await prisma.$executeRawUnsafe(sql)

        return result
    } catch (error) {
        return false
    }
}

const deleteNacionalidadesDiretorPorIdNacionalidade = async function (id) {
    try {
        let sql = `delete from tbl_nacionalidades_diretor where id_nacionalidade = ${id};`
        let result = await prisma.$executeRawUnsafe(sql)

        return result
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllNacionalidadesDiretor,
    selectNacionalidadesDiretorByIdDiretor,
    selectNacionalidadesDiretorByIdNacionalidade,
    selectNacionalidadesDiretorById,
    selectLastIdNacionalidadesDiretor,
    insertNacionalidadesDiretor,
    updateNacionalidadesDiretor,
    deleteNacionalidadesDiretor,
    deleteNacionalidadesDiretorPorIdDiretor,
    deleteNacionalidadesDiretorPorIdNacionalidade
}