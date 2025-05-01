import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

sqlite3.verbose()

let db

export async function openDb() {
  db = await open({
    filename: './database.db',
    driver: sqlite3.Database,
  })
  return db
}
