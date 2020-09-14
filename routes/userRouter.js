const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register',(req, res, next)=>{
    let {username, password, firstName, lastName, address, phone} = req.body;
    User.findOne({username})
    .then ((user) =>{
        if(user){
            let err= 'User already exists.';
            err.status=401;
            return next(err);
        }
        bcrypt.hash(password, 8)
        .then(hashed=>{
            User.create({username, password:hashed, firstName, lastName, address, phone})
            .then(user=>{
                res.json({
                    status:'Registration Sucessful!'
                });
            }).catch(next);
        }).catch(next);
        }).catch(next);
})
router.post('/login',(req, res, next)=>{
    let{username, password} = req.body;
    User.findOne({username})
    .then((user)=>{
        if(!user){
            let err = new Error ('User donot exists.');
            err.status = 401;
            return next(err);
        }
        bcrypt.compare(password, user.password)
        .then((isMatched)=>{
            if(!isMatched){
                let err = new Error ('Password donot matched.');
                err.status = 401;
                return next(err);
            }
            let payload = {
              id:user.id,
              username:user.username,
              firstName:user.firstName,
              lastName:user.lastName
            }
            jwt.sign(payload, process.env.SECRET, (err, token)=>{
                if(err){
                    return next(err);
               
            }
            else{
                res.json({
                    username:user.username,
                    id:user.id,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    status:'Login Successful',
                    token:`Bearer ${token}`
                });
            }
        });
    }).catch(next);

}).catch(next);
})
router.get('/',(req, res)=>{
    User.find()
    .then((users)=>{
        res.json(users);
    }).catch((err)=> console.log(err));
 });


 router.get('/:user_id',(req, res)=>{
     User.findById(req.params.user_id)
     .then((user)=>{
         res.json(user);
     }).catch((err)=> console.log(err));
 })
 router.put('/:user_id',(req, res, next)=>{
    User.findByIdAndUpdate(req.params.user_id, {$set:req.body},{new:true})
    .then(updatedUser=>{
        res.json(updatedUser);
    }).catch(next);
})
router.delete('/:user_id',(req, res, next)=>{
    User.deleteOne({_id:req.params.user_id})
    .then(reply=>{
        res.json(reply);
    }).catch(next);
});

module.exports = router;
