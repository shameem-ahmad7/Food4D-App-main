const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtSecret = "MynameisShameemKhan";

router.post("/createuser", [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  body('name').isLength({ min: 3 })
], async (req, res) => {


  let success = false
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() })
  }

  const salt = await bcrypt.genSalt(10);
  let secPassword = await bcrypt.hash(req.body.password, salt);

  try {
    await User.create({
      name: req.body.name,
      password: secPassword,
      email: req.body.email,
      location: req.body.location
    }).then(res.json({ success: true }))



  } catch (err) {
    console.log(err);
    res.json({ success: false })
  }
})


router.post("/loginuser", [
  body('email', "Enter a Valid Email").isEmail(),
  body('password', "Password cannot be blank").exists(),
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  let email = req.body.email;
  try {

    let userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ err: "Incorrect Credentials." })
    }

    const pwdCompare = await bcrypt.compare(req.body.password, userData.password);

    if (!pwdCompare) {
      return res.status(400).json({ err: "Incorrect Credentials." })
    }

    const data = {
      user: {
        id: userData._id
      }
    }

    const authToken = jwt.sign(data, jwtSecret);

    return res.json({ success: true, authToken: authToken })

  } catch (err) {
    console.log(err);
    res.json({ success: true });
  }

})

module.exports = router;