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

const selectAllNacionalidadesAtor = async function () {

    try {
        //Script SQL para buscar todos os registros do BD
        let sql = `select *from tbl_nacionalidades_ator where id > 0;`

        /**
         * $queryRawUnsafe(sql)                 ----- Encaminha uma variável
         * $queryRaw('select*from tbl_nacionalidades_ator')   ----- Encaminha direto o script
        */

        //Executa o scriptSQL no DB e guarda o retorno dos dados
        let rsNacionalidadesAtor = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsNacionalidadesAtor

    } catch (error) {
        return false
    }
}

const selectNacionalidadesAtorById = async function (id) {

    try {
        //Script SQL para buscar todos os registros do BD
        let sql = `select *from tbl_nacionalidades_ator where id = ${id};`

        /**
         * $queryRawUnsafe(sql)                 ----- Encaminha uma variável
         * $queryRaw('select*from tbl_nacionalidades_ator')   ----- Encaminha direto o script
        */

        //Executa o scriptSQL no DB e guarda o retorno dos dados
        let rsNacionalidadesAtor = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsNacionalidadesAtor

    } catch (error) {
        return false
    }
}

const selectNacionalidadesAtorByIdNacionalidade = async function (id) {

    try {
        //Script SQL para buscar todos os registros do BD
        let sql = `select *from tbl_nacionalidades_ator where id_nacionalidade = ${id};`

        /**
         * $queryRawUnsafe(sql)                 ----- Encaminha uma variável
         * $queryRaw('select*from tbl_nacionalidades_ator')   ----- Encaminha direto o script
        */

        //Executa o scriptSQL no DB e guarda o retorno dos dados
        let rsNacionalidadesAtor = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsNacionalidadesAtor

    } catch (error) {
        return false
    }
}

const selectNacionalidadesAtorByIdAtorIdNacionalidade = async function (id_ator, id_nacionalidade) {

    try {
        //Script SQL para buscar todos os registros do BD
        let sql = `select *from tbl_nacionalidades_ator where id_ator = ${id_ator} and id_nacionalidade = ${id_nacionalidade};`

        /**
         * $queryRawUnsafe(sql)                 ----- Encaminha uma variável
         * $queryRaw('select*from tbl_nacionalidades_ator')   ----- Encaminha direto o script
        */

        //Executa o scriptSQL no DB e guarda o retorno dos dados
        let rsNacionalidadesAtor = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsNacionalidadesAtor

    } catch (error) {
        return false
    }
}

const selectNacionalidadesAtorByIdAtor = async function (id) {

    try {
        //Script SQL para buscar todos os registros do BD
        let sql = `select *from tbl_nacionalidades_ator where id_ator = ${id};`

        /**
         * $queryRawUnsafe(sql)                 ----- Encaminha uma variável
         * $queryRaw('select*from tbl_nacionalidades_ator')   ----- Encaminha direto o script
        */

        //Executa o scriptSQL no DB e guarda o retorno dos dados
        let rsNacionalidadesAtor = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsNacionalidadesAtor

    } catch (error) {
        return false
    }
}

const selectLastIdNacionalidadesAtor = async function () {

    try {
        //ScriptSQL para buscar um dos registros pelo id no BD
        let sql = `select cast(last_insert_id() as decimal) as id from tbl_nacionalidades_ator limit 1`

        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let lastNacionalidadesAtor = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        if (lastNacionalidadesAtor) {
            return lastNacionalidadesAtor
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

const insertNacionalidadesAtor = async function (dadosNacionalidadesAtor) {
    let sql

    try {
        //ScriptSQL para buscar um dos registros pelo nome no BD

        if (dadosNacionalidadesAtor.id_ator != undefined ||
            dadosNacionalidadesAtor.id_ator != null ||
            dadosNacionalidadesAtor.id_ator != '' &&
            dadosNacionalidadesAtor.id_nacionalidade != undefined ||
            dadosNacionalidadesAtor.id_nacionalidade != null ||
            dadosNacionalidadesAtor.id_nacionalidade != '') {

            sql = `
                insert into tbl_nacionalidades_ator (
                                                        id_ator, 
                                                        id_nacionalidade
                                                    )values(
                                                            "${dadosNacionalidadesAtor.id_ator}", 
                                                            "${dadosNacionalidadesAtor.id_nacionalidade}"
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

const updateNacionalidadesAtor = async function (idNacionalidadesAtor, dadosNacionalidadesAtorUpdate) {
    try {
        let sql = `UPDATE tbl_nacionalidades_ator SET `
        const keys = Object.keys(dadosNacionalidadesAtorUpdate)

        keys.forEach((key, index) => {
            sql += `${key} = '${dadosNacionalidadesAtorUpdate[key]}'`
            if (index !== keys.length - 1) {
                sql += `, `
            }
        })

        sql += ` WHERE id = ${idNacionalidadesAtor}`

        let result = await prisma.$executeRawUnsafe(sql)

        return result
    } catch (error) {
        console.log(error)
        return false
    }

}

const deleteNacionalidadesAtor = async function (id) {
    try {
        let sql = `delete from tbl_nacionalidades_ator where id = ${id};`
        let result = await prisma.$executeRawUnsafe(sql)

        return result
    } catch (error) {
        return false
    }
}

const deleteNacionalidadesAtorPorIdAtor = async function (id) {
    try {
        let sql = `delete from tbl_nacionalidades_ator where id_ator = ${id};`
        let result = await prisma.$executeRawUnsafe(sql)

        return result
    } catch (error) {
        return false
    }
}

const deleteNacionalidadesAtorPorIdNacionalidade = async function (id) {
    try {
        let sql = `delete from tbl_nacionalidades_ator where id_nacionalidade = ${id};`
        let result = await prisma.$executeRawUnsafe(sql)

        return result
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllNacionalidadesAtor,
    selectNacionalidadesAtorByIdAtor,
    selectNacionalidadesAtorByIdNacionalidade,
    selectNacionalidadesAtorByIdAtorIdNacionalidade,
    selectNacionalidadesAtorById,
    selectLastIdNacionalidadesAtor,
    insertNacionalidadesAtor,
    updateNacionalidadesAtor,
    deleteNacionalidadesAtor,
    deleteNacionalidadesAtorPorIdAtor,
    deleteNacionalidadesAtorPorIdNacionalidade
}