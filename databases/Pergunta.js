
const Sequelize = require("sequelize")

const connection = require("./database")
// criando tabela perguntas no banco de dados 
const Pergunta = connection.define('perguntas',{
    titulo:{
        type:Sequelize.STRING,
        allowNull:false
    },
    descricao:{
        type:Sequelize.TEXT,
        allowNull:false
    }
});

Pergunta.sync({force: false}).then(()=>{
    console.log("tabela criada com sucesso!")
})

module.exports = Pergunta