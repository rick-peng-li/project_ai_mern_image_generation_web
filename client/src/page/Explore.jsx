import React, { useState, useEffect } from 'react';

import { Card, FormField, Loader } from '../components';

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('recent');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const endpoint = filter === 'popular' ? '/api/v1/trending/popular' : '/api/v1/trending/recent';
        const response = await fetch(endpoint);
        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [filter]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredPosts = posts.filter(post =>
    post.name.toLowerCase().includes(searchText.toLowerCase()) ||
    post.prompt.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="font-extrabold text-[#222328] text-[32px]">Explore</h1>
          <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Discover amazing AI-generated images from the community</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('recent')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'recent'
                ? 'bg-[#6469ff] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Recent
          </button>
          <button
            onClick={() => setFilter('popular')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'popular'
                ? 'bg-[#6469ff] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Popular
          </button>
        </div>
        <div className="w-full sm:w-auto">
          <FormField
            labelName=""
            type="text"
            name="search"
            placeholder="Search images..."
            value={searchText}
            handleChange={handleSearchChange}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
          {filteredPosts.map(post => (
            <Card key={post._id} {...post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-[#666e75]">No posts found matching your criteria</p>
        </div>
      )}
    </section>
  );
};

export default Explore;