const db = require('../../data/db-config')

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}

async function get() {
  return db('shippers');
}

async function getById(id) {
  return db('shippers').where('shipperid', id).first();
}

async function create({ phone, shippername }) {
  // return db('shippers').insert({ phone, shippername });
  const stuff = await db('shippers').insert({ phone, shippername })
  console.log(stuff)
  return 'foo'
}

async function update(id, { phone, shippername }) {
  return db('shippers').where('shipperid', '=', id).update({ phone, shippername});
}

async function remove(id) {
  return db('shippers').where('shipperid', '=', id).del();
}
