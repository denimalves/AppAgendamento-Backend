import { openTarefasDb } from './configTarefasDb.js'

export async function createTarefasTable() {
  const db = await openTarefasDb()
  await db.exec(
    'CREATE TABLE IF NOT EXISTS tarefas (id INTEGER PRIMARY KEY, titulo TEXT, descricao TEXT, status TEXT)',
  )
}

export async function inserirTarefa(tarefa) {
  const db = await openTarefasDb()
  await db.run('INSERT INTO tarefas (titulo, descricao, status) VALUES (?, ?, ?)', [
    tarefa.titulo,
    tarefa.descricao,
    tarefa.status,
  ])
}

export async function atualizarTarefa(tarefa) {
  const db = await openTarefasDb()
  await db.run('UPDATE tarefas SET titulo=?, descricao=?, status=? WHERE id=?', [
    tarefa.titulo,
    tarefa.descricao,
    tarefa.status,
    tarefa.id,
  ])
}

export async function excluirTarefa(id) {
  const db = await openTarefasDb()
  await db.run('DELETE FROM tarefas WHERE id=?', [id])
}

export async function selecionarTarefas() {
  const db = await openTarefasDb()
  return await db.all('SELECT * FROM tarefas')
}

export async function selecionarTarefaById(id) {
  const db = await openTarefasDb()
  return await db.get('SELECT * FROM tarefas WHERE id=?', [id])
}
