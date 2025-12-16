'use client';

import { useBlogContext } from '@/app/context/BlogContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

function BlogDetail() {
  const params = useParams();
  const blogId = parseInt(params.blogId as string);
  const { getBlogById, deleteBlog } = useBlogContext();
  const router = useRouter();

  const blog = getBlogById(blogId);

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#DFDCD0] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link
            href="/blogs"
            className="inline-block bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-800 transition-colors"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      deleteBlog(blogId);
      router.push('/blogs');
    }
  };

  return (
    <div className="min-h-screen bg-[#DFDCD0]">
      {/* Header */}
      <div className="bg-white border-b border-amber-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/blogs" className="text-amber-700 hover:underline mb-4 inline-block">
            ← Back to Blogs
          </Link>
          <h1 className="text-5xl font-bold text-amber-900 mb-2">{blog.title}</h1>
          {blog.category && (
            <p className="text-amber-700 font-semibold text-lg">{blog.category}</p>
          )}
        </div>
      </div>

      {/* Featured Image */}
      {blog.imageUrl && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-96 object-cover rounded-lg border border-amber-700"
          />
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Summary */}
        <div className="bg-amber-50 border-l-4 border-amber-700 p-6 mb-8 rounded">
          <p className="text-xl text-gray-700 italic">{blog.summary}</p>
        </div>

        {/* Content */}
        <article className="prose prose-lg max-w-none mb-12">
          <div className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
            {blog.content}
          </div>
        </article>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-8 border-t border-gray-300">
          <Link
            href={`/blogs/edit/${blogId}`}
            className="bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-800 transition-colors font-semibold"
          >
            Edit Post
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            Delete Post
          </button>
          <Link
            href="/blogs"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
          >
            View All Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;