const db = require('../../data/db-config') // Database connection // SQLite3 // Knex

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}

// __________ SQL KNEX FLOW __________

// STEP 1 - In SQL LIGHT  Studio, use the desired code for the desired output, check data to confirm it works.
// STEP 2 - Knex documentation.
// 


// __________ KNEX meand DB on the documentation site __________

// Notes:

// // Returns [1] in "mysql", "sqlite", "oracle"; [] in "postgresql" unless the 'returning' parameter is set.
// knex('books').update('title', 'Slaughterhouse Five')

// Outputs:
// update `books` set `title` = 'Slaughterhouse Five'

// ______

// // Returns [ { id: 42, title: "The Hitchhiker's Guide to the Galaxy" } ]
// knex('books')
//   .where({ id: 42 })
//   .update({ title: "The Hitchhiker's Guide to the Galaxy" }, ['id', 'title'])
// Outputs:
// update `books` set `title` = 'The Hitchhiker\'s Guide to the Galaxy' where `id` = 42



//  Get all posts.
// SELECT * FROM posts;
function get() {
  return db('posts')
}

// knex.select('id').from<User>('users'); // Resolves to Pick<User, "id">[]
//  This helper function grabs all ID's and the router will match params and grab the clients ID. (added id as argument)
// SELECT * FROM posts WHERE id = id; //  SQL version*
// return db('posts').where({ id: id, foo: 'bar' }).first() //  Knex version*
// .first() gets rid of nesting, (array in this case). Witthout first() we get an empty arr with bad code, first() gives us undefined. 
function getById(id) {
  return db('posts').where('id', id).first() // Returns the post with the id.
}


// From notes:
// SQL version* Note that single qoutes are needed in SQL Light Studio because you cannot set it up in a function with args.
// -- Create Title & Content
// SQL version = INSERT INTO posts (title, contents) VALUES ('title', 'contents');
// My failed version: = db('posts').insert({ title, contents })

// Gabriels's debugging notes:
// const stuff = await db('posts').insert({ title, contents }) // Inserts into table, returns id.
// console.log(stuff) // [ 15 ] // Here we learned that this returns an array of the id. 

async function create({ title, contents }) {
  const [id] = await db('posts').insert({ title, contents }) // Inserts into table, returns id.
  console.log(id) // 15
  const newPost = await getById(id)                          // Gets the new post.
  console.log(newPost) // { id: 15, title: 'title', contents: 'contents' } AKA title: 'xxxx', contents: 'xxxx'
  return newPost                                             // Returns the new post.
}


// UPDATE posts
// SET title = 'yeet', contents = 'jajajaja'
// WHERE id = 1;

// Knex Documentation:
// knex('books')
//   .where('published_date', '<', 2000)
//   .update({
//     status: 'archived',
//     thisKeyIsSkipped: undefined
//   })

// Update/PUT needs an ID in the param inside of the HTTP client.
// After the put req, you must do a get req to see data.
async function update(id, { title, contents }) {
  // return await db('posts').where({ id }).update({ title, contents })
  const updatedPost = await db('posts').where('id', id).update({ title, contents }) // Inserts into table, returns id.
  // console.log(updatedPost) // was named stuff. It returns: 1. If return 'foo'
  return updatedPost
}




// DELETE FROM shippers WHERE shipperid = 5;

function remove(id) {
  return db('posts').where('id', id).del()
}



// ____________________ SQL NOTE's _________________________ //


// How to comment in SQL:
// -- 2 dashes!
// The WHERE keyword is for a 'filter or a query'.
// /* Use single quotes for strings */
// /* String queries are case sensitive */
// /* chaining 1 AND and a conditional */
// /* OR also works, sorta like AND */

// /* LIKE with the % operator grabs all any string that ends in land */
// /* LIKE allows for case insensitivity */

// /* NOT is a keyword, does what it says. Sorta like "!" in JavaScript. */

// SELECT * FROM customers WHERE country LIKE 'ireland'; 


// @@@@@@@@@@@ SELECT @@@@@@@@@@@@@@


// -- How to grab all that do not contain a specific word in a paragraph.
// -- LIKE allows for case insensitivity, % allows to search for the string regardless of what is in front or behind it. 

// SELECT * FROM employees 
// WHERE notes 
// NOT LIKE '%university%';   


// ______________________________________________


// -- Grab all CategoryId's that have an integer of one. 
// SELECT * FROM products WHERE categoryid = 1;


// _______________________________________________


// -- Find all of the orders made after Jan 1 1997
// SELECT * FROM orders WHERE orderDate > '1997-01-01';

// -- I was stuck on this because I forgot "FROM" and the zeros in the date.


// ****

// -- ORDER BY oderdate ASC; makes the dates appear in order.

// SELECT * FROM orders WHERE orderdate > '1997-01-01' ORDER BY oderdate ASC;


// _______________________________________________


// -- Get all products sorting them by category ascending, and then by price descending.

// SELECT * FROM products 
// ORDER BY categoryid ASC, price DESC;

// -- Interesting to note that WHERE was not needed, ORDER BY sufficed.
// -- Also, "ASC" is not necessary since it is the default, but it adds clarity.


// _______________________________________________


// @@@@@@@@@@@@ INSERT @@@@@@@@@@@@@


// --INSERT INTO shippers (shippername, phone) VALUES ('acme 44', '(916) 500 9483');

// insert into shippers (shippername, phone) values ('acme 44', '(909) 123 1234');

// --SELECT * FROM shippers;


// ***

// -- Likely a W3Schools bug, buuut, would not work until I used case sensitivity with schema names. Like this:

// -- insert into shippers (ShipperName, Phone) values ('acme 44', '(909) 123 1234');

// select * from shippers; -- To check result.


// -- And if you wanted to add just 1 property, it works unless it is a required field. It looks like this:

// -- insert into shippers (ShipperName) values ('acme 44');


// ____________________________________________



// @@@@@@@@@@@@@ UPDATE @@@@@@@@@@@@@

// -- How to edit a table:

// UPDATE shippers 
// SET shippername = 'webpt 31 is lit' 
// WHERE shipperid = 4;  

// --SELECT * FROM shippers;


// ***  

// -- How to update multiple fields. Note, no trailing commas.

// UPDATE posts
// SET title = 'yeet', contents = 'jajajajaja'
// WHERE id = 1;


// @@@@@@@@@@@@ DELETE @@@@@@@@@@@@@


// -- ID is the primary key. Any ID number that has been deleted cannot be used by any future ID numbers. So we DELETE ID 2 then create a new one, the ID's are 1, 3, and so on. 

// -- How to delete:

// DELETE FROM shippers WHERE shipperid = 5;



// _________________________________________________

// $$$$$$$$$$$$$$$ Knex $$$$$$$$$$$$$$$$$$$$$


// Knex starts @ 1:16:00 
// Left off @ 1:37:00
// https://www.youtube.com/watch?v=sZerzHDO18g&t=139s


// _________________________

// // import data
// const db = require('../../data/db-config')


// module.exports = {
//   get,
//   getById,
//   create,
//   update,
//   remove,
// }

// async function get() {
//   // is like SELECT * FROM posts;
//   // This gives us all the data on a GET req!
//   return db('posts')
// }

// async function getById(id) {
//   // is like SELECT * FROM posts WHERE id = id;
//   // return db('posts').where({ id: id }) // Same as below.
//   return db('posts').where('id', id).first() // .first() gets rid of the array 
// }




