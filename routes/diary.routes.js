const router = require("express").Router();
const authRoutes = require("./auth.routes");
const {isAuthenticated} = require('../middleware/jwt.middleware');
const mongoose = require('mongoose');
const Food = require('../models/Food.model');
const User = require('../models/User.model');


router.post('/diary', isAuthenticated, (req, res, next) => {
  const {name, calories, protein, carbohydrates, fat, quantity } = req.body;

  const {_id} = req.payload



  Food.create({name, calories, protein, carbohydrates, fat, quantity })
    .then((newFood) => {
      return User.findByIdAndUpdate(_id, { $push: { foodCreated: newFood._id } }, { new: true });
    })
    .then((response) => res.json(response))
    .catch((err) => next(err));
});





router.get('/diary', (req, res, next) => {
  Food.find()
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});



router.get('/diary/:foodId', (req, res, next) => {
  const { foodId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(foodId)) {
    res.status(400).json({ message: 'Specified Id is not valid' });
    return;
  }

  Food.findById(foodId)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.put('/diary/:foodId', (req, res, next) => {
  const { foodId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(foodId)) {
    res.status(400).json({ message: 'Specified Id is not valid' });
    return;
  }

  Food.findByIdAndUpdate(foodId, req.body, { new: true })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.delete('/diary/:foodId', (req, res, next) => {
  const { foodId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(foodId)) {
    res.status(400).json({ message: 'Specified Id is not valid' });
    return;
  }

  Food.findByIdAndRemove(foodId)
    .then((deletedFood) => {
      return User.findByIdAndUpdate(deletedFood.user, { $pull: { diary: diaryId } }).then(() =>
        res.json({ message: `Food with ${foodId} was removed successfully` })
      );
    })
    .catch((err) => res.json(err));
});



module.exports = router;






