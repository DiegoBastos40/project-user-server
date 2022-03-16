const router = require("express").Router();
const authRoutes = require("./auth.routes");
const {isAuthenticated} = require('../middleware/jwt.middleware');
const mongoose = require('mongoose');
const Personal = require('../models/Form.Trainner');
const User = require('../models/User.model');


router.post('/trainnerform', isAuthenticated, (req, res, next) => {
  const {name, email, typeOfWorkout, workoutFrequency, workoutSessionTime, hasInjuries, injuriesDetails, drink, smoke, workedoutBefore, dietType, supplements} = req.body;
console.log(req.body)
  const {_id} = req.payload



  Personal.create({name, email, typeOfWorkout, workoutFrequency, workoutSessionTime, injuries: {hasInjuries, injuriesDetails}, drink, smoke, workedoutBefore, dietType, supplements })
    .then((newTrainner) => {
      return User.findByIdAndUpdate(_id, { $push: { ptRequest: newTrainner._id } }, { new: true });
    })
    .then((response) => res.json(response))
    .catch((err) => next(err));
});





router.get('/trainnerform', (req, res, next) => {
  Personal.find()
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});



router.get('/trainnerform/:trainnerId', (req, res, next) => {
  const { trainnerId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(trainnerId)) {
    res.status(400).json({ message: 'Specified Id is not valid' });
    return;
  }

  Personal.findById(trainnerId)
    .then((response) => { 
     console.log(response)
      res.json(response)
    })
    .catch((err) => res.json(err));
});

router.put('/trainnerform/:trainnerId', (req, res, next) => {
  const { trainnerId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(trainnerId)) {
    res.status(400).json({ message: 'Specified Id is not valid' });
    return;
  }

  Personal.findByIdAndUpdate(trainnerId, req.body, { new: true })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.delete('/trainnerform/:trainnerId', (req, res, next) => {
  const { trainnerId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(trainnerId)) {
    res.status(400).json({ message: 'Specified Id is not valid' });
    return;
  }

  Personal.findByIdAndRemove(trainnerId)
    .then((deletedTrainner) => {
      return User.findByIdAndUpdate(deletedTrainner.user, { $pull: { trainnerform: trainnerId } }).then(() =>
        res.json({ message: `Trainner with ${trainnerId} was removed successfully` })
      );
    })
    .catch((err) => res.json(err));
});



module.exports = router;






