// const server = require("./api/server.js")

// const PORT = process.env.PORT || 9000

// server.listen(PORT, () => {
//   console.log(`\n== API running on port ${PORT} ==\n`)
// })

const db = require('./data/db-config');

// SELECT * FROM Shippers WHERE ShipperName = 'Speedy Express' AND ShipperID = 1;
db('shippers')
  .where('shippername', 'Speedy Express')
  .then(result => {
    console.log(result);
  });