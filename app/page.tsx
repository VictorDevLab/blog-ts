import Blogs from "./_components/Blogs";
import Category from "./_components/Category";
import Hero from "./_components/Hero";
import Navbar from "./_components/Navbar";

export default function Home() {
  const blogs = [
    { id: 1, title: "First Blog Post", summary: "This is the summary of the first blog post.", imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&h=300&fit=crop" },
    { id: 2, title: "Second Blog Post", summary: "This is the summary of the second blog post.", imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop" },
    { id: 3, title: "Third Blog Post", summary: "This is the summary of the third blog post.", imageUrl: "https://images.unsplash.com/photo-1460925895917-aeb19be489c7?w=500&h=300&fit=crop" },
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
