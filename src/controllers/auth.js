const User = require('../models/user');
const Token = require('../models/token');

exports.register = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (user) return res.status(401).json({message: 'The email address you have entered is already associated with another account.'});
        const newUser = new User({ ...req.body, role: "basic" });
        const user_ = await newUser.save();
        res.status(200).json({message: 'User successfully created'});

    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user.comparePassword(password)) return res.status(401).json({message: 'Invalid email or password'});
        res.status(200).json({token: user.generateJWT(), user: user});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};