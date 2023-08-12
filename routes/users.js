const router = require('express').Router();
const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const Post = require('../models/postModel');

// UPDATE
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body
                }, { new: true });

            return res.status(200).json(updateUser);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(401).json('You can update only your account');
    }

})

//DELETE
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            try {
                await Post.deleteMany({ username: user.username }) //deleting users post
                await User.findByIdAndDelete(req.params.id)
                return res.status(200).json('User has been deleted...');
            } catch (err) {
                return res.status(500).json(err);
            }
        } catch (err) {
            return res.status(404).json("User not found!")
        }

    }
    else {
        return res.status(401).json('You can delete only your account!');
    }

});


//GET ONE USER 
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        return res.status(200).json(others);
    } catch (err) {
        return res.status(500).json(err)
    }
});



//GET ALL USERS
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json(err)
    }
});

module.exports = router;























// router.delete('/:id', async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ error: "No such user" });
//     }

//     const user = await User.findOneAndDelete({ _id: id })

//     if (!user) {
//         return res.status(404).json({ error: "No such user" })
//     }

//     return res.status(200).json(user)

// })




// // GET ALL USERS
// router.get('/', async (req, res) => {

//     const users = await User.find({}).sort({ createdAt: -1 })
//     res.status(200).json(users)
//     console.log(users)
// });




// // GET ONE USER
// router.get('/:id', getUser = async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ error: "No such user" });
//     }

//     const user = await User.findById(id);

//     if (!user) {
//         res.status(404).json({ error: " NO such user" })
//     }

//     res.status(200).json(user)
// });




