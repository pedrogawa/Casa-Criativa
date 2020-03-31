const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(function() {


    /**
     * Criar a tabela
     * 
     * Inserir dados na tabela
     * 
     * Consultar dados na tabela
     * 
     * Deletar um dado na tabela
     */

     db.run(`CREATE TABLE IF NOT EXISTS ideas(
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         image TEXT, 
         title TEXT,
         category TEXT,
         description TEXT,
         link TEXT
     );`)
    
    


     db.run(`DELETE from ideas WHERE id = ?`, [5], function(err) {
         if (err) return console.log(err)

         console.log("DELETEI", this)
     })

})


module.exports = db