function Navbar() {
    return (
        <div className="flex justify-between align-center py-6">
            <div>
                <p className="text-2xl">Blog</p>
            </div>
            <div>
                <ul className="flex align-middle gap-6">
                    <li className="">
                        Tech
                    </li>
                    <li>
                        Fashion
                    </li>
                    <li>
                        Marketing
                    </li>
                    <li>
                        Career
                    </li>
                    <li>
                        Agriculture
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar