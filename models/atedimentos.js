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
                mensagem: 'Nome do cliente deve possuir pelo menos 5 caractes.'
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
            err ? res.status(400).json(err) : res.status(201).json(resultados);
        });
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