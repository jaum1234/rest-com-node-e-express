const conexao = require('../infra/conexao');

class Atendimento 
{
    adiciona(atendimento)
    {
        const sql = 'INSERT INTO Atendimentos SET ?';

        conexao.query(sql, atendimento, (err, resultados) => {
            err ? console.log(err) : console.log(resultados);
        });
    }
}

module.exports = new Atendimento();