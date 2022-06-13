var empresaModel = require("../models/empresaModel");

var sessoes = [];
let insertIdResultado = 0;

function testar(req, res) {
    console.log("ENTRAMOS NA empresaController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    empresaModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var cnpj = req.body.cnpjServer;
    var cep = req.body.cepServer;
    var numero = req.body.numeroServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    }else {
        
        empresaModel.cadastrar(nome, cnpj, cep, numero)
            .then(
                function (resultado) {
                    res.json(resultado);
                    console.log(resultado.insertId)
                    insertIdResultado = resultado.insertId;
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Modules
module.exports = {
    cadastrar,
    listar,
    testar

}

