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
} from './controler/agenda.js'

const app = express()
app.use(express.json())
//const cors = require('cors')

// Configuração do CORS
const corsOptions = {
  origin: 'http://localhost:8080', // URL do seu frontend Quasar
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))

//openDb()

createTable()

app.get('/', function (req, res) {
  res.send('Bem Vindo')
})

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

export default app

app.listen(3000, () => console.log('API Rodando'))
