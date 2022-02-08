const conexao = require('../infra/conexao');
const moment = require('moment');
const res = require('express/lib/response');

class Atendimento 
{
    adiciona(atendimento, res)
    {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

        const validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida(data, dataCriacao),
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido(atendimento),
                mensagem: 'Nome do cliente deve possuir pelo menos 3 caractes.'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);

        if (this.existemErros(erros)) {
            res.status(400).json(erros);
            return;
        }

        const atendimentoDatado = {...atendimento, dataCriacao, data};

        const sql = 'INSERT INTO Atendimentos SET ?';

        conexao.query(sql, atendimentoDatado, (err, resultados) => {
            err ? res.status(400).json(err) : res.status(201).json({...atendimentoDatado});
        });
    }

    lista(res)
    {
        const sql = 'SELECT * FROM atendimentos';

        conexao.query(sql, (err, resultados) => {
            if (err) {
                res.status(400).json(err);
                return;
            }
            res.status(200).json(resultados);
        });
    }

    buscaPorId(id, res)
    {
        const sql = `SELECT * FROM atendimentos WHERE id = ${id}`;

        conexao.query(sql, (err, resultados) => {
            const atendimento = resultados[0]
            if (err) {
                res.status(400).json(err);
                return;
            }
            res.status(200).json(atendimento);
        })
    }

    altera(id, valores, res)
    {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        }

        const sql = 'UPDATE Atendimentos SET ? where Id = ?';

        conexao.query(sql, [valores, id], (err, resultados) => {
            if (err) {
                res.status(400).json(err);
                return;
            }
            res.status(200).json({...valores});
        });
    }

    deleta(id, res)
    {
        const sql = 'DELETE FROM atendimentos WHERE id = ?';

        conexao.query(sql, id, (err, resultados) => {
            if (err) {
                res.status(400).json(err);
                return;
            }
            res.status(200).json({id});
        })
    }

    dataEhValida(dataAgendamendo, dataCriacao) 
    {
        return moment(dataAgendamendo).isSameOrAfter(dataCriacao)
    }

    clienteEhValido(atendimento)
    {
        return atendimento.cliente.length >= 3;
    }

    existemErros(erros)
    {
        return erros.length;
    }
}

module.exports = new Atendimento();