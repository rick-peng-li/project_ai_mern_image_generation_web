import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { FormField, Loader } from '../components';

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    prompt: '',
    photo: '',
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/v1/post/${postId}`);
        const data = await response.json();
        if (data.success) {
          setForm({
            prompt: data.data.prompt,
            photo: data.data.photo,
          });
        } else {
          alert('Post not found');
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt) {
      setIsSubmitting(true);
      try {
        const response = await fetch(`/api/v1/post/${postId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();
        if (data.success) {
          alert('Post updated successfully');
          navigate('/');
        } else {
          alert('Failed to update post');
        }
      } catch (err) {
        alert(err);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert('Please provide a proper prompt');
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`/api/v1/post/${postId}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data.success) {
          alert('Post deleted successfully');
          navigate('/');
        } else {
          alert('Failed to delete post');
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Edit Post</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Update your AI-generated image details</p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="Describe your image..."
            value={form.prompt}
            handleChange={handleChange}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64 p-3 h-64 sm:h-80 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            ) : (
              <p className="text-gray-500">No image preview</p>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="submit"
            className="text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update Post'}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="text-white bg-red-600 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-red-700 transition-colors"
          >
            Delete Post
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditPost;