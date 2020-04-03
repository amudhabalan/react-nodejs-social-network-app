const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const auth = require('../../middlewares/auth');
const { check, validationResult } = require('express-validator');

// @route GET /api/profiles/me
// @desc  Get current user profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ message: 'Profile not found' });
    }
    res.send(profile);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: 'Profile not found' });
  }
});

// @route GET /api/profiles/:user_id
// @desc  Get user profile by ID
// @access Public
router.get('/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ message: 'Profile not found' });
    }
    res.send(profile);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: 'Profile not found' });
  }
});

// @route GET /api/profiles
// @desc  Get all user profiles
// @access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    if (!profiles) {
      return res.status(400).json({ message: 'No Profiles found' });
    }
    res.send(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: 'No Profiles found' });
  }
});

// @route POST /api/profiles
// @desc  Create and update profile for the current user
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').notEmpty(),
      check('city', 'City is required').notEmpty(),
      check('company', 'Company is required').notEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, city, company } = req.body;
      profile = await Profile.findOne({
        user: req.user.id
      });

      if (!profile) {
        // Create new profile
        profile = new Profile({
          user: req.user.id,
          title,
          city,
          company
        });

        await profile.save();
        return res.send(profile);
      }

      //Update existing profile
      profile = await Profile.findOneAndUpdate(
        {
          user: req.user.id
        },
        { $set: { title, company, city } },
        { new: true }
      );

      return res.send(profile);
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ message: 'Profile not found' });
    }
  }
);

// @route DELETE /api/profiles
// @desc  Delete current user profile
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    const deleted = await Profile.findOneAndRemove({
      user: req.user.id
    });
    if (deleted) {
      return res.send('Profile Deleted');
    }

    return res.send('Profile not Deleted');
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: 'Profile not Deleted' });
  }
});

module.exports = router;
