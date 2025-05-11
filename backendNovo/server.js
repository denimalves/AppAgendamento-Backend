import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import sequelize from './index.js'
import Agendamento from './agendamento.js'

const app = express()
const PORT = 3000

app.use(cors())
app.use(bodyParser.json())

// Conectar ao banco e sincronizar modelo
try {
  await sequelize.sync()
  console.log('Modelos sincronizados com o banco de dados')
} catch (error) {
  console.error('Erro ao sincronizar com o banco:', error)
}

// ROTAS CRUD

// 🔹 Criar um novo agendamento
app.post('/agendamentos', async (req, res) => {
  try {
    const novo = await Agendamento.create(req.body)
    res.status(201).json(novo)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// 🔹 Listar todos os agendamentos
app.get('/agendamentos', async (req, res) => {
  try {
    const lista = await Agendamento.findAll()
    res.json(lista)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 🔹 Buscar um agendamento por ID
app.get('/agendamentos/:id', async (req, res) => {
  try {
    const item = await Agendamento.findByPk(req.params.id)
    if (!item) return res.status(404).json({ error: 'Agendamento não encontrado' })
    res.json(item)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 🔹 Atualizar um agendamento por ID
app.put('/agendamentos/:id', async (req, res) => {
  try {
    const item = await Agendamento.findByPk(req.params.id)
    if (!item) return res.status(404).json({ error: 'Agendamento não encontrado' })
    await item.update(req.body)
    res.json(item)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// 🔹 Deletar um agendamento por ID
app.delete('/agendamentos/:id', async (req, res) => {
  try {
    const item = await Agendamento.findByPk(req.params.id)
    if (!item) return res.status(404).json({ error: 'Agendamento não encontrado' })
    await item.destroy()
    res.sendStatus(204)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
