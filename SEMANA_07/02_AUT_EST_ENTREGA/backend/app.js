const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const bodyParser = require ('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const hostname = '127.0.0.1';
const port = 3000
const app = express();

app.use(express.static("../frontend/"));
app.use(express.json());

const DBPATH = 'C:/Users/Inteli/Documents/GitHub/Tutorial_M2_Murilo_Prianti/SEMANA_04/02_AUT_EST_ENTREGA/data/Atividade_semana_2.db';


// Rota para obter registros
app.get('/habilits', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT * FROM Tb_habilidades`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Erro ao coletar registros');
        } else {
            res.json(rows);
            console.log(rows);
            db.close();
        }
    });
    
});

app.post('/inserir_habilits', urlencodedParser,(req,res)=>{
    res.statusCode = 200;
    res.setHeader = ('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    sql = `INSERT INTO Tb_habilidades (Id_pessoa, id_habilidade, qualidade, habilidade) VALUES ("${req.body.id_pessoa}","${req.body.id_habilidade}","${req.body.qualidade}","${req.body.habilidade}")`;
    db.all(sql,[], err => {
        if (err){
            throw err;  
        }
 });
    res.write('<p>HABILIDADE INSERIDA COM SUCESSO</p><a href="/">VOLTAR</a>');
    db.close();
    res.end();
});

app.get('/atualiza_habilits', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    sql = `SELECT * FROM Tb_habilidades WHERE id_habilidade=${req.query.id_habilidade}`;
    console.log(sql);
    var db = new sqlite3.Database(DBPATH);
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});
app.post('/atualiza_habilits', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    sql = `UPDATE Tb_habilidades SET habilidade="${req.body.habilidade}", qualidade="${req.body.qualidade}" WHERE id_habilidade="${req.body.id_habilidade}"`;
    console.log(sql);
    var db = new sqlite3.Database(DBPATH);
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    res.write('<p>HABILIDADE ATUALIZADA COM SUCESSO!</p><a href="/">VOLTAR</a>');
    db.close();
})
app.get('/remove_habilits', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    sql = `DELETE FROM Tb_habilidades WHERE id_habilidade="${req.query.id_habilidade}"`;
    console.log(sql);
    var db = new sqlite3.Database(DBPATH);
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.write('<p>HABILIDADE REMOVIDA COM SUCESSO!</p><a href="/">VOLTAR</a>');
        res.end();
    });
    db.close();
});

app.listen(port, hostname, () =>{
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
}); 

