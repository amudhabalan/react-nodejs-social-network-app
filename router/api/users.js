const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// Register User
router.post(
  '/',
  [
    check('name', 'Please enter a name').notEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a password of minimum 6 characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check if user already exists
      if (await User.findOne({ email })) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Hash the password
      salt = await bcrypt.genSalt(10);

      hashedPassword = await bcrypt.hash(password, salt);
      // Get the Gravatar
      avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      // Save the user
      user = new User({
        name,
        email,
        avatar,
        password: hashedPassword
      });

      await user.save();

      //Send JWT
      jwt.sign(
        {
          user: {
            id: user.id
          }
        },
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.send({ token });
        }
      );
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }
);

module.exports = router;
