const moment = require('moment')
const axios = require('axios')

const baseUrl = 'http://localhost:3001/tarefas'

const getAgenda = async (data) => {
    const url = `${baseUrl}?_sort=dt_previsao,descricao&_order=asc`
    const response = await axios.get(url)
    const pendente = item => item.dt_conclusao === null
        && moment(item.dt_previsao).isSameOrBefore(data)
    return response.data.filter(pendente)
}

const getTarefa = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const getTarefas = async () => {
    const response = await axios.get(`${baseUrl}?_sort=descricao&_order=asc`)
    return response.data.filter(item => item.dt_previsao === null && item.dt_conclusao === null)
}

const getConcluidas = async () => {
    const response = await axios.get(`${baseUrl}?_sort=dt_previsao,descricao&_order=asc`)
    return response.data.filter(item => item.dt_conclusao !== null)
}

const incluirTarefa = async (desc) => {
    const response = await axios.post(`${baseUrl}`, { descricao: desc, dt_previsao: null, dt_conclusao: null, observacao: null })
    return response.data
}

const concluirTarefa = async (id) => {
    const tarefa = await getTarefa(id)
    const response = await axios.put(`${baseUrl}/${id}`, { ...tarefa, dt_conclusao: moment().format('YYYY-MM-DD') })
    return response.data
}

const excluirTarefa = async (id) => {
    await axios.delete(`${baseUrl}/${id}`)
}

const atualizarDataTarefa = async (idTarefa, data) => {
    const tarefa = await getTarefa(idTarefa)
    const response = await axios.put(`${baseUrl}/${idTarefa}`,
        { ...tarefa, dt_previsao: data.format('YYYY-MM-DD') })
    return response.data
}

const atualizarObsTarefa = async (idTarefa, obs) => {
    const tarefa = await getTarefa(idTarefa)
    const response = await axios.put(`${baseUrl}/${idTarefa}`,
        { ...tarefa, observacao: obs })
    return response.data
}

module.exports = {
    getAgenda,
    getTarefa,
    getTarefas,
    getConcluidas,
    incluirTarefa,
    concluirTarefa,
    excluirTarefa,
    atualizarDataTarefa,
    atualizarObsTarefa
}