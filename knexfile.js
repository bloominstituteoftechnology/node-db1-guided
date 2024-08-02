module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/northwind.db3',
    },
    useNullAsDefault: true,
  },
}
