const db = require('../../data/db-config');

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}

async function get() {
  // SELECT * FROM Shippers;
  return db('shippers');
}

async function getById(id) {
  return db('shippers').where('shipperid', id);
}

async function create(shipper) {
  return db('shippers').insert(shipper);
}

async function update() {
  return 'update wired'
}

async function remove() {
  return 'delete wired'
}
