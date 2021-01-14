const express = require('express')

const router = express.Router()

const Post = require('./post-model')

const checkId = async (req, res, next) => {
  const post = await Post.getById(req.params.id)
  post ? next() : res.status(404).json('not found')
}

router.get('/', async (req, res, next) => {
  try {
    const data = await Post.get()
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkId, async (req, res, next) => {
  try {
    const data = await Post.getById(req.params.id)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const data = await Post.create(req.body)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', checkId, async (req, res, next) => {
  try {
    const data = await Post.update(req.params.id, req.body)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', checkId, async (req, res, next) => {
  try {
    const data = await Post.remove(req.params.id)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message, stack: err.stack })
})

module.exports = router
