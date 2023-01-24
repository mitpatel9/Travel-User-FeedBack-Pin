const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validate } = require('../models/Pin');

//create a User

router.post('/register', async (req, res) => {
    try {
        //generate password
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(req.body.password, salt);
        //crete new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashpassword
        })
        // save user and send responce
        const user = await newUser.save();
        res.status(200).json(user);
        console.log(user)
    } catch (err) {
        res.status(500).json(
            {
                status: "Fail",
                data: {
                    err
                }
            });
            console.log(err)
    }
})

//login

router.post('/login', async (req, res) => {
    try {
        //find use
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(400).json({
            status: 'Wrong Password And Username'
        });
        //validation of password
        const validpass = await bcrypt.compare(req.body.password, user.password);
        !validpass && res.status(400).json({
            status: 'Wrong Password And Username'
        });
        //send res
        res.status(200).json({
            status: 'sucsses',
            info: {
                _id:user._id,
                name:user.username
            }
        })

    } catch (err) {
        res.status(400).json({
            status: "Wrong Password And Username",
            data: {
                err
            }
        })
    }
})


module.exports = router;