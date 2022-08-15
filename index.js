// const server = require("./api/server.js")

// const PORT = process.env.PORT || 9000

// server.listen(PORT, () => {
//   console.log(`\n== API running on port ${PORT} ==\n`)
// })

const db = require('./data/db-config');

// SELECT * FROM Shippers WHERE ShipperName = 'Speedy Express' AND ShipperID = 1;
// db('shippers')
//   // .where('shippername', 'Speedy Express')
//   .where({
//     ShipperName: 'Speedy Express',
//     ShipperID: 1,
//   })
//   .then(result => {
//     console.log(result);
//   });

// INSERT INTO Shippers (ShipperName, Phone) VALUES ('New Shipper', '1234567890')
// db('shippers')
//   .insert({ ShipperName: 'New Shipper', Phone: '1234567890' })
//   .then(result => {
//     console.log(result);
//   });

// UPDATE Shippers SET ShipperName = 'Newest Shipper' WHERE ShipperID = 7
db('shippers').where('ShipperID', 7).update({ ShipperName: 'Newest Shipper'})
  .then(result => {
    console.log(result);
  });