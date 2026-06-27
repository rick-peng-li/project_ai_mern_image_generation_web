import express from 'express';
import User from '../mongodb/models/user.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id) || await User.findOne({ name: id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, bio } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ data: existingUser });
    }
    const user = await User.create({ name, email, bio });
    res.status(201).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bio } = req.body;
    const user = await User.findByIdAndUpdate(id, { name, bio }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).limit(20);
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;