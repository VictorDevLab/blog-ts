import Link from "next/link";

function Navbar() {

  return (
    <div className="flex justify-between align-center py-6">
      <div>
        <p className="text-2xl">Blog</p>
      </div>
      <div className="flex justify-center items-center">
        <ul className="flex align-middle gap-6">
          <li className="">Home</li>
          <li>Contact</li>
          <li>About</li>
          <li>Test</li>
        </ul>
      </div>
      <div>
        <button className="border bg-black text-white px-10 py-3 hover:translate-y-1 transition-transform cursor-pointer">
          <Link href="/blogs">Create New Blog</Link>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
