import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

FavoriteSchema.index({ userId: 1, postId: 1 }, { unique: true });

export default mongoose.model('Favorite', FavoriteSchema);