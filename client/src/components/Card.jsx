import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { download } from '../assets';
import { downloadImage } from '../utils';

const Card = ({ _id, name, prompt, photo, likes = [], isFavorite = false }) => {
  const [liked, setLiked] = useState(likes.length > 0);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [favorited, setFavorited] = useState(isFavorite);

  const handleLike = async () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    try {
      const userId = localStorage.getItem('userId') || 'default-user';
      await fetch(`/api/v1/post/${_id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleFavorite = async () => {
    setFavorited(!favorited);
    try {
      const userId = localStorage.getItem('userId') || 'default-user';
      await fetch('/api/v1/favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, userName: name, postId: _id }),
      });
    } catch (error) {
      console.error('Error favoriting post:', error);
    }
  };

  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card overflow-hidden">
      <img
        className="w-full h-48 sm:h-64 object-cover rounded-xl"
        src={photo}
        alt={prompt}
      />
      <div className="absolute top-2 right-2 flex flex-col gap-2">
        <button
          onClick={handleLike}
          className={`p-2 rounded-full transition-colors ${liked ? 'bg-red-500' : 'bg-black/50 hover:bg-black/70'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill={liked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        <button
          onClick={handleFavorite}
          className={`p-2 rounded-full transition-colors ${favorited ? 'bg-yellow-500' : 'bg-black/50 hover:bg-black/70'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill={favorited ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </button>
      </div>
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <Link to={`/profile/${name}`} className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold hover:bg-green-600 transition-colors">
              {name[0]}
            </Link>
            <p className="text-white text-sm">{name}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white text-sm flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {likeCount}
            </span>
            <Link to={`/edit-post/${_id}`} className="p-1 hover:bg-white/20 rounded transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </Link>
            <button type="button" onClick={() => downloadImage(_id, photo)} className="outline-none bg-transparent border-none p-1 hover:bg-white/20 rounded transition-colors">
              <img src={download} alt="download" className="w-5 h-5 object-contain invert" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;