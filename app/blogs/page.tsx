import Category from "../_components/Category";
import Hero from "../_components/Hero";
import Navbar from "../_components/Navbar";

function page() {
  const blogs = [
    {
      id: 1,
      title: "First Blog Post",
      summary: "This is the summary of the first blog post.",
      imageUrl:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Second Blog Post",
      summary: "This is the summary of the second blog post.",
      imageUrl:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Third Blog Post",
      summary: "This is the summary of the third blog post.",
      imageUrl:
        "https://images.unsplash.com/photo-1460925895917-aeb19be489c7?w=500&h=300&fit=crop",
    },
    {
      id: 4,
      title: "First Blog Post",
      summary: "This is the summary of the first blog post.",
      imageUrl:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&h=300&fit=crop",
    },
    {
      id: 5,
      title: "Second Blog Post",
      summary: "This is the summary of the second blog post.",
      imageUrl:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
    },
    {
      id: 6,
      title: "Third Blog Post",
      summary: "This is the summary of the third blog post.",
      imageUrl:
        "https://images.unsplash.com/photo-1460925895917-aeb19be489c7?w=500&h=300&fit=crop",
    },
  ];
  return (
    <div>
      <Navbar />
      <Hero />
      <Category />
      <div className="mt-16 grid md:grid-cols-3 sm:grid-cols-1 gap-1">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white overflow-hidden border-1 border-amber-700 hover:translate-y-[-8px] transition-transform cursor-pointer"
          >
            {blog.imageUrl && (
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              <p className="text-gray-600">{blog.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
