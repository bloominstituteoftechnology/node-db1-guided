const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();


// api/posts 
router.get('/', (req, res) => {
    // db.select().from('posts')
    db('posts')
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({message :"error retriving data"})
        })
});

//GET api/posts/:id
//returns the object in a data object  
// router.get('/:id', (req, res) => {
//     db('posts')
//       .where({ id: req.params.id })
//       .first() 
//       .then(post => {
//         if(post) {
//           res.status(200).json({ data: post });
//         } else {
//           res.status(400).json({ message: "Post not found" }) // worked on postman
//         }
//       })
//       .catch(error => {
//         res.status(500).json({ message: "sorry, ran into an error" });
//       });
//   });


//GET api/posts/:id
router.get("/:id", (req, res) => {
    const { id } = req.params;
    db('posts')
    // db.select().from("posts") same as db('posts')
      .where({ id })
      .then((post) => res.status(200).json(post))
      .catch((err) =>
        res.status(500).json({ message: "error retrieving post with id", err })
      );
  });


router.post('/', (req, res) => {
    const postData= req.body;
    db('posts')
    .insert(postData)
    .then((post) => res.status(200).json(post))
      .catch((err) =>
        res.status(500).json({ message: "faild to create post ", err })
      );
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db('posts')
    .where({id})
    .update(changes)
    .then((post) => {
        if(post){ res.status(200).json(post)
        } else {
            res.status(404).json({message: "post not found", })
        }
    })
    .catch((err) =>
    res.status(500).json({ message: "faild to create post ", err })
    );
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('posts')
    .where({id})
    .del()// works with .del(id) too not sure why
    .then((post) => {
        if(post){ res.status(200).json(post)
        } else {
            res.status(404).json({message: "post not found", })
        }
    })
    .catch((err) =>
    res.status(500).json({ message: "faild to delete post ", err })
    );
});

module.exports = router;