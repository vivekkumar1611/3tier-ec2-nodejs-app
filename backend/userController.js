const User = require('./userModel');

exports.createUser = (req, res) => {
  const { name, email } = req.body;
  User.create(name, email, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'User created', id: result.insertId });
  });
};

exports.getUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getUser = (req, res) => {
  User.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.updateUser = (req, res) => {
  const { name, email } = req.body;
  User.update(req.params.id, name, email, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'User updated' });
  });
};

exports.deleteUser = (req, res) => {
  User.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'User deleted' });
  });
};
