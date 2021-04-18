const router = require('express-promise-router')();
const userController = require('../controllers/user.controller');

// ==> Definindo as rotas do CRUD - 'User':

// ==> Rota responsável por selecionar 'Movement' pelo 'Id': (GET): localhost:3000/api/movements/:id
router.post('/user/:email', userController.findPasswordById);

module.exports = router;