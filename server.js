//usei o express para criar e configurar o meu servidor
const express = require('express');
const server = express();

const db = require('./db')

//configura arquivos estáticos (css, scripts, imagens)
server.use(express.static('public'))

// habilitando o uso do req.body
server.use(express.urlencoded({
  extended: true
}))

//configuração do Nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure('views', {
  express: server,
  noCache: true,
})

/**
 * criei uma rota
 * e capturo o pedido do cliente para responder
 */
server.get('/', function(req, res) {

  db.all(`SELECT * FROM ideas`, function(err, rows) {
    if (err) {
      console.log(err)
      return res.send("Erro no bando de dados!")
    }
  
      const reverseIdeas = [...rows].reverse()

      let lastIdeas = []
      for (let idea of reverseIdeas) {
        if (lastIdeas.length < 2) {
          lastIdeas.push(idea)
        }
      };


    return res.render('index.html', { ideas: lastIdeas })
    })

  
})

server.get('/ideias', function(req, res) {

  db.all(`SELECT * FROM ideas`, function(err, rows) {
    if (err) {
      console.log(err)
      return res.send("Erro no bando de dados!")
    }

    const reverseIdeas = [...rows].reverse()
    return res.render('ideias.html', { ideas: reverseIdeas })
  })
  
  
})

server.post('/', (req, res) => {
  // Inserir dados na tabela
  const query = `
  INSERT INTO ideas(
    image,
    title,
    category,
    description,
    link
  ) VALUES(?,?,?,?,?);
  `

  const values = [
    req.body.image,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.link
]

    db.run(query, values, function(err) {
      if (err) {
        console.log(err)
        return res.send("Erro no bando de dados!")
      }

      return res.redirect("/ideias")
    })
})

//liguei meu servidor na porta 3000
server.listen(3000)