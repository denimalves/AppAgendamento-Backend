import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

sqlite3.verbose()

export async function openDb() {
  return open({
    filename: './database.db',
    driver: sqlite3.Database,
  })
}

export async function createTable() {
  const db = await openDb()
  await db.exec(`
    CREATE TABLE IF NOT EXISTS agendamentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      data TEXT NOT NULL,
      hora TEXT NOT NULL
    );
  `)
}
