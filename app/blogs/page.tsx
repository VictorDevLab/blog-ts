'use client';

import { useBlogContext } from '@/app/context/BlogContext';
import Navbar from '@/app/_components/Navbar';
import Link from 'next/link';

function BlogsPage() {
  const { blogs } = useBlogContext();

  return (
    <div className="min-h-screen bg-[#DFDCD0]">
      <Navbar />

      {/* Header Section */}
      <div className="bg-white border-b border-amber-700 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-amber-900 mb-2">All Blog Posts</h1>
              <p className="text-gray-600">Explore our collection of articles</p>
            </div>
            <Link
              href="/blogs/new"
              className="bg-amber-700 text-white px-8 py-3 rounded-lg hover:bg-amber-800 transition-colors font-semibold whitespace-nowrap"
            >
              + New Post
            </Link>
          </div>
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-6">No blog posts yet. Create your first one!</p>
            <Link
              href="/blogs/new"
              className="inline-block bg-amber-700 text-white px-8 py-3 rounded-lg hover:bg-amber-800 transition-colors font-semibold"
            >
              Create Your First Blog Post
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-6">
            {blogs.map((blog) => (
              <Link
                href={`/blogs/${blog.id}`}
                key={blog.id}
                className="bg-white overflow-hidden border border-amber-700 rounded-lg hover:shadow-lg hover:translate-y-[-8px] transition-all cursor-pointer group"
              >
                {blog.imageUrl && (
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
                  />
                )}
                <div className="p-6">
                  {blog.category && (
                    <span className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                      {blog.category}
                    </span>
                  )}
                  <h2 className="text-xl font-bold mb-3 text-amber-900 group-hover:text-amber-700 transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-2">{blog.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogsPage;
