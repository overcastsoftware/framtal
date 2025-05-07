import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className="bg-gray-100 p-4 mb-8">
      <ul className="flex space-x-6">
        <li>
          <Link href="/" className="hover:text-blue-600 font-medium">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-blue-600 font-medium">
            About
          </Link>
        </li>
        <li>
          <Link href="/services" className="hover:text-blue-600 font-medium">
            Services
          </Link>
        </li>
        <li>
          <Link href="/blog" className="hover:text-blue-600 font-medium">
            Blog
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-blue-600 font-medium">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;