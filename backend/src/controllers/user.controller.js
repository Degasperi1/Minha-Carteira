const db = require('../config/database');


// ==> Método responsável por buscar 'a senha' pelo 'email':
exports.findPasswordById = async (req, res) => {
  const email = (req.params.email);
  const response = await db.query(
    'SELECT ' + 
        'ds_password ' +
      'FROM ' +
        'users ' +
      'WHERE ' +
        'ds_email = $1 ',
    [email],
  );
  res.status(200).send(response.rows);
};
