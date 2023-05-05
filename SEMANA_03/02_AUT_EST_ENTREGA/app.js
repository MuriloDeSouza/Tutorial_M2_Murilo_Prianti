const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const port = 3000
const app = express();
app.use(express.json());

const dbPath = 'C:/Users/Inteli/Desktop/NodeServer/Atividade_semana_2.db';

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the database.');
    }
});

const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
});

// Rota para obter registros
app.get('/person', (req, res) => {
    const sql = 'SELECT * FROM Tb_habilidades';
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Erro ao coletar registros');
        } else {
            res.json(rows);
        }
    });
});

app.get('/person/id_habilidade', (req,res) => {
    const id_H = req.params.id_habilidade
    const sql = 'SELECT * FROM Tb_habilidades WHERE id_habilidade = ?';
    db.get (sql, [id_H,], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Erro ao coletar registros');
        }else if (!row){
            res.status(404).send('Registro não encontrado');
        }else{
            res.json(row);
        }
    });

});


app.post('/nomes', (req,res) => {
    const { habilidade, qualidade, id_habilidade, Id_pessoa } = req.body;
    //let idd_pessoa = req.body.Id_pessoa
    const sql = `INSERT INTO Tb_habilidades (habilidade, qualidade, id_habilidade, Id_pessoa) VALUES (?, ?, ?, ?)`;
    db.run(sql, [habilidade, qualidade, id_habilidade, Id_pessoa], function(err) {
        if(err){
            console.error(err.message);
            res.status(500).send("Erro no registro");

        }else{
            res.json({ id: this.lastID});
        }
    });

});


app.put('/rota/:id_habilidade', (req,res) => {
    const { habilidade, qualidade, id_habilidade, Id_pessoa } = req.body;
    const id = req.params.id_habilidade;
    const sql = `UPDATE Tb_habilidades SET habilidade = ?, qualidade = ? WHERE id_habilidade = ?`;
    db.run (sql, [habilidade, qualidade, id], function (err){
        if(err){
            console.error(err.message);
            res.status(500).send('Erro ao atualizar o registro, complicado, tente novamente, OBRIGADO')
        }else if (this.changes === 0) {
            res.status(404).send('Complicado, deu ruim, tente novamente, OBRIGADO')
            
        }else{
            res.json({id_habilidade:id });
        }

    });

});


app.delete('/rota/periculoso/:id_habilidade', (req,res) => {
    const idid = req.params.id_habilidade;
    const sql = `DELETE FROM Tb_habilidades WHERE id_habilidade = ?`;
    db.run(sql, [idid], function(err){
        if (err){
            console.error(err.message);
            res.status(500).send('Complicado né, tente dnv, aqui é Inteli');
        }else{
            res.send(`Pessoa com id ${idid} CPF cancelado`);
        }

    });

});


app.listen(port, () => 
{
    console.log(`Servidor rodando na porta ${port}`);
    console.log(dbPath);

})

