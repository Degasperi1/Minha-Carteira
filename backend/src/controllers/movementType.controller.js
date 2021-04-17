const db = require('../config/database');

// ==> Método responsável por criar um novo 'Movement Type':
exports.createMovementType = async (req, res) => {
  const { description, frequency, movType } = req.body;
  const response = await db.query(
    'INSERT INTO movement_type (id_movement_type, description, frequency, mov_type, situation) VALUES (default, $1, $2, $3, \'A\')',
    [description, frequency, movType],
  );

  res.status(201).send({
    message: 'Movement Type added successfully!',
    body: {
      movement: { description, frequency, movType },
    },
  });
};


// ==> Método responsável por listar todos os 'Movement Types':
exports.listAllMovementTypes = async (req, res) => {
    const response = await db.query(
      'SELECT ' + 
        'id_movement_type, ' +
        'description, ' +
        'frequency, ' +
        'mov_type, ' +
        'situation ' +
      'FROM ' +
        'movement_type ' +
      'WHERE ' +
        'situation = \'A\' ',
    );
    res.status(200).send(response.rows);
  };

// ==> Método responsável por selecionar 'MovementType' pelo 'Id':
exports.findMovementTypeById = async (req, res) => {
  const movementTypeId = parseInt(req.params.id);
  const response = await db.query(
    'SELECT ' + 
    'id_movement_type, ' +
    'description, ' +
    'frequency, ' +
    'mov_type, ' +
    'situation ' +
  'FROM ' +
    'movement_type ' +
  'WHERE ' +
    'situation = \'A\' ' +
    'AND id_movement_type = $1',
    [movementTypeId],
  );
  res.status(200).send(response.rows);
};

// ==> Método responsável por atualizar um 'MovementType' pelo 'Id':
exports.updateMovementTypeById = async (req, res) => {
  const movementTypeId = parseInt(req.params.id);
  const { description, frequency, movType, situation } = req.body;

  const response = await db.query(
    'UPDATE movement_type SET description = $1, frequency = $2, mov_type = $3, situation = $4 WHERE id_movement_type = $5',
    [description, frequency, movType, situation, movementTypeId],
  );

  res.status(200).send({ message: 'Movement Type Updated Successfully!' });
};

// ==> Método responsável por excluir (inativar) um 'MovementType' pelo 'Id':
exports.deleteMovementTypeById = async (req, res) => {
  const movementTypeId = parseInt(req.params.id);
  await db.query(
    'UPDATE movement_type SET situation = \'I\' WHERE id_movement_type = $1', 
    [movementTypeId],
  );

  res.status(200).send({ message: 'Movement Type deleted successfully!', movementTypeId });
};
