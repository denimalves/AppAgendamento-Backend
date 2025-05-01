import { openDb } from '../configDb.js'

export async function createTable() {
  const db = await openDb()
  await db.exec(
    'CREATE TABLE IF NOT EXISTS Agendamentos (id INTEGER PRIMARY KEY, data TEXT, evento TEXT)',
  )
}

export async function inseriragenda(agendamentos) {
  const db = await openDb()
  await db.run('INSERT INTO Agendamentos (data, evento) VALUES (?,?)', [
    agendamentos.data,
    agendamentos.evento,
  ])
}

export async function atualizaragenda(agendamentos) {
  const db = await openDb()
  await db.run('UPDATE Agendamentos SET data=?, evento=? WHERE ID=?', [
    agendamentos.data,
    agendamentos.evento,
    agendamentos.id,
  ])
}

export async function excluiragenda(id) {
  const db = await openDb()
  const resultado = await db.run('DELETE FROM Agendamentos WHERE ID=?', [id])
  return resultado
}

export async function selecionaragenda() {
  const db = await openDb()
  const agendamentos = await db.all('SELECT * FROM Agendamentos')
  return agendamentos
}

export async function selecionaragendaById(id) {
  const db = await openDb()
  const agendamento = await db.get('SELECT * FROM Agendamentos WHERE id = ?', [id])
  return agendamento
}
