const sequelize =require('sequelize');
//configurando conecção com bacno de dados....
const connection = new sequelize('guiaPerguntas', 'root' ,'12345',{
    host: 'localhost',
    dialect:'mysql'
});

module.exports = connection;