const db = require('../../data/db-config')

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}

function get() {
  // return db().from('posts').select('*')
  return db('posts')
}

function getById(id) {
  return db('posts').where('id', id).first()
}

function create(post) {
  return db('posts').insert(post)
    .then(([id]) => {
      return getById(id)
    })
}

function update(id, post) {
  return db('posts').update(post).where('id', id)
    .then(() => {
      return getById(id)
    })
}

async function remove(id) {
  const post = await getById(id)
  await db('posts').del().where('id', id)
  return Promise.resolve(post)
}
