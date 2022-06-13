var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idCaminhao", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idCaminhao", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get("/em-tempo-real/:idEmpresa", function (req, res) {
    medidaController.buscarMedidasEmTempoRealEmpresa(req, res);
})

module.exports = router;