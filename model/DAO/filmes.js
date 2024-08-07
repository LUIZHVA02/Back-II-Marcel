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

const caractereAntigo = "'"
const caractereNovo = "|"

const selectLastIdFilmes = async function () {

    try {
        //ScriptSQL para buscar um dos registros pelo id no BD
        let sql = `select cast(last_insert_id() as decimal) as id from tbl_filmes limit 1`

        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let lastFilme = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        if (lastFilme) {
            return lastFilme
        } else {
            return false
        }

    } catch (error) {
        console.log(error);
        return false
    }
}

//Função para excluir um filme no banco de dados
const insertFilme = async function (dadosFilme) {
    let sql

    let nome = dadosFilme.nome
    let sinopse = dadosFilme.sinopse
    let duracao = dadosFilme.duracao
    let data_lancamento = dadosFilme.data_lancamento
    let data_relancamento = dadosFilme.data_relancamento
    let foto_capa = dadosFilme.foto_capa
    let valor_unitario = parseFloat(dadosFilme.valor_unitario)
    let id_classificacao = dadosFilme.id_classificacao

    try {
        //ScriptSQL para buscar um dos registros pelo nome no BD

        if (data_relancamento == undefined ||
            data_relancamento == null ||
            data_relancamento == '') {

            sql = `
                insert into tbl_filmes  (
                                            nome, 
                                            sinopse, 
                                            duracao, 
                                            data_lancamento,
                                            foto_capa, 
                                            valor_unitario,
                                            id_classificacao
                                        )values(
                                                replace("${nome}","${caractereAntigo}","${caractereNovo}"),
                                                replace("${sinopse}","${caractereAntigo}","${caractereNovo}"),
                                                "${duracao}", 
                                                "${data_lancamento}",
                                                "${foto_capa}", 
                                                "${valor_unitario}",
                                                "${id_classificacao}"
                                );
            `
            console.log(valor_unitario, dadosFilme.valor_unitario);
        } else {
            sql = `
                insert into tbl_filmes  (
                                            nome, 
                                            sinopse, 
                                            duracao, 
                                            data_lancamento, 
                                            data_relancamento, 
                                            foto_capa, 
                                            valor_unitario,
                                            id_classificacao
                                        )values(
                                            replace("${nome}","${caractereAntigo}","${caractereNovo}"),
                                            replace("${sinopse}","${caractereAntigo}","${caractereNovo}"),
                                                "${duracao}", 
                                                "${data_lancamento}", 
                                                "${data_relancamento}", 
                                                "${foto_capa}", 
                                                "${valor_unitario}",
                                                "${id_classificacao}"
                                        );
                `
                console.log(valor_unitario, dadosFilme.valor_unitario);

        }
        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let result = await prisma.$executeRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false

        if (result) {
            return true
        } else {
            console.log(result);
            return false
        }

    } catch (error) {
        console.log(error);
        return false
    }
}

//Função para atualizar um filme no banco de dados
const updateFilme = async function (id, dadosFilmeUpdate) {
    try {
        let sql = `UPDATE tbl_filmes SET `
        const keys = Object.keys(dadosFilmeUpdate)

        keys.forEach((key, index) => {
            sql += `${key} = '${dadosFilmeUpdate[key]}'`
            if (index !== keys.length - 1) {
                sql += `, `
            }
        })

        sql += ` WHERE id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        return result
    } catch (error) {
        console.log(error);
        return false
    }

}

//Função para excluir um filme no banco de dados
const deleteFilme = async function (id) {
    try {
        let sql = `delete from tbl_filmes where id = ${id};`
        let result = await prisma.$executeRawUnsafe(sql)

        return result
    } catch (error) {
        console.log(error);
        return false
    }
}

//Função para retornar todos os filmes do banco de dados
const selectAllFilmes = async function () {

    try {
        //Script SQL para buscar todos os registros do BD
        let sql = `select tbl_filmes.id, 
        replace(tbl_filmes.nome,"${caractereNovo}","${caractereAntigo}") as nome,
        replace(tbl_filmes.sinopse,"${caractereNovo}","${caractereAntigo}") as sinopse,tbl_filmes.duracao, 
		tbl_filmes.data_lancamento, tbl_filmes.data_relancamento, tbl_filmes.foto_capa, 
			tbl_filmes.valor_unitario, tbl_classificacoes.sigla, tbl_classificacoes.classificacao, 
				tbl_classificacoes.legenda, tbl_classificacoes.imagem from tbl_filmes left join tbl_classificacoes 
					on tbl_filmes.id_classificacao = tbl_classificacoes.id where tbl_filmes.id > 0;`

        /**
         * $queryRawUnsafe(sql)                 ----- Encaminha uma variável
         * $queryRaw('select*from tbl_filme')   ----- Encaminha direto o script
        */

        //Executa o scriptSQL no DB e guarda o retorno dos dados
        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsFilmes

    } catch (error) {
        console.log(error);
        return false
    }
}

const selectAllPhotoFilmes = async function () {

    try {
        //Script SQL para buscar todos os registros do BD
        let sql = 'select foto_capa from tbl_filmes where id > 0;'

        /**
         * $queryRawUnsafe(sql)                 ----- Encaminha uma variável
         * $queryRaw('select*from tbl_filme')   ----- Encaminha direto o script
        */

        //Executa o scriptSQL no DB e guarda o retorno dos dados
        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsFilmes

    } catch (error) {
        console.log(error);
        return false
    }
}

//Função para retornar um filme no banco de dados pelo id
const selectByIdFilmes = async function (id) {

    try {
        //ScriptSQL para buscar um dos registros pelo id no BD
        let sql = `select* from tbl_filmes where id = ${id}`

        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let rsFilme = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsFilme
    } catch (error) {
        console.log(error);
        return false
    }
}

//Função para retornar um filme no banco de dados pelo id
const selectByNameFilmes = async function (nome) {

    try {
        //ScriptSQL para buscar um dos registros pelo nome no BD
        let sql = `select* from tbl_filmes where nome like '%${nome}%';`

        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let rsFilme = await prisma.$queryRawUnsafe(sql)

        //Validação para retornar os dados ou retornar false
        return rsFilme
    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilmes,
    selectByNameFilmes,
    selectLastIdFilmes,
    selectAllPhotoFilmes
}