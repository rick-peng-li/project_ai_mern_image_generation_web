import express from 'express';
import Favorite from '../mongodb/models/favorite.js';
import Post from '../mongodb/models/post.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { userId, userName, postId } = req.body;
    const existingFavorite = await Favorite.findOne({ userId, postId });
    if (existingFavorite) {
      await Favorite.findByIdAndDelete(existingFavorite._id);
      return res.status(200).json({ message: 'Favorite removed', data: false });
    }
    const favorite = await Favorite.create({ userId, userName, postId });
    res.status(201).json({ data: true, favorite });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const favorites = await Favorite.find({ userId }).sort({ createdAt: -1 });
    const postIds = favorites.map(f => f.postId);
    const posts = await Post.find({ _id: { $in: postIds } });
    const postsWithFavorite = posts.map(post => ({
      ...post.toObject(),
      isFavorite: true,
    }));
    res.status(200).json({ data: postsWithFavorite });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/check/:userId/:postId', async (req, res) => {
  try {
    const { userId, postId } = req.params;
    const favorite = await Favorite.findOne({ userId, postId });
    res.status(200).json({ data: !!favorite });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Favorite.findByIdAndDelete(id);
    res.status(200).json({ message: 'Favorite removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;