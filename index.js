const server = require("./api/server.js")

const PORT = process.env.PORT || 9000

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`)
})

// const db = require('./data/db-config');
// // DELETE FROM customers WHERE customername = 'Die Wandernde Kuh' AND customerid = 86
// db('customers')
//   // .insert([
//   //   { contactname: '1', address: 'a' },
//   //   { contactname: '2', address: 'b' },
//   // ])
//   // .where('customerid', 92)
//   .then(result => {
//     console.log(result);
//     process.exit();
//   });


