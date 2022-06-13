var database = require("../database/config");

function buscarUltimasMedidas(idCaminhao, limite_linhas) {
    instrucaoSql = `select e.idEmpresa as ID, 
                        lm35_temperatura as temperatura, 
                            date_format(d.dtHora, '%H:%i:%s') as momento_grafico 
                                from terceirizado as t
                                    join empresa as e 
                                        on e.idEmpresa = t.fkEmpresa
                                    join caminhao as c 
                                        on c.idCaminhao = t.fkCaminhao
                                    join sensor as s 
                                        on s.fkCaminhao = c.idCaminhao
                                    join dado as d 
                                        on d.fkSensor = s.idSensor
                                            where c.idCaminhao = ${idCaminhao} and e.idEmpresa = 1
                                            order by c.idCaminhao desc limit ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idCaminhao) {
    instrucaoSql = `select e.idEmpresa as ID, 
                        lm35_temperatura as temperatura, 
                        date_format(d.dtHora, '%H:%i:%s') as momento_grafico 
                            from terceirizado as t
                                join empresa as e 
                                    on e.idEmpresa = t.fkEmpresa
                                join caminhao as c 
                                    on c.idCaminhao = t.fkCaminhao
                                join sensor as s 
                                    on s.fkCaminhao = c.idCaminhao
                                join dado as d 
                                    on d.fkSensor = s.idSensor
                                        where c.idCaminhao = ${idCaminhao} and e.idEmpresa = 1
                                        order by idDado desc limit 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealEmpresa(idEmpresa) {
    instrucaoSql = `SELECT
    S.idSensor,
        (SELECT
            lm35_temperatura AS Temperatura
                FROM dado WHERE fkSensor = S.idSensor ORDER BY dtHora DESC LIMIT 1) as temperatura
        FROM empresa E
            INNER JOIN terceirizado T
                ON E.idEmpresa = T.fkEmpresa
            INNER JOIN caminhao C
                ON C.idCaminhao = T.fkCaminhao
            INNER JOIN sensor S
                ON S.fkCaminhao = C.idCaminhao
            INNER JOIN dado D
                ON D.fkSensor = S.idSensor
                    WHERE 1=1
                    and E.idEmpresa = ${idEmpresa}
                        GROUP BY
                            E.nomeEmpresa,
                            S.idSensor;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarMedidasEmTempoRealEmpresa
}