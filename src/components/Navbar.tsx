// components/Navbar.tsx

import Link from 'next/link';
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <a className="text-white text-xl font-bold">MyApp</a>
        </Link>
        <div className="flex space-x-4">
          <Link href="/publications">
            <Button variant="link" className="text-white">Publications</Button>
          </Link>
          <Link href="/CreatePublication">
            <Button variant="primary">Create Publication</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
