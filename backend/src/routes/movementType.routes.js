const router = require('express-promise-router')();
const movementTypeController = require('../controllers/movementType.controller');

// ==> Definindo as rotas do CRUD - 'MovementType':

// ==> Rota responsável por criar um novo 'Movement': (POST): localhost:3000/api/movements
router.post('/movementType', movementTypeController.createMovementType);

// ==> Rota responsável por listar todos os 'Movements': (GET): localhost:3000/api/movements
router.get('/movementTypes', movementTypeController.listAllMovementTypes);

// ==> Rota responsável por selecionar 'Movement' pelo 'Id': (GET): localhost:3000/api/movements/:id
router.get('/movementTypes/:id', movementTypeController.findMovementTypeById);

// ==> Rota responsável por atualizar 'Movement' pelo 'Id': (PUT): localhost: 3000/api/movements/:id
router.put('/movementTypes/:id', movementTypeController.updateMovementTypeById);

// ==> Rota responsável por excluir 'Movement' pelo 'Id': (DELETE): localhost:3000/api/movements/:id
router.delete('/movementTypes/:id', movementTypeController.deleteMovementTypeById);

module.exports = router;