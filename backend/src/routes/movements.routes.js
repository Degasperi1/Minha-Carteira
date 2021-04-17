const router = require('express-promise-router')();
const movementController = require('../controllers/movements.controller');

// ==> Definindo as rotas do CRUD - 'Movement':

// ==> Rota responsável por criar um novo 'Movement': (POST): localhost:3000/api/movements
router.post('/movements', movementController.createMovement);

// ==> Rota responsável por listar todos os 'Movements': (GET): localhost:3000/api/movements
router.get('/movements', movementController.listAllMovements);

// ==> Rota responsável por selecionar 'Movement' pelo 'Id': (GET): localhost:3000/api/movements/:id
router.get('/movements/:id', movementController.findMovementById);

// ==> Rota responsável por selecionar 'Movement' pelo 'Type': (GET): localhost:3000/api/movements/type/:id
router.get('/movements/type/:id', movementController.findMovementByType);

// ==> Rota responsável por atualizar 'Movement' pelo 'Id': (PUT): localhost: 3000/api/movements/:id
router.put('/movements/:id', movementController.updateMovementById);

// ==> Rota responsável por excluir 'Movement' pelo 'Id': (DELETE): localhost:3000/api/movements/:id
router.delete('/movements/:id', movementController.deleteMovementById);

module.exports = router;