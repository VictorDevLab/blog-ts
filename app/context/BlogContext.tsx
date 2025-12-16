'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Blog {
  id: number;
  title: string;
  summary: string;
  content?: string;
  imageUrl?: string;
  category?: string;
}

interface BlogContextType {
  blogs: Blog[];
  addBlog: (blog: Omit<Blog, 'id'>) => void;
  updateBlog: (id: number, blog: Omit<Blog, 'id'>) => void;
  deleteBlog: (id: number) => void;
  getBlogById: (id: number) => Blog | undefined;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const initialBlogs: Blog[] = [
  {
    id: 1,
    title: "First Blog Post",
    summary: "This is the summary of the first blog post.",
    content: "This is the full content of the first blog post. You can add detailed information here.",
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&h=300&fit=crop",
    category: "Technology"
  },
  {
    id: 2,
    title: "Second Blog Post",
    summary: "This is the summary of the second blog post.",
    content: "This is the full content of the second blog post. You can add detailed information here.",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
    category: "Technology"
  },
  {
    id: 3,
    title: "Third Blog Post",
    summary: "This is the summary of the third blog post.",
    content: "This is the full content of the third blog post. You can add detailed information here.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-aeb19be489c7?w=500&h=300&fit=crop",
    category: "Space"
  },
];

export function BlogProvider({ children }: { children: ReactNode }) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);

  const addBlog = (blog: Omit<Blog, 'id'>) => {
    const newBlog: Blog = {
      ...blog,
      id: Math.max(...blogs.map(b => b.id), 0) + 1,
    };
    setBlogs([newBlog, ...blogs]);
  };

  const updateBlog = (id: number, blog: Omit<Blog, 'id'>) => {
    setBlogs(blogs.map(b => b.id === id ? { ...blog, id } : b));
  };

  const deleteBlog = (id: number) => {
    setBlogs(blogs.filter(b => b.id !== id));
  };

  const getBlogById = (id: number) => {
    return blogs.find(b => b.id === id);
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, updateBlog, deleteBlog, getBlogById }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlogContext() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlogContext must be used within BlogProvider');
  }
  return context;
}
