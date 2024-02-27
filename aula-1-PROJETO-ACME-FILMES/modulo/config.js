/*************************************************************************
 * Objetivo: Arquivo responsável pelas variáveis globais do projeto, 
 * onde haverão mensagens, status_codes e outros conteúdos para o projeto
 * Data: 20/02/2024
 * Autor: Luiz Henrique Vidal Araujo
 * Versão: 1.0
 *************************************************************************/

/**********************Mensagens de Erro do Projeto**********************/
const ERROR_INVALID_ID = {status: false, status_code: 400, message: 'O ID encaminhado na requisição não é válido!!!'}

const ERROR_BAD_REQUEST = {status: false, status_code: 400, message: 'As informações encaminhadas na requisição não são válidas!!!'}

const ERROR_INVALID_NAME_ENTER = {status: false, status_code: 400, message: 'O Nome encaminhado na requisição não é válido!!!'}

const ERROR_NOT_FOUND = {status: false, status_code: 404, message: 'Nenhum item encontrado na requisição!!!'}

const INTERNAL_SERVER_ERROR_DB = {status: false, status_code: 500, message: 'Ocorreram Erros no processamento do Banco de Dados. Contate o Administrador da API!!!'}


module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    INTERNAL_SERVER_ERROR_DB,
    ERROR_INVALID_NAME_ENTER,
    ERROR_BAD_REQUEST
}