const router = require("express").Router();
const authRoutes = require("./auth.routes");
const mongoose = require('mongoose');
const {isAuthenticated} = require('../middleware/jwt.middleware');
const User = require('../models/User.model');


router.get('/user', isAuthenticated, (req, res, next) => {
    const user = req.payload
    console.log(user);
    User.findById(req.payload._id)
    .populate('ptRequest foodCreated' )
      .then((response) => {console.log(response)
    res.json(response)
    })
      
      .catch((err) => res.json(err));
  });


router.put('/user', isAuthenticated, (req, res, next) => {
    const {name, age, gender, height, weight, objective, lifestyle} = req.body;
    
    console.log(req.payload);
    const {_id} = req.payload;

    
    User.findByIdAndUpdate(_id, {name, age, gender, height, weight, objective, lifestyle}, {new:true}) 
    .then(updatedUser => {
        console.log (TotalCaloricWaste(updatedUser));
        TotalCaloricWaste(updatedUser);
        //const result = TotalCaloricWaste(updatedUser)
        
    }) 
    .then((response) => res.json(response))
    .catch((err) => res.json(err)); 
});






module.exports = router;