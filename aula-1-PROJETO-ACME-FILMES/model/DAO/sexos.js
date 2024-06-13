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

const selectAllSexos = async function () {
    
    try {
        let sql = "select *from tbl_sexo where id > 0;"

        let rsSexos = await prisma.$queryRawUnsafe(sql)
        
        return rsSexos
    } catch (error) {
        return false
    }
}

const selectByNameSexos = async function (sexo) {
    
    try {
        let sql = `select *from tbl_sexo where sexo LIKE '%${sexo}%';`

        let rsSexos = await prisma.$queryRawUnsafe(sql)
        
        return rsSexos
    } catch (error) {
        return false
    }
}

const selectLastSexo = async function () {
    
    try {
        let sql = `select cast(id as decimal) as id from tbl_sexo order by id desc limit 1;`

        let rsSexos = await prisma.$queryRawUnsafe(sql)
        
        return rsSexos
    } catch (error) {
        return false
    }
}

const insertSexos = async function (dadosSexo) {
    
    try {
        let sql = `
        insert into tbl_sexo  (
		                                    sexo
	                                    )values(
                                                "${dadosSexo.sexo}"
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

const deleteSexo = async function (id) {
    
    try {
        let sql = `delete from tbl_sexo where id = ${id};`

        let result = await prisma.$queryRawUnsafe(sql)
        
        return result
    } catch (error) {
        return false
    }
}

const selectByIdSexos = async function (id) {
    
    try {
        let sql = `select *from tbl_sexo where id = ${id};`

        let rsSexos = await prisma.$queryRawUnsafe(sql)
        
        return rsSexos
    } catch (error) {
        return false
    }
}

const updateSexos = async function (id, dadosSexosUpdate) {
    try {
        let sql = `UPDATE tbl_sexo SET `
        const keys = Object.keys(dadosSexosUpdate)

        keys.forEach((key, index) => {
            sql += `${key} = '${dadosSexosUpdate[key]}'`
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
    selectAllSexos,
    selectLastSexo,
    selectByIdSexos,
    selectByNameSexos,
    insertSexos,
    updateSexos,
    deleteSexo
}