require('dotenv').config()
const User = require('../models/userModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const signUp = async(req,res) => {
    const {userName, password} = req.body;
    try {
        let user = await User.findOne({ userName });
        if (user) {
            return res.status(400).json({ msg: 'Username already exists, try again with different username'});
        }

        user = new User({userName, password});
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            (err, token) => {
                if(err) throw err;
                res.json({ token, userName, msg: "SignUp Successfull" });
            }            
        )
    }
    catch(error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

const signIn = async(req, res) => {
    const {userName, password} = req.body;
    try {
        let user = await User.findOne({ userName });
        if(!user) {
            return res.status(400).json({msg: 'User not found, please enter valid Username'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({msg: 'Wrong Password, please enter valid password'});
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            (err, token) => {
                if (err) throw err;
                res.json({ token, userName, msg: "SignIn Successfull" })
            }
        )
    }
    catch(error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

const authMiddleware = async(req, res, next) => { 
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.substring(7) === "null") {
            return res.status(401).json({ msg: 'Authorization denied, no valid token' });
        }
        const token = authHeader.substring(7);
        const data = JSON.parse(token);
        const key = data.token;
        const decode = jwt.verify(key, process.env.JWT_SECRET)
        req.user = await User.findById(decode.user.id).select('-password')
        next();
    }
    catch(error) {
        res.status(401).json({ msg: 'Authorization Denied' });
        console.error(error)
        next();
    }
}

const updatePassword = async (req, res) => {
    const {userName, oldPassword, newPassword} = req.body;
    try {
        let user = await User.findOne({ userName });
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch) {
            return res.status(400).json({msg: 'Old Password is Wrong!!'});
        }
        if(oldPassword === newPassword) {
            return res.status(400).json({msg: `New password shouldn't be the old password`});
        }
        const salt = await bcrypt.genSalt(10);
        const updatedPassword = await bcrypt.hash(newPassword, salt);
        await User.findOneAndUpdate({userName: userName}, {password: updatedPassword}, {new: true});
        res.status(200).json({msg: "Password Updated"});
    }
    catch(error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    signUp,
    signIn,
    authMiddleware,
    updatePassword
}