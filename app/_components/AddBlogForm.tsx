'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useBlogContext, Blog } from '../context/BlogContext';
import { useRouter } from 'next/navigation';

interface AddBlogFormProps {
  blogId?: number;
}

function AddBlogForm({ blogId }: AddBlogFormProps) {
  const { addBlog, updateBlog, getBlogById } = useBlogContext();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    imageUrl: '',
    category: 'Technology',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (blogId) {
      const blog = getBlogById(blogId);
      if (blog) {
        setFormData({
          title: blog.title,
          summary: blog.summary,
          content: blog.content || '',
          imageUrl: blog.imageUrl || '',
          category: blog.category || 'Technology',
        });
      }
    }
  }, [blogId, getBlogById]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (blogId) {
        updateBlog(blogId, formData);
      } else {
        addBlog(formData);
      }
      router.push('/blogs');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#DFDCD0] py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Link href="/blogs" className="text-amber-700 hover:underline mb-6 inline-block">
          ← Back to Blogs
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8 border border-amber-700">
          <h1 className="text-4xl font-bold mb-8 text-amber-900">
            {blogId ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Blog Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter an engaging title..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent"
              >
                <option value="Technology">Technology</option>
                <option value="Space">Space</option>
                <option value="Culture">Culture</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
              </select>
            </div>

            {/* Summary */}
            <div>
              <label htmlFor="summary" className="block text-sm font-semibold text-gray-700 mb-2">
                Blog Summary *
              </label>
              <textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                required
                placeholder="Write a brief summary of your blog post..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent"
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
                Blog Content *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                placeholder="Write the full content of your blog post..."
                rows={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent"
              />
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent"
              />
              {formData.imageUrl && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="max-w-xs h-auto rounded-lg border border-amber-700"
                    onError={() => {
                      console.error('Failed to load image');
                    }}
                  />
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-amber-700 text-white py-3 rounded-lg font-semibold hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Saving...' : (blogId ? 'Update Blog' : 'Publish Blog')}
              </button>
              <Link
                href="/blogs"
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBlogForm;
