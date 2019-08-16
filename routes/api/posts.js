const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const { check, validationResult } = require('express-validator');
const request = require('request');
const config = require('config');

// create a post 
router.post('/',[auth,[
    check('text','Text is required')
    .not()
    .isEmpty()
]],async(req,res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const newPost =new Post( {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })
        const post = await newPost.save();
        res.json(post);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error')
    }
    
});

// get all posts
router.get('/',auth,async(req,res)=>{
    try {
        const posts = await Post.find().sort({date:-1});
        res.json(posts);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error')
    }
});

// get post by id
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
           return res.status(404).json({msg:'Post not found'})
        }
        res.json(post);
    } catch (error) {
        console.log(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' })
        }
        res.status(500).send('Server error')
    }
});

// delete post by id
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'User not authorized'})
            
        }
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' })
        }
        await post.remove();
        res.json({msg: 'Post removed'});
    } catch (error) {
        console.log(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' })
        }
        res.status(500).send('Server error')
    }
})
module.exports = router;