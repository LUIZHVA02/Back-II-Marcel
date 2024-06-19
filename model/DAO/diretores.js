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

const selectLastIdDiretores = async function () {

    try {
        //ScriptSQL para buscar um dos registros pelo id no BD
        let sql = `select cast(last_insert_id() as decimal) as id from tbl_diretores limit 1`

        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let lastDiretor = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        if (lastDiretor) {
            return lastDiretor
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

//Função para excluir um Diretor no banco de dados
const insertDiretor = async function (dadosDiretor) {
    let sql

    try {
        //ScriptSQL para buscar um dos registros pelo nome no BD

        if (dadosDiretor.dt_falec == undefined ||
            dadosDiretor.dt_falec == null ||
            dadosDiretor.dt_falec == '' &&
            dadosDiretor.sobre == undefined ||
            dadosDiretor.sobre == null ||
            dadosDiretor.sobre == '') {

            sql = `
                insert into tbl_diretores  (
                                            nome, 
                                            foto_diretor, 
                                            dt_nasc,
                                            id_sexo
                                        )values(
                                                "${dadosDiretor.nome}", 
                                                "${dadosDiretor.foto_diretor}", 
                                                "${dadosDiretor.dt_nasc}",
                                                "${dadosDiretor.id_sexo}"
                                        );
            `
        }
        if (dadosDiretor.sobre == undefined ||
            dadosDiretor.sobre == null ||
            dadosDiretor.sobre == '') {

            sql = `
                insert into tbl_diretores  (
                                            nome, 
                                            foto_diretor, 
                                            dt_nasc,
                                            dt_falec,
                                            id_sexo
                                        )values(
                                                "${dadosDiretor.nome}", 
                                                "${dadosDiretor.foto_diretor}", 
                                                "${dadosDiretor.dt_nasc}",
                                                "${dadosDiretor.dt_falec}",
                                                "${dadosDiretor.id_sexo}"
                                        );
            `
        }
        if (dadosDiretor.dt_falec == undefined ||
            dadosDiretor.dt_falec == null ||
            dadosDiretor.dt_falec == '') {

            sql = `
                insert into tbl_diretores  (
                                            nome, 
                                            foto_diretor, 
                                            dt_nasc,
                                            sobre,
                                            id_sexo
                                        )values(
                                                "${dadosDiretor.nome}", 
                                                "${dadosDiretor.foto_diretor}", 
                                                "${dadosDiretor.dt_nasc}",
                                                "${dadosDiretor.sobre}",
                                                "${dadosDiretor.id_sexo}"
                                        );
            `
        } else {

            sql = `
                insert into tbl_diretores  (
                                            nome, 
                                            foto_diretor, 
                                            dt_nasc,
                                            dt_falec,
                                            sobre,
                                            id_sexo
                                        )values(
                                                "${dadosDiretor.nome}", 
                                                "${dadosDiretor.foto_diretor}", 
                                                "${dadosDiretor.dt_nasc}",
                                                "${dadosDiretor.dt_falec}",
                                                "${dadosDiretor.sobre}",
                                                "${dadosDiretor.id_sexo}"
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

//Função para atualizar um Diretor no banco de dados
const updateDiretor = async function (id, dadosDiretorUpdate) {
    try {
        let sql = `UPDATE tbl_diretores SET `
        const keys = Object.keys(dadosDiretorUpdate)

        keys.forEach((key, index) => {
            sql += `${key} = '${dadosDiretorUpdate[key]}'`
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

//Função para excluir um Diretor no banco de dados
const deleteDiretor = async function (id) {
    try {
        let sql = `delete from tbl_diretores where id = ${id};`
        let result = await prisma.$executeRawUnsafe(sql)

        return result
    } catch (error) {
        return false
    }
}

//Função para retornar todos os Diretores do banco de dados
const selectAllDiretores = async function () {

    try {
        //Script SQL para buscar todos os registros do BD
        let sql = `select tbl_diretores.id, tbl_diretores.nome, tbl_diretores.foto_diretor, tbl_diretores.dt_nasc, 
        tbl_diretores.dt_falec, tbl_diretores.sobre, tbl_diretores.id_sexo, tbl_sexo.sexo, tbl_nacionalidades_diretor.id_nacionalidade, 
			tbl_nacionalidades.nacionalidade, tbl_nacionalidades.pais_origem
				from tbl_sexo left join tbl_diretores on tbl_sexo.id = tbl_diretores.id_sexo 
					right join tbl_nacionalidades_diretor on tbl_diretores.id = tbl_nacionalidades_diretor.id_Diretor
						left join tbl_nacionalidades on tbl_nacionalidades.id = tbl_nacionalidades_diretor.id_nacionalidade 
							where tbl_diretores.id > 0 order by tbl_diretores.id;`

        /**
         * $queryRawUnsafe(sql)                 ----- Encaminha uma variável
         * $queryRaw('select*from tbl_Diretor')   ----- Encaminha direto o script
        */

        //Executa o scriptSQL no DB e guarda o retorno dos dados
        let rsDiretores = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsDiretores

    } catch (error) {
        return false
    }
}

const selectAllPhotoDiretores = async function () {

    try {
        //Script SQL para buscar todos os registros do BD
        let sql = 'select foto_diretor from tbl_diretores where id > 0;'

        /**
         * $queryRawUnsafe(sql)                 ----- Encaminha uma variável
         * $queryRaw('select*from tbl_diretores')   ----- Encaminha direto o script
        */

        //Executa o scriptSQL no DB e guarda o retorno dos dados
        let rsDiretores = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsDiretores

    } catch (error) {
        return false
    }
}

//Função para retornar um Diretor no banco de dados pelo id
const selectByIdDiretores = async function (id) {

    try {
        //ScriptSQL para buscar um dos registros pelo id no BD
        let sql = `select tbl_diretores.id, tbl_diretores.nome, tbl_diretores.foto_diretor, tbl_diretores.dt_nasc, 
        tbl_diretores.dt_falec, tbl_diretores.sobre, tbl_diretores.id_sexo, tbl_sexo.sexo, tbl_nacionalidades_diretor.id_nacionalidade, 
			tbl_nacionalidades.nacionalidade, tbl_nacionalidades.pais_origem
				from tbl_sexo left join tbl_diretores on tbl_sexo.id = tbl_diretores.id_sexo 
					right join tbl_nacionalidades_diretor on tbl_diretores.id = tbl_nacionalidades_diretor.id_Diretor
						left join tbl_nacionalidades on tbl_nacionalidades.id = tbl_nacionalidades_diretor.id_nacionalidade 
							where tbl_diretores.id = ${id}`

        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let rsDiretor = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsDiretor
    } catch (error) {
        return false
    }
}

//Função para retornar um Diretor no banco de dados pelo id
const selectByNameDiretores = async function (nome) {

    try {
        //ScriptSQL para buscar um dos registros pelo nome no BD
        let sql = `select tbl_diretores.id, tbl_diretores.nome, tbl_sexo.sexo, tbl_diretores.foto_diretor, 
        tbl_diretores.dt_nasc, tbl_diretores.dt_falec, tbl_diretores.sobre, tbl_nacionalidades.nacionalidade, tbl_nacionalidades.pais_origem
				from tbl_sexo left join tbl_diretores on tbl_sexo.id = tbl_diretores.id_sexo 
					inner join tbl_nacionalidades_diretor on tbl_diretores.id = tbl_nacionalidades_diretor.id_Diretor
						inner join tbl_nacionalidades on tbl_nacionalidades.id = tbl_nacionalidades_diretor.id_nacionalidade 
							where nome like '%${nome}%';`

        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let rsDiretor = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsDiretor
    } catch (error) {
        return false
    }
}

module.exports = {
    insertDiretor,
    updateDiretor,
    deleteDiretor,
    selectAllDiretores,
    selectByIdDiretores,
    selectByNameDiretores,
    selectLastIdDiretores,
    selectAllPhotoDiretores
}