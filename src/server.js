const proffys = [
    { 
        name: "Diego Fernandes", 
        avatar: "https://avatars1.githubusercontent.com/u/2254731?s=120&v=4", 
        whatssap: "986089877", 
        bio: 'Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.', 
        subject: "Química", 
        cost: "20", 
        weekday: [0], 
        time_from: [720], 
        time_to: [1220]
    },
    { 
        name: "Mayk Brito", 
        avatar: "https://avatars2.githubusercontent.com/u/6643122?s=460&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4", 
        whatssap: "986089877", 
        bio: 'Instrutor de Educação Física para iniciantes, minha missão de vida é levar saúde e contribuir para o crescimento de quem se interessar. <br>Comecei a minha jornada profissional em 2001, quando meu pai me deu dois alteres de 32kg com a seguinte condição: "Aprenda a fazer dinheiro com isso!', 
        subject: "Educação Física", 
        cost: "40", 
        weekday: [1], 
        time_from: [720], 
        time_to: [1220]
    },
    {
        name: "Tiago Luchtemberg",
        avatar: "https://media-exp1.licdn.com/dms/image/C4E03AQHfarmcSLlWtA/profile-displayphoto-shrink_200_200/0?e=1602115200&v=beta&t=kp57Leis9izzzuJRa0Kfu-nsz_mW1RNnO0wWtQCbG-s",
        whatssap: "986089877",
        bio: 'As vezes não sei nem onde eu tô, mas consigo me localizar facilmente em qualquer lugar. Tenho memória fotográfica e nunca fico perdido.Eu ensino a galera como não se perder na vida, com lições geográficas simples pra você nunca mais precisar de mapa na sua bela vida.',
        subject: "Geografia",
        cost: "360",
        weekday: [2],
        time_from: [720],
        time_to: [1220]
    }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

function getSubject(subjectNumber) {
    const position = +subjectNumber -1
    return subjects[position]
}


function pageLanding(req, res) {
    return res.render("index.html")
}

function pageStudy(req, res) {
    const filters = req.query
    return res.render("study.html", {proffys, filters, subjects, weekdays})
}

function pageGiveClasses(req, res) {
    const data = req.query

    const isNotEmpty = Object.keys(data).length > 0
    //Se tiver dados add, adicionar a lista de proffys
    if (isNotEmpty) {

        data.subject = getSubject(data.subject)

        //adiciona dados a lista de proffys
        proffys.push(data)

        return res.redirect("/study")
    }
   
    //Se não, mostrar a página
    return res.render("give-classes.html", {subjects, weekdays})
}

//Servidor
const express = require('express')
const server = express()


// configurar nunjucks(Template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server
.use(express.static("public"))

// Rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)


.listen(5500)

