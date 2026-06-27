import express from 'express';
import Post from '../mongodb/models/post.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/recent', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(12);
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/popular', async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $addFields: {
          likesCount: { $size: { $ifNull: ['$likes', []] } },
        },
      },
      {
        $sort: { likesCount: -1 },
      },
      {
        $limit: 20,
      },
    ]);
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;