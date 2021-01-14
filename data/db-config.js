const knex = require('knex');

const config = require('../knexfile.js');

const env = process.env.NODE_ENV || 'development'

module.exports = knex(config[env]);
