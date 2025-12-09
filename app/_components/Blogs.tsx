

interface Blog {
    id: number;
    title: string;
    summary: string;
}

type BlogsProps = {
    blogs: Blog[];
}

function Blogs({blogs}: BlogsProps) {
    return (
        <div className="mt-16">{
            blogs.map((blog) => (
                <div key={blog.id} className="border-b border-gray-300 pb-4 mb-4">
                    <h2 className="text-xl font-bold">{blog.title}</h2>
                    <p className="text-gray-600">{blog.summary}</p>
                </div>
            ))
        }</div>
    )
}

export default Blogs