const router = require('express').Router();
const { constants } = require('crypto');
const User = require('../models/userModel')
const bcrypt = require('bcrypt');


// REGISTER
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPass
        });

        const user = await newUser.save();
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err);
    }
})

//LOGIN

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })

        if (!user) { //if user not found
            return res.status(400).json('Wrong credentials!')
        }

        const validated = await bcrypt.compare(req.body.password, user.password)
        if (!validated) { //if password not validated
            return res.status(400).json('Wrong credentials!')
        }

        const { password, ...others } = user._doc;
        return res.status(200).json(others)

    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;