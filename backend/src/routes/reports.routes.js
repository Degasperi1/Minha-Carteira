const router = require('express-promise-router')();
const reportController = require('../controllers/reports.controller');

// ==> Rota responsável por criar um novo 'Movement': (POST): localhost:3000/api/movements
router.get('/reports/:id/:dtIni/:dtFim', reportController.printMovsByType);

router.get('/reports/pdf/:id/:dtIni/:dtFim', reportController.printPDF);


module.exports = router;