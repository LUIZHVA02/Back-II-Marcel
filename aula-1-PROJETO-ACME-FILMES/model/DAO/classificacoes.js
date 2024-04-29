/*********************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD no
 * banco de dados MySQL
 * Data: 23/04/2024
 * Autor: Luiz Henrique Vidal
 * Versão: 1.0 
 ********************************************************/

//Import da biblioteca do prisma cliente
const { PrismaClient } = require('@prisma/client')

//Instânciando a classe do PrismaCliente
const prisma = new PrismaClient()

const selectAllClassificacoes = async function () {
    
    try {
        let sql = "select *from tbl_classificacoes where id > 0;"

        let rsClassificacoes = await prisma.$queryRawUnsafe(sql)
        
        return rsClassificacoes
    } catch (error) {
        return false
    }
}

const selectLastClassificacao = async function () {
    
    try {
        let sql = `select cast(id as decimal) as id from tbl_classificacoes order by id desc limit 1;`

        let rsClassificacoes = await prisma.$queryRawUnsafe(sql)
        
        return rsClassificacoes
    } catch (error) {
        return false
    }
}

const insertClassificacao = async function (dadosClassificacao) {
    
    try {
        let sql = `
        insert into tbl_classificacoes  (
		                                    sigla,
                                            classificacao,
                                            legenda
	                                    )values(
                                                "${dadosClassificacao.sigla}",
                                                "${dadosClassificacao.classificacao}",
                                                "${dadosClassificacao.legenda}"
	                                    );`
        
        let result = await prisma.$queryRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const deleteClassificacao = async function (id) {
    
    try {
        let sql = `delete from tbl_classificacoes where id = ${id};`

        let result = await prisma.$queryRawUnsafe(sql)
        
        return result
    } catch (error) {
        return false
    }
}

const selectByIdClassificacoes = async function (id) {
    
    try {
        let sql = `select *from tbl_classificacoes where id = ${id};`

        let rsClassificacoes = await prisma.$queryRawUnsafe(sql)
        
        return rsClassificacoes
    } catch (error) {
        return false
    }
}

const selectBySiglaClassificacao = async function (sigla) {

    try {
        let sql = `select * from tbl_classificacoes where sigla like '%${sigla}%';`

        let rsClassificacao = await prisma.$queryRawUnsafe(sql)

        return rsClassificacao
    } catch (error) {
        return false
    }
}

const selectByLegendaClassificacao = async function (legenda) {

    try {
        let sql = `select* from tbl_classificacoes where legenda like '%${legenda}%';`

        let rsClassificacao = await prisma.$queryRawUnsafe(sql)

        return rsClassificacao
    } catch (error) {
        return false
    }
}

const updateClassificacoes = async function (id, dadosClassificacoesUpdate) {
    try {
        let sql = `UPDATE tbl_Classificacoes SET `
        const keys = Object.keys(dadosClassificacoesUpdate)

        keys.forEach((key, index) => {
            sql += `${key} = '${dadosClassificacoesUpdate[key]}'`
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

module.exports = {
    selectAllClassificacoes,
    selectLastClassificacao,
    selectByIdClassificacoes,
    insertClassificacao,
    deleteClassificacao,
    selectBySiglaClassificacao,
    selectByLegendaClassificacao,
    updateClassificacoes
}