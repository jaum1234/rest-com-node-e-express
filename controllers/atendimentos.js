const Atendimento = require('../models/atedimentos');

module.exports = app => {
    app.get('/atendimentos', (request, response) => {
        response.send('Voce esta na rota de atendimentos e esta realizando um GET');
    });

    app.post('/atendimentos', (request, response) => {
        const atendimento = request.body;
        Atendimento.adiciona(atendimento);

        response.send('voce esta na rota de atendimentos e esta realizando um POST');
    })
}