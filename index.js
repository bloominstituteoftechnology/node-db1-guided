// const server = require("./api/server.js")

// const PORT = process.env.PORT || 9000

// server.listen(PORT, () => {
//   console.log(`\n== API running on port ${PORT} ==\n`)
// })

const db = require('./data/db-config');

// SELECT * FROM Shippers;
db('shippers')
  .then(result => {
    console.log(result);
  });