'use client';

import Blogs from "./_components/Blogs";
import Category from "./_components/Category";
import Hero from "./_components/Hero";
import Navbar from "./_components/Navbar";
import { useBlogContext } from "./context/BlogContext";

export default function Home() {
  const { blogs } = useBlogContext();
  
  // Show only the first 6 blogs on the home page
  const displayBlogs = blogs.slice(0, 6);

  return (
    <div className="">
        <Navbar />
        <Hero />
        <Category />
        <Blogs blogs={displayBlogs} />
    </div>
  );
}
