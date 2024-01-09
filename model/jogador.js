// jogador.js
const Sequelize = require('sequelize');
const sequelize = new Sequelize('italo', 'root', 'italoegui', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

const Jogador = sequelize.define('jogadores', {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  time: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  idade: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  aceleracao: Sequelize.INTEGER,
  velocidadeSprint: Sequelize.INTEGER,
  finalizacao: Sequelize.INTEGER,
  forcaChute: Sequelize.INTEGER,
  chutesLongos: Sequelize.INTEGER,
  penaltis: Sequelize.INTEGER,
  visao: Sequelize.INTEGER,
  cruzamentos: Sequelize.INTEGER,
  agilidade: Sequelize.INTEGER,
  equilibrio: Sequelize.INTEGER,
  dribles: Sequelize.INTEGER,
});

// Sincronizar o modelo com o banco de dados
Jogador.sync().then(() => {
  console.log('Tabela de jogadores criada com sucesso!');
}).catch((err) => {
  console.log('Erro ao criar tabela de jogadores:', err);
});

module.exports = Jogador;