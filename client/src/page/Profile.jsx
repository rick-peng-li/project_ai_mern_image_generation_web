import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Card, Loader } from '../components';

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let userResponse = await fetch(`/api/v1/user/${userId}`);
        let userData = await userResponse.json();

        if (!userData.data) {
          userResponse = await fetch('/api/v1/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: userId, email: `${userId}@example.com` }),
          });
          userData = await userResponse.json();
        }

        setUser(userData.data);

        const postsResponse = await fetch('/api/v1/post');
        const postsData = await postsResponse.json();
        const userPosts = postsData.data.filter(post => post.name === userData.data?.name);
        setPosts(userPosts.reverse());
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEditProfile = () => {
    alert('Edit profile feature coming soon!');
  };

  return (
    <section className="max-w-7xl mx-auto">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        <>
          <div className="bg-gradient-to-r from-[#6469ff] to-[#a855f7] rounded-2xl p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">{user?.name?.[0]}</span>
              </div>
              <div className="text-white text-center sm:text-left">
                <h1 className="text-2xl font-bold">{user?.name}</h1>
                <p className="text-white/80 mt-1">{user?.email}</p>
                <p className="text-white/80 mt-2 text-sm">{user?.bio || 'No bio yet'}</p>
              </div>
              <button
                onClick={handleEditProfile}
                className="ml-auto px-6 py-2 bg-white text-[#6469ff] font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Edit Profile
              </button>
            </div>
          </div>

          <div className="flex gap-8 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#222328]">{posts.length}</p>
              <p className="text-sm text-[#666e75]">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#222328]">0</p>
              <p className="text-sm text-[#666e75]">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#222328]">0</p>
              <p className="text-sm text-[#666e75]">Following</p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-[#222328] mb-4">My Creations</h2>
          {posts.length > 0 ? (
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
              {posts.map(post => (
                <Card key={post._id} {...post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[#666e75]">No posts yet. Create your first AI image!</p>
              <button
                onClick={() => navigate('/create-post')}
                className="mt-4 px-6 py-2 bg-[#6469ff] text-white font-medium rounded-lg hover:bg-[#535bf2] transition-colors"
              >
                Create Post
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Profile;