const router = require('express').Router();
const User = require('../model/User')
const verify = require('./verifyToken');

router.get('/get', verify, async (req, res, next) => {
    const user = await User.findOne({_id: req.user._id});
    res.json({
        list: user.taskList 
    });
    next();
});

router.post('/post', verify, async (req, res, next) => {
   try{ const update = await User.updateOne({_id: req.user._id}, {
           $set: {
               taskList: req.body.taskList
           }
       })}
    catch(err){console.log(err)};
    const user = await User.findOne({_id: req.user._id});
    res.json({
        list: user.taskList 
    });
    next();
});

module.exports = router;