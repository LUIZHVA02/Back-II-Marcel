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

const selectAllNacionalidades = async function () {
    
    try {
        let sql = "select *from tbl_nacionalidades where id > 0;"

        let rsNacionalidades = await prisma.$queryRawUnsafe(sql)
        
        return rsNacionalidades
    } catch (error) {
        return false
    }
}

const selectByNameNacionalidades = async function (nacionalidade) {
    
    try {
        let sql = `select *from tbl_nacionalidades where nacionalidade LIKE '%${nacionalidade}%';`

        let rsNacionalidades = await prisma.$queryRawUnsafe(sql)
        
        return rsNacionalidades
    } catch (error) {
        return false
    }
}

const selectByNamePaisOrigem = async function (nacionalidade) {
    
    try {
        let sql = `select *from tbl_nacionalidades where pais_origem LIKE '%${nacionalidade}%';`

        let rsNacionalidades = await prisma.$queryRawUnsafe(sql)
        
        return rsNacionalidades
    } catch (error) {
        return false
    }
}

const selectLastNacionalidade = async function () {
    
    try {
        let sql = `select cast(id as decimal) as id from tbl_nacionalidades order by id desc limit 1;`

        let rsNacionalidades = await prisma.$queryRawUnsafe(sql)
        
        return rsNacionalidades
    } catch (error) {
        return false
    }
}

const insertNacionalidades = async function (dadosNacionalidade) {
    
    try {
        let sql = `
        insert into tbl_nacionalidades  (
                                            pais_origem,
		                                    nacionalidade
	                                    )values(
                                                "${dadosNacionalidade.pais_origem}",
                                                "${dadosNacionalidade.nacionalidade}"
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

const deleteNacionalidade = async function (id) {
    
    try {
        let sql = `delete from tbl_nacionalidades where id = ${id};`

        let result = await prisma.$queryRawUnsafe(sql)
        
        return result
    } catch (error) {
        return false
    }
}

const selectByIdNacionalidades = async function (id) {
    
    try {
        let sql = `select *from tbl_nacionalidades where id = ${id};`

        let rsNacionalidades = await prisma.$queryRawUnsafe(sql)
        
        return rsNacionalidades
    } catch (error) {
        return false
    }
}

const updateNacionalidades = async function (id, dadosNacionalidadesUpdate) {
    try {
        let sql = `UPDATE tbl_nacionalidades SET `
        const keys = Object.keys(dadosNacionalidadesUpdate)

        keys.forEach((key, index) => {
            sql += `${key} = '${dadosNacionalidadesUpdate[key]}'`
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
    selectAllNacionalidades,
    selectLastNacionalidade,
    selectByIdNacionalidades,
    selectByNameNacionalidades,
    selectByNamePaisOrigem,
    insertNacionalidades,
    updateNacionalidades,
    deleteNacionalidade
}