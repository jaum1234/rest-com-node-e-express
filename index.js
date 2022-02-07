const customExpress = require('./config/customExpress');
const conexao = require('./infra/conexao');
const Tabelas = require('./infra/tabelas');

conexao.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    Tabelas.init(conexao);

    const app = customExpress();
    app.listen(3000, () => {
        console.log('servidor rodando na porta 3000. Tudo ok!');
    });
});

 