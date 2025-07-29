//import { openDb } from '../../backend/configDb.js'
import express from 'express'
import cors from 'cors'
import {
  createTable,
  inseriragenda,
  atualizaragenda,
  selecionaragenda,
  selecionaragendaById,
  excluiragenda,
} from './agenda.js'

import {
  createTarefasTable,
  inserirTarefa,
  atualizarTarefa,
  selecionarTarefas,
  selecionarTarefaById,
  excluirTarefa,
} from './tarefas.js'

const app = express()
app.use(express.json())
//const cors = require('cors')

// Configuração do CORS
const allowedOrigins = ['http://localhost:8080', 'https://denimalves.github.io']

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))

//openDb()

createTable()
createTarefasTable()

app.get('/', function (req, res) {
  res.send('Bem Vindo')
})

//inicio rotas de agendamentos
app.get('/agendamentos', async function (req, res) {
  let agenda = await selecionaragenda()
  res.json(agenda)
})

app.get('/agendamentos/:id', async function (req, res) {
  const id = req.params.id
  const agenda = await selecionaragendaById(id)
  res.json(agenda)
})

app.post('/agendamentos', function (req, res) {
  inseriragenda(req.body)
  res.json({ statusCode: 200 })
})

app.delete('/agendamentos/:id', async (req, res) => {
  const { id } = req.params
  await excluiragenda(id)
  res.json({ message: 'Removido com sucesso' })
})

app.put('/agendamentos/:id?', async function (req, res) {
  if (req.body && !req.body.id) {
    res.json({ statusCode: '400', msg: 'Voce precisa informar um id' })
  } else {
    await atualizaragenda(req.body)
    res.json({ statusCode: 200 })
  }
})
//fim das rotas de agendamentos

//rotas de tarefas
app.get('/tarefas', async (req, res) => {
  const tarefas = await selecionarTarefas()
  res.json(tarefas)
})

app.get('/tarefas/:id', async (req, res) => {
  const { id } = req.params
  const tarefa = await selecionarTarefaById(id)
  res.json(tarefa)
})

app.post('/tarefas', async (req, res) => {
  await inserirTarefa(req.body)
  res.json({ statusCode: 200 })
})

app.put('/tarefas/:id?', async (req, res) => {
  if (!req.body?.id) {
    res.json({ statusCode: 400, msg: 'Você precisa informar um id' })
  } else {
    await atualizarTarefa(req.body)
    res.json({ statusCode: 200 })
  }
})

app.delete('/tarefas/:id', async (req, res) => {
  const { id } = req.params
  await excluirTarefa(id)
  res.json({ message: 'Tarefa removida com sucesso' })
})
//fim das rotas de tarefas

export default app

app.listen(3000, () => console.log('API Rodando'))
