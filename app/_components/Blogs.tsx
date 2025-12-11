import Link from "next/link";
interface Blog {
    id: number;
    title: string;
    summary: string;
    imageUrl?: string;
}

type BlogsProps = {
    blogs: Blog[];
}

function Blogs({ blogs }: BlogsProps) {
    return (
        <>
            <div className="mt-16 grid md:grid-cols-3 sm:grid-cols-1 gap-1">{
                blogs.map((blog) => (
                    <Link href={`/blogs/${blog.id}`} key={blog.id} className="bg-[#DFDCD0] overflow-hidden border-1 border-amber-700 hover:translate-y-[-8px] transition-transform cursor-pointer">
                        {blog.imageUrl && (
                            <img src={blog.imageUrl} alt={blog.title} className="w-full h-64 object-cover" />
                        )}
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                            <p className="text-gray-600">{blog.summary}</p>
                        </div>
                    </Link>
                ))
            }
            </div>
            <div className="flex justify-center align-middle my-10">
                <button className="border bg-black text-white px-10 py-3 hover:translate-y-1 transition-transform cursor-pointer"><Link href="/blogs">Load More</Link></button>
            </div>
        </>
    )
}

export default Blogs