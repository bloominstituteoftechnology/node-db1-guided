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
  return db('shippers').where('shipperid', id).first();
}

async function create(shipper) {
  const [id] = await db('shippers').insert(shipper);
  return await getById(id)
}

async function update(id, changes) {
  await db('shippers').update(changes).where('shipperid', id);
  return getById(id);
}

async function remove(id) {
  const result = await getById(id);
  await db('shippers').delete().where('shipperid', id);
  return result;
}
