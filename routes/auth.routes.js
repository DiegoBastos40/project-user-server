const router = require('express').Router();

// ℹ️ Handles password encryption
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

function TotalCaloricWaste(profile) {
  console.log(profile);
  const sum = 10*(profile.weight)+6.25*(profile.height)-5*(profile.age);
  if (profile.gender === 'Male' && profile.lifestyle === 'Sedentary (Very little or no exercise, and desk job)') {
      return (sum + 5)*1.2
  } else if (profile.gender === 'Male' && profile.lifestyle === 'Lightly Active (Light exercise 1 to 3 days per week)') {
      return (sum + 5)*1.375
  } else if (profile.gender === 'Male' && profile.lifestyle === 'Moderately Active (Moderate exercise 3 to 5 days per week)') {
      return (sum + 5)*1.55
  } else if (profile.gender === 'Male' && profile.lifestyle === 'Very Active (Heavy exercise 6 to 7 days per week)') {
      return (sum + 5)*1.725
  } else if (profile.gender === 'Male' && profile.lifestyle === 'Extremely Active (Very intense exercise, and physical job,exercise multiple times per day)') {
      return (sum + 5)*1.9
  } else if (profile.gender === 'Female' && profile.lifestyle === 'Sedentary (Very little or no exercise, and desk job)') {
      return (sum - 161)*1.2
  } else if (profile.gender === 'Female' && profile.lifestyle === 'Lightly Active (Light exercise 1 to 3 days per week)') {
      return (sum - 161)*1.375
  } else if (profile.gender === 'Female' && profile.lifestyle === 'Moderately Active (Moderate exercise 3 to 5 days per week)') {  
      return (sum - 161)*1.55
  } else if (profile.gender === 'Female' && profile.lifestyle === 'Very Active (Heavy exercise 6 to 7 days per week)') {
      return (sum - 161)*1.725
  } else if (profile.gender === 'Female' && profile.lifestyle === 'Extremely Active (Very intense exercise, and physical job, exercise multiple times per day)') {
      return (sum - 161)*1.9

  }
  
}
// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require('../models/User.model');

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes

const { isAuthenticated } = require('../middleware/jwt.middleware');

router.get('/verify', isAuthenticated, (req, res, next) => {
  console.log('req.payload', req.payload);

  res.status(200).json(req.payload);
});

router.post('/signup', (req, res) => {
  const { username, password, name, age, gender, height, weight, objective, lifestyle} = req.body;
  const totalCalories = TotalCaloricWaste(req.body)

  if (!username) {
    return res.status(400).json({ errorMessage: 'Please provide your username.' });
  }

  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: 'Your password needs to be at least 8 characters long.',
    });


  
  }
 
  //   ! This use case is using a regular expression to control for special characters and min length
  /*
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  if (!regex.test(password)) {
    return res.status(400).json( {
      errorMessage:
        "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
  }
  */

  // Search the database for a user with the username submitted in the form
  User.findOne({ username }).then((found) => {
    // If the user is found, send the message username is taken
    if (found) {
      return res.status(400).json({ errorMessage: 'Username already taken.' });
    }

    // if user is not found, create a new user - start with hashing the password
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        // Create a user and save it in the database
        return User.create({
          username,
          password: hashedPassword,
          name,
          age,
          gender,
          height,
          weight,
          objective,
          lifestyle,
          totalCalories,
        });
      })
      .then((user) => {
        // Bind the user to the session object
        console.log (TotalCaloricWaste(user))
        req.session.user = user;
        res.status(201).json(user);
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).json({
            errorMessage: 'Username need to be unique. The username you chose is already in use.',
          });
        }
        return res.status(500).json({ errorMessage: error.message });
      });
  });
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ errorMessage: 'Please provide your username.' });
  }

  // Here we use the same logic as above
  // - either length based parameters or we check the strength of a password
  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: 'Your password needs to be at least 8 characters long.',
    });
  }

  // Search the database for a user with the username submitted in the form
  User.findOne({ username })
    .then((user) => {
      // If the user isn't found, send the message that user provided wrong credentials
      if (!user) {
        return res.status(400).json({ errorMessage: 'Wrong credentials.' });
      }

      // If user is found based on the username, check if the in putted password matches the one saved in the database
      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res.status(400).json({ errorMessage: 'Wrong credentials.' });
        }
        //jwt
        const { _id, username, ptRequest } = user;
        const payload = { _id, username, ptRequest};
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: 'HS256',
          expiresIn: '240h',
        });

        // req.session.user = user._id; // ! better and safer but in this case we saving the entire user object
        return res.status(200).json({ authToken });
      });
    })

    .catch((err) => {
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      next(err);
      // return res.status(500).render("login", { errorMessage: err.message });
    });
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }
    res.json({ message: 'Done' });
  });
});

module.exports = router;