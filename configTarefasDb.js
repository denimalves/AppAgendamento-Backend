import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

sqlite3.verbose()

export async function openTarefasDb() {
  return open({
    filename: './database_tarefas.db',
    driver: sqlite3.Database,
  })
}

export async function createTarefasTable() {
  const db = await openTarefasDb()
  await db.exec(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT,
      status TEXT
    );
  `)
}
