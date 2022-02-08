const res = require('express/lib/response');
const Atendimento = require('../models/atedimentos');

module.exports = app => {
    app.get('/atendimentos', async (request, response) => {
        const atendimentos = await Atendimento.lista();

        response.status(200).json(atendimentos);
    });

    app.get('/atendimentos/:id', async (request, response) => {
        const id = parseInt(request.params.id);
        const atendimento = await Atendimento.buscaPorId(id);

        response.status(200).json(atendimento);
    });

    app.post('/atendimentos', async (request, response) => {
        const atendimento = request.body;
        const atendimentoCriado = await Atendimento.adiciona(atendimento, response);

        response.status(201).json(atendimentoCriado);
    });

    app.patch('/atendimentos/:id', async (request, response) => {
        const id = parseInt(request.params.id);
        const valores = request.body;
        const valoresAlterados = await Atendimento.altera(id, valores);

        response.status(200).json(valoresAlterados);
    });

    app.delete('/atendimentos/:id', async (request, response) => {
        const id = parseInt(request.params.id);
        const idDeletado = await Atendimento.deleta(id, response)

        response.status(200).json({id: idDeletado});
    });
}