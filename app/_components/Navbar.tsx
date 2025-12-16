import Link from "next/link";

function Navbar() {

  return (
    <div className="flex justify-between align-center py-6">
      <div>
        <Link href="/" className="text-2xl font-bold text-amber-900">Blog</Link>
      </div>
      <div className="flex justify-center items-center">
        <ul className="flex align-middle gap-6">
          <li className="">
            <Link href="/" className="hover:text-amber-700 transition-colors">Home</Link>
          </li>
          <li>
            <Link href="/blogs" className="hover:text-amber-700 transition-colors">Blogs</Link>
          </li>
          <li>
            <Link href="#" className="hover:text-amber-700 transition-colors">Contact</Link>
          </li>
          <li>
            <Link href="#" className="hover:text-amber-700 transition-colors">About</Link>
          </li>
        </ul>
      </div>
      <div>
        <button className="border bg-black text-white px-10 py-3 hover:translate-y-1 transition-transform cursor-pointer rounded-lg">
          <Link href="/blogs/new">Create New Blog</Link>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
