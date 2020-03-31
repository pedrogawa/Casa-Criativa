/**
 * Criando e confirgando servidor com express.
 */

const express = require('express');
const server = express()

const db = require('./db.js')

/**
 * Habilitar uso do req.body
 */

server.use(express.urlencoded({ extended: true }))

/**
 * Configuração do nunjucks
 */

const nunjucks = require('nunjucks')
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

/**
 * Configurar arquivos estáticos. (css, scripts, imagens)
 */

server.use(express.static("public"))

server.get("/", function (req, resp) {

    db.all(`SELECT * from ideas`, function (err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reveresedIdeas = [...rows].reverse()

        let lastIdeas = []
        for (idea of reveresedIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }

        return resp.render("index.html", { ideas: lastIdeas })
    })
})

server.get("/ideias", function (req, resp) {


    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reveresedIdeas = [...rows].reverse()

        return resp.render("ideias.html", { ideas: reveresedIdeas })

    })

})

server.post("/", function (req, res) {

    const query = `INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
     ) VALUES(?,?,?,?,?);`

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query, values, function (err) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        return res.redirect('/ideias')
    })
})

/**
 * Ligando o servidor na porta 3000.
 */
server.listen(3000)