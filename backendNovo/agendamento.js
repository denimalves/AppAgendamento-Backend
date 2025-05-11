// models/Agendamento.js
import { DataTypes } from 'sequelize'
import sequelize from './index.js'

const Agendamento = sequelize.define(
  'Agendamento',
  {
    evento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    horaInicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    horaFinal: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    tableName: 'agendamentos',
    timestamps: false,
  },
)

export default Agendamento
