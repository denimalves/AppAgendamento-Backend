// models/index.js
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('agenda', 'root', '12345678', {
  host: 'localhost',
  dialect: 'mysql',
})

try {
  await sequelize.authenticate()
  console.log('Conexão com MySQL estabelecida')
} catch (err) {
  console.error('Erro na conexão com MySQL:', err)
}

export default sequelize
