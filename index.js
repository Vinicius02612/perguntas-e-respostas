const express = require('express');
const bodyParser = require('body-parser');
const app = express();



const connection = require('./databases/database');
const Pergunta = require('./databases/Pergunta');
const Resposta = require('./databases/Resposta')
 
//estando conexão..
connection
    .authenticate()
    .then(()=>{
        console.log('Conexão bem sucedida')
    })
    .catch((msgErro)=>{
        console.log(msgErro)
    })

//configurando o ejs no node
app.set('views engine', 'ejs');
//setando arquivos estaticos com express
app.use(express.static('public'));

//tranformando dados para um JSON...
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(express.urlencoded({extended:false}));
// app.use(express.json());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/",(req, res)=>{

    //pegando as perguntas do banco de dados e renderizando na pagina Home
    Pergunta.findAll({raw: true,order:[
        ['id', 'DESC']
    ] }).then(perguntas =>{
        // console.log(perguntas)
        res.render("home/index.ejs",{
            perguntas:perguntas
        })
    })
    Resposta.findAll({raw: true, order:[
        ['id', 'DESC']
    ]}).then(respostas =>{
        res.render("home/index.ejs", {respostas:respostas})
    })

    
    
});



app.get("/perguntas",(req, res)=>{
   
    res.render("perguntas/index.ejs",{
        
    });

});

//salvando perguntas...
app.post("/salvarPerguntas", (req, res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    // res.send("Formulario recebido "+titulo+ "descricao "+descricao)
    Pergunta.create({
        titulo:titulo,
        descricao:descricao
    }).then(()=>{
        res.redirect("/")
    })
    // console.log(erro)
})

app.post("/salvarResposta", (req, res)=>{
    var resposta = req.body.corpo
    var perguntaId = req.body.pergunta
    Resposta.create({
        corpo:resposta,
        perguntaId:perguntaId
    }).then(()=>{
        res.redirect("/")
    })
})

app.get("/pergunta/:id", (req,res)=>{
    var id = req.params.id
    Pergunta.findOne({where:{id:id}
    }).then(perguntas =>{
        if(perguntas != undefined){
            Resposta.findAll({
                where:{perguntaId: perguntas.id},
                order:[['id', 'DESC']]
            }).then(respostas =>{
                res.render("perguntas/responder.ejs",{
                    perguntas:perguntas,
                    resposta:respostas
                })
            })

           
        }else{
            res.redirect("/")
        }
    })
})

app.listen(3000, ()=>{
    console.log("Servido rodando...");
});