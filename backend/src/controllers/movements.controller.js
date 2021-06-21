const db = require('../config/database');

// ==> Método responsável por criar um novo 'Movement':
exports.createMovement = async (req, res) => {
  const { amount, movementDate, user, movementType } = req.body;
  const response = await db.query(
    'INSERT INTO movements (id_movement, amount, movement_date, id_user, id_movement_type) VALUES (default, $1, $2, $3, $4)',
    [amount, movementDate, user, movementType],
  );

  res.status(201).send({
    message: 'Movement added successfully!',
    body: {
      movement: { amount, movementDate, user, movementType },
    },
  });
};


// ==> Método responsável por listar todos os 'Movements':
exports.listAllMovements = async (req, res) => {
    const response = await db.query(
      'SELECT ' + 
        'a.id_movement, ' +
        'b.id_movement_type, ' +
        'b.description, ' +
        'b.frequency, ' +
        'b.mov_type, ' +
        'a.amount, ' +
        'to_char(a.movement_date, \'YYYY-MM-DD\') as movement_date, ' +
        'c.id_user, ' +
        'c.ds_email, ' +
        'c.nm_user ' +
      'FROM ' +
        'movements a, ' +
        'movement_type b, ' +
        'users c ' +
      'WHERE ' +
        'a.id_movement_type = b.id_movement_type ' +
        'AND a.id_user = c.id_user ' +
      'ORDER BY ' + 
        'a.movement_date ASC',
    );
    res.status(200).send(response.rows);
  };

// ==> Método responsável por selecionar 'Movement' pelo 'Id':
exports.findMovementById = async (req, res) => {
  const movementId = parseInt(req.params.id);
  const response = await db.query(
    'SELECT ' + 
        'a.id_movement, ' +
        'b.id_movement_type, ' +
        'b.description, ' +
        'b.frequency, ' +
        'b.mov_type, ' +
        'a.amount, ' +
        'to_char(a.movement_date, \'YYYY-MM-DD\') as movement_date, ' +
        'c.id_user, ' +
        'c.ds_email, ' +
        'c.nm_user ' +
      'FROM ' +
        'movements a, ' +
        'movement_type b, ' +
        'users c ' +
      'WHERE ' +
        'a.id_movement_type = b.id_movement_type ' +
        'AND a.id_user = c.id_user ' +
        'AND a.id_movement = $1 ',
    [movementId],
  );
  res.status(200).send(response.rows);
};


// ==> Método responsável por selecionar 'Movement' pelo 'movement_type':
exports.findMovementByType = async (req, res) => {
  const movementType = parseInt(req.params.id);
  const response = await db.query(
    'SELECT ' + 
        'a.id_movement, ' +
        'b.id_movement_type, ' +
        'b.description, ' +
        'b.frequency, ' +
        'b.mov_type, ' +
        'a.amount, ' +
        'to_char(a.movement_date, \'YYYY-MM-DD\') as movement_date, ' +
        'c.id_user, ' +
        'c.ds_email, ' +
        'c.nm_user ' +
      'FROM ' +
        'movements a, ' +
        'movement_type b, ' +
        'users c ' +
      'WHERE ' +
        'a.id_movement_type = b.id_movement_type ' +
        'AND a.id_user = c.id_user ' +
        'AND b.mov_type = $1 ',
    [movementType],
  );
  res.status(200).send(response.rows);
};


// ==> Método responsável por selecionar 'Movement' pelo 'movement_type' e espaço de datas:
exports.findMovementByTypeDate = async (req, res) => {
  const movementType = parseInt(req.params.id);
  const dtInicio = req.params.dtIni;
  const dtFim = req.params.dtFim;
  const response = await db.query(
    'SELECT ' + 
        'a.id_movement, ' +
        'b.id_movement_type, ' +
        'b.description, ' +
        'CASE WHEN b.frequency = \'R\' THEN \'Recorrente\' ELSE \'Eventual\' END as frequency, ' +
        'CASE WHEN b.mov_type = \'1\' THEN \'Entrada\' ELSE \'Saída\' END as mov_type, ' +
        'a.amount, ' +
        'to_char(a.movement_date, \'DD/MM/YYYY\') as movement_date, ' +
        'c.id_user, ' +
        'c.ds_email, ' +
        'c.nm_user ' +
      'FROM ' +
        'movements a, ' +
        'movement_type b, ' +
        'users c ' +
      'WHERE ' +
        'a.id_movement_type = b.id_movement_type ' +
        'AND a.id_user = c.id_user ' +
        'AND a.movement_date >= $2 ' +
        'AND a.movement_date <= $3 ' +
        'AND b.mov_type = $1 ' +
      'ORDER BY a.movement_date ',
    [movementType, dtInicio, dtFim],
  );
  res.status(200).send(response.rows);
};

// ==> Método responsável por atualizar um 'Movement' pelo 'Id':
exports.updateMovementById = async (req, res) => {
  const movementId = parseInt(req.params.id);
  const { amount, movementDate, user, movementType } = req.body;

  const response = await db.query(
    'UPDATE movements SET amount = $1, movement_date = $2, id_user = $3, id_movement_type = $4 WHERE id_movement = $5',
    [amount, movementDate, user, movementType, movementId],
  );

  res.status(200).send({ message: 'Movement Updated Successfully!' });
};

// ==> Método responsável por excluir um 'Movement' pelo 'Id':
exports.deleteMovementById = async (req, res) => {
  const movementId = parseInt(req.params.id);
  await db.query('DELETE FROM movements WHERE id_movement = $1', [
    movementId,
  ]);

  res.status(200).send({ message: 'Movement deleted successfully!', movementId });
};
