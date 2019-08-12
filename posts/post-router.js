const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
  const { limit, orderby } = req.query;

  const query = db.select('id', 'title', 'contents').from('posts');
  // const query = db('posts')

  if (limit) {
    query.limit(limit);
  }

  if (orderby) {
    query.orderBy(orderby);
  }

  // db('posts') // returns a promise that resolves to all records from the posts
  query
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({ message: 'error getting the posts from db' });
    });
});

router.get('/:id', (req, res) => {
  db('posts')
    .where({ id: req.params.id })
    .first()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({ message: 'error getting the post from db' });
    });
});

router.post('/', (req, res) => {
  const post = req.body;
  // validate the the post data is correct before saving to the db
  db('posts')
    .insert(post, 'id')
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({ message: 'error saving the post to the db' });
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;

  db('posts')
    .where('id', '=', req.params.id)
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: 'not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'error updating the post' });
    });
});

router.delete('/:id', (req, res) => {
  db('posts')
    .where('id', '=', req.params.id)
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: 'not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'error removing the post' });
    });
});

module.exports = router;