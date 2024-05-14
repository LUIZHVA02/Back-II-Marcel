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

const selectLastIdAtores = async function () {

    try {
        //ScriptSQL para buscar um dos registros pelo id no BD
        let sql = `select cast(last_insert_id() as decimal) as id from tbl_atores limit 1`

        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let lastAtor = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        if (lastAtor) {
            return lastAtor
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

//Função para excluir um Ator no banco de dados
const insertAtor = async function (dadosAtor) {
    let sql

    try {
        //ScriptSQL para buscar um dos registros pelo nome no BD

        if (dadosAtor.dt_falec == undefined ||
            dadosAtor.dt_falec == null ||
            dadosAtor.dt_falec == '' &&
            dadosAtor.sobre == undefined ||
            dadosAtor.sobre == null ||
            dadosAtor.sobre == '') {

            sql = `
                insert into tbl_atores  (
                                            nome, 
                                            foto_ator, 
                                            dt_nasc,
                                            id_sexo
                                        )values(
                                                "${dadosAtor.nome}", 
                                                "${dadosAtor.foto_ator}", 
                                                "${dadosAtor.dt_nasc}",
                                                "${dadosAtor.id_sexo}"
                                        );
            `
        }
        if (dadosAtor.sobre == undefined ||
            dadosAtor.sobre == null ||
            dadosAtor.sobre == '') {

            sql = `
                insert into tbl_atores  (
                                            nome, 
                                            foto_ator, 
                                            dt_nasc,
                                            dt_falec,
                                            id_sexo
                                        )values(
                                                "${dadosAtor.nome}", 
                                                "${dadosAtor.foto_ator}", 
                                                "${dadosAtor.dt_nasc}",
                                                "${dadosAtor.dt_falec}",
                                                "${dadosAtor.id_sexo}"
                                        );
            `
        }
        if (dadosAtor.dt_falec == undefined ||
            dadosAtor.dt_falec == null ||
            dadosAtor.dt_falec == '') {

            sql = `
                insert into tbl_atores  (
                                            nome, 
                                            foto_ator, 
                                            dt_nasc,
                                            sobre,
                                            id_sexo
                                        )values(
                                                "${dadosAtor.nome}", 
                                                "${dadosAtor.foto_ator}", 
                                                "${dadosAtor.dt_nasc}",
                                                "${dadosAtor.sobre}",
                                                "${dadosAtor.id_sexo}"
                                        );
            `
        } else {

            sql = `
                insert into tbl_atores  (
                                            nome, 
                                            foto_ator, 
                                            dt_nasc,
                                            dt_falec,
                                            sobre,
                                            id_sexo
                                        )values(
                                                "${dadosAtor.nome}", 
                                                "${dadosAtor.foto_ator}", 
                                                "${dadosAtor.dt_nasc}",
                                                "${dadosAtor.dt_falec}",
                                                "${dadosAtor.sobre}",
                                                "${dadosAtor.id_sexo}"
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

//Função para atualizar um Ator no banco de dados
const updateAtor = async function (id, dadosAtorUpdate) {
    try {
        let sql = `UPDATE tbl_atores SET `
        const keys = Object.keys(dadosAtorUpdate)

        keys.forEach((key, index) => {
            sql += `${key} = '${dadosAtorUpdate[key]}'`
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

//Função para excluir um Ator no banco de dados
const deleteAtor = async function (id) {
    try {
        let sql = `delete from tbl_atores where id = ${id};`
        let result = await prisma.$executeRawUnsafe(sql)

        return result
    } catch (error) {
        return false
    }
}

//Função para retornar todos os Atores do banco de dados
const selectAllAtores = async function () {

    try {
        //Script SQL para buscar todos os registros do BD
        let sql = `select tbl_atores.id, tbl_atores.nome, tbl_atores.foto_ator, tbl_atores.dt_nasc, 
        tbl_atores.dt_falec, tbl_atores.sobre, tbl_sexo.sexo, tbl_nacionalidades_ator.id_nacionalidade, 
			tbl_nacionalidades.nacionalidade, tbl_nacionalidades.pais_origem
				from tbl_sexo left join tbl_atores on tbl_sexo.id = tbl_atores.id_sexo 
					inner join tbl_nacionalidades_ator on tbl_atores.id = tbl_nacionalidades_ator.id_ator
						inner join tbl_nacionalidades on tbl_nacionalidades.id = tbl_nacionalidades_ator.id_nacionalidade 
							where tbl_atores.id > 0 order by tbl_atores.id;`

        /**
         * $queryRawUnsafe(sql)                 ----- Encaminha uma variável
         * $queryRaw('select*from tbl_Ator')   ----- Encaminha direto o script
        */

        //Executa o scriptSQL no DB e guarda o retorno dos dados
        let rsAtores = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsAtores

    } catch (error) {
        return false
    }
}

const selectAllPhotoAtores = async function () {

    try {
        //Script SQL para buscar todos os registros do BD
        let sql = 'select foto_ator from tbl_atores where id > 0;'

        /**
         * $queryRawUnsafe(sql)                 ----- Encaminha uma variável
         * $queryRaw('select*from tbl_atores')   ----- Encaminha direto o script
        */

        //Executa o scriptSQL no DB e guarda o retorno dos dados
        let rsAtores = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsAtores

    } catch (error) {
        return false
    }
}

//Função para retornar um Ator no banco de dados pelo id
const selectByIdAtores = async function (id) {

    try {
        //ScriptSQL para buscar um dos registros pelo id no BD
        let sql = `select tbl_atores.id, tbl_atores.nome, tbl_sexo.sexo, tbl_atores.foto_ator, 
        tbl_atores.dt_nasc, tbl_atores.dt_falec, tbl_atores.sobre, tbl_nacionalidades.nacionalidade, tbl_nacionalidades.pais_origem
				from tbl_sexo left join tbl_atores on tbl_sexo.id = tbl_atores.id_sexo 
					inner join tbl_nacionalidades_ator on tbl_atores.id = tbl_nacionalidades_ator.id_ator
						inner join tbl_nacionalidades on tbl_nacionalidades.id = tbl_nacionalidades_ator.id_nacionalidade 
							where tbl_atores.id = ${id}`

        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let rsAtor = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsAtor
    } catch (error) {
        return false
    }
}

//Função para retornar um Ator no banco de dados pelo id
const selectByNameAtores = async function (nome) {

    try {
        //ScriptSQL para buscar um dos registros pelo nome no BD
        let sql = `select tbl_atores.id, tbl_atores.nome, tbl_sexo.sexo, tbl_atores.foto_ator, 
        tbl_atores.dt_nasc, tbl_atores.dt_falec, tbl_atores.sobre, tbl_nacionalidades.nacionalidade, tbl_nacionalidades.pais_origem
				from tbl_sexo left join tbl_atores on tbl_sexo.id = tbl_atores.id_sexo 
					inner join tbl_nacionalidades_ator on tbl_atores.id = tbl_nacionalidades_ator.id_ator
						inner join tbl_nacionalidades on tbl_nacionalidades.id = tbl_nacionalidades_ator.id_nacionalidade 
							where nome like '%${nome}%';`

        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let rsAtor = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsAtor
    } catch (error) {
        return false
    }
}

module.exports = {
    insertAtor,
    updateAtor,
    deleteAtor,
    selectAllAtores,
    selectByIdAtores,
    selectByNameAtores,
    selectLastIdAtores,
    selectAllPhotoAtores
}