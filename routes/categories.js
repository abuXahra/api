const router = require('express').Router();
const Category = require('../models/categoryModel');


//CREATE CATEGORY
router.post('/', async (req, res) => {
    const newCat = new Category(req.body);
    try {
        const category = await newCat.save();
        return res.status(200).json(category)
    } catch (err) {
        return res.status(500).json(err);
    }
})



///GET ALL CATEGORY
router.get('/', async (req, res) => {
    try {
        const category = await Category.find({})
        return res.status(200).json(category);
    } catch (err) {
        return res.status(500).json(err);
    }
})


//GET ONE CATEGORY
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        return res.status(200).json(category);
    } catch (err) {
        return res.status(500).json(err)
    }
});



// UPDATE CATEGORY
// router.put('/:id', async (req, res) => {
//     try {
//         const updatedcategory = await Post.findByIdAndUpdate(
//             req.params.id,
//             { $set: req.body },
//             { new: true });
//         return res.status(200).json(updatedcategory);
//     } catch (err) {
//         return res.status(500).json(err)
//     }

// })


router.delete('/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        // Find the blog post by ID and remove it
        const deletedPost = await Post.findByIdAndRemove(postId);

        if (!deletedPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        return res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});









module.exports = router;






















