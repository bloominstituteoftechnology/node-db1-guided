const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

// ##########
//    GET
// ##########

router.get('/', async (req, res) => {
    try {
        const posts = await db("posts");
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const post = await db("posts").where({ id: id });
        (post.length !== 0)
            ?
                res.status(200).json(post)
            :
                res.status(404).json({ message: "Post not found."})
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ##########
//    POST
// ##########

router.post('/', async (req, res) => {
    const {title, contents} = req.body;

    try {
        // Check if req.body is valid and contains title and contents
        (title === undefined || contents === undefined) && res.status(400).json({ message: "Title and Contents are missing"}).end()

        // If req.body is valid, attempt to insert into the database
        const newPostId = await db('posts').insert({ title: title, contents: contents })
        
        // Check if our insert call returned a valid post id
        if (newPostId.length) {
            // If id is valid: select * from posts where id=newPostId[0]
            const addedPost = await db("posts").where({ id: newPostId[0]});
            res.status(200).json(addedPost)
        }
        else {
            // If id is not valid: something went wrong :(
            res.status(400).json({ message: "Post was not added"})
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ##########
//    PUT
// ##########

router.put('/:id', async (req, res) => {
        const {title, contents} = req.body;
        const {id} = req.params;

        try {
            // Check if req.body is valid and contains title and contents
            (title === undefined || contents === undefined) && res.status(400).json({ message: "Title and Contents are missing"}).end()
            
            // Check if a post exists at ID
            const existingPost = await db('posts').where({ id: (id) ? id : 0 }).limit(1);
            !(existingPost.length) && res.status(400).json({ message: "Post id is not valid"}).end()

            // If post is valid: update posts set title=title, contents=contents where id=id
            const isUpdated = await db('posts').where({ id: id }).update({title: title, contents: contents });

            if (isUpdated) {
                // If updated returned a value, select the newly updated post and return the results
                const updatedPost = await db('posts').where({ id: (id) ? id : 0 }).limit(1);
                res.status(200).json(updatedPost)
            }
            else {
                // If there was an error updating
                res.status(400).json({ message: "Post could not be updated"})
            }
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
});

// ##########
//   DELETE
// ##########

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        // Check if a post exists at ID
        const existingPost = await db('posts').where({ id: (id) ? id : null }).limit(1);
        !(existingPost.length) && res.status(400).json({ message: "Post id is not valid"})

        // If post exists, delete it
        const result = await db('posts').where({ id: id }).del();
        (result)
            ?
                res.status(200).json({ message: `Post ${id} has been deleted` })
            :
                res.status(200).json({ message: `Post ${id} could not be deleted` })
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;