interface Blog {
    id: number;
    title: string;
    summary: string;
    imageUrl?: string;
}

type BlogsProps = {
    blogs: Blog[];
}

function Blogs({blogs}: BlogsProps) {
    return (
        <div className="mt-16 grid grid-cols-3 gap-1">{
            blogs.map((blog) => (
                <div key={blog.id} className="bg-white overflow-hidden border-1 border-amber-700">
                    {blog.imageUrl && (
                        <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover" />
                    )}
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                        <p className="text-gray-600">{blog.summary}</p>
                    </div>
                </div>
            ))
        }</div>
    )
}

export default Blogs