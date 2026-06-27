import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, Loader } from '../components';

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const userId = localStorage.getItem('userId') || 'default-user';
        const response = await fetch(`/api/v1/favorite/user/${userId}`);
        const data = await response.json();
        setFavorites(data.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">My Favorites</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">View and manage your favorite AI-generated images</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : favorites.length > 0 ? (
        <div className="mt-8 grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
          {favorites.map(post => (
            <Card key={post._id} {...post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-[#666e75]">No favorites yet. Start exploring and save your favorite images!</p>
          <button
            onClick={() => navigate('/explore')}
            className="mt-4 px-6 py-2 bg-[#6469ff] text-white font-medium rounded-lg hover:bg-[#535bf2] transition-colors"
          >
            Explore Images
          </button>
        </div>
      )}
    </section>
  );
};

export default Favorites;