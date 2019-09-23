const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const {registerValidation} = require('../validation');
const {loginValidation} = require('../validation');

router.post('/register', async (req, res, next) => {
    
    //validating data before sending it to db
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).json({error: error.details[0].message});

    //checking whether the usear is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).json({error: 'Email already in the database'});

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const saveUser = await user.save();
        res.json({user: user.email});
    }catch(err){
        res.status(400).json({error: err});
    }

    next();
});
router.post('/login', async (req, res, next) => {
    //validating data before cheking it in DB
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).json({error: error.details[0].message});

    //cheking if email is in DB
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).json({error: 'Email is wrong'});

    //password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).json({error: 'Password is wrong'});

    //create and asign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN);
    res.header('auth-token', token).json({token: token});

    next();
});

module.exports = router;