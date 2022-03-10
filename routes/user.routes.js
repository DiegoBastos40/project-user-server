const router = require("express").Router();
const authRoutes = require("./auth.routes");
const mongoose = require('mongoose');
const {isAuthenticated} = require('../middleware/jwt.middleware');
const User = require('../models/User.model');


//GET PROFILE


router.put('/user', (req, res, next) => {
    const {userId, name, age, gender, height, weight, objesctive, lifestyle} = req.body;
    
    const {user} = req.payload;    
});


function TotalCaloricWaste(profile) {
    const sum = 10*(profile.weight)+6.25*(profile.height)-5*(profile.age);
    if (profile.gender === 'male' && profile.lifestyle === 'Light Active') {
        return (sum + 5)*1.2
    } else if (profile.gender === 'male' && profile.lifestyle === 'light active') {
        return (sum + 5)*1.375
    } else if (profile.gender === 'male' && profile.lifestyle === 'moderately active') {
        return (sum + 5)*1.55
    } else if (profile.gender === 'male' && profile.lifestyle === 'very active') {
        return (sum + 5)*1.725
    } else if (profile.gender === 'male' && profile.lifestyle === 'extra active') {
        return (sum + 5)*1.9
    } else if (profile.gender === 'female' && profile.lifestyle === 'light active') {
        return (sum - 161)*1.2
    } else if (profile.gender === 'female' && profile.lifestyle === 'light active') {
        return (sum - 161)*1.375
    } else if (profile.gender === 'female' && profile.lifestyle === 'moderately active') {
        return (sum - 161)*1.55
    } else if (profile.gender === 'female' && profile.lifestyle === 'very active') {
        return (sum - 161)*1.725
    } else if (profile.gender === 'female' && profile.lifestyle === 'extra active') {
        return (sum - 161)*1.9
 
    }
}




module.exports = router;