function Navbar() {
  return (
    <div className="flex justify-between align-center p-8">
        <div>
           <p className="text-2xl">Vic Blog</p>
        </div>
        <div>
            <ul className="flex align-middle gap-6">
                <li>
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