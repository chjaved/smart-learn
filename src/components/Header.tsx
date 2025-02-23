// src/components/Header.tsx

import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">Smart Learn</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/aboutus" className="hover:text-gray-300">About Us</Link>
            </li>
            <li>
              <Link href="/contactus" className="hover:text-gray-300">Contact Us</Link>
            </li>
            <li>
              <Link href="/competitors" className="hover:text-gray-300">Competitors</Link>
            </li>
            <li>
              <Link href="/aitutor" className="hover:text-gray-300">AI Tutor</Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-gray-300">Pricing</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
