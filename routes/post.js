const router = require('express').Router();
const User = require('../models/userModel')
const Post = require('../models/postModel');
const mongoose = require('mongoose')


//CREATE POST
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const post = await newPost.save();
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err);
    }
})


// UPDATE POST
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    { $set: req.body },
                    { new: true });
                return res.status(200).json(updatedPost);
            } catch (err) {
                return res.status(500).json(err)
            }
        } else {
            return res.status(401).json('You can update only your post')
        }

    } catch (err) {
        return res.status(500).json(err);
    }


})


//DELETE POST
// router.delete('/:id', async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);
//         if (post.username === req.body.username) {
//             try {
//                 await post.delete();
//                 res.status(200).json("Post has been deleted");
//             } catch (err) {
//                 res.status(500).json(err)
//             }
//         } else {
//             res.status(401).json('You can delete only your post')
//         }

//     } catch (err) {
//         res.status(500).json(err);
//     }
// })





router.delete('/:id', async (req, res) => {

    try {
        const postId = req.params.id;
        // Find the blog post by ID and remove it
        if (postId.username === req.body.username) {
            try {
                // const deletedPostId = 
                await Post.findByIdAndRemove(postId);
                // if (!deletedPostId) {
                //     return res.status(404).json({ message: 'Blog post not found' });
                // }
                return res.status(200).json({ message: 'Blog post deleted successfully' });
            } catch (error) {
                res.status(401).json('You can delete only your post')
            }

        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});







//GET ONE POST
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json(err)
    }
});



//GET ONE POST
router.get('/', async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username })
        } else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName]
                }
            })
        } else {
            posts = await Post.find({}).sort({ createdAt: -1 });
        }
        return res.status(200).json(posts);
    } catch (err) {
        return res.status(500).json(err)
    }
});

module.exports = router;






















