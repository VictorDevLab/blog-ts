import Blogs from "./_components/Blogs";
import Category from "./_components/Category";
import Hero from "./_components/Hero";
import Navbar from "./_components/Navbar";

export default function Home() {
  const blogs = [
    { id: 1, title: "First Blog Post", summary: "This is the summary of the first blog post." },
    { id: 2, title: "Second Blog Post", summary: "This is the summary of the second blog post." },
    { id: 3, title: "Third Blog Post", summary: "This is the summary of the third blog post." },
];
  return (
    <div className="px-12">
        <Navbar />
        <Hero />
        <Category />
        <Blogs blogs={blogs} />
    </div>
  );
}
