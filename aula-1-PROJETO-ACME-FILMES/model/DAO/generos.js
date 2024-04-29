/*********************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD no
 * banco de dados MySQL
 * Data: 29/04/2024
 * Autor: Luiz Henrique Vidal
 * Versão: 1.0 
 ********************************************************/

//Import da biblioteca do prisma cliente
const { PrismaClient } = require('@prisma/client')

//Instânciando a classe do PrismaCliente
const prisma = new PrismaClient()

const selectAllGeneros = async function () {
    
    try {
        let sql = "select *from tbl_generos where id > 0;"

        let rsGeneros = await prisma.$queryRawUnsafe(sql)
        
        return rsGeneros
    } catch (error) {
        return false
    }
}

const selectByNameGeneros = async function (nome) {
    
    try {
        let sql = `select *from tbl_generos where nome LIKE '%${nome}%';`

        let rsGeneros = await prisma.$queryRawUnsafe(sql)
        
        return rsGeneros
    } catch (error) {
        return false
    }
}

const selectLastGenero = async function () {
    
    try {
        let sql = `select cast(id as decimal) as id from tbl_generos order by id desc limit 1;`

        let rsGeneros = await prisma.$queryRawUnsafe(sql)
        
        return rsGeneros
    } catch (error) {
        return false
    }
}

const insertGeneros = async function (dadosGenero) {
    
    try {
        let sql = `
        insert into tbl_generos  (
		                                    nome
	                                    )values(
                                                "${dadosGenero.nome}"
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

const deleteGenero = async function (id) {
    
    try {
        let sql = `delete from tbl_generos where id = ${id};`

        let result = await prisma.$queryRawUnsafe(sql)
        
        return result
    } catch (error) {
        return false
    }
}

const selectByIdGeneros = async function (id) {
    
    try {
        let sql = `select *from tbl_generos where id = ${id};`

        let rsGeneros = await prisma.$queryRawUnsafe(sql)
        
        return rsGeneros
    } catch (error) {
        return false
    }
}

const updateGeneros = async function (id, dadosGenerosUpdate) {
    try {
        let sql = `UPDATE tbl_generos SET `
        const keys = Object.keys(dadosGenerosUpdate)

        keys.forEach((key, index) => {
            sql += `${key} = '${dadosGenerosUpdate[key]}'`
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
    selectAllGeneros,
    selectLastGenero,
    selectByIdGeneros,
    selectByNameGeneros,
    insertGeneros,
    updateGeneros,
    deleteGenero
}