import Link from 'next/link';
// import Navigation from './Navigation';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="bg-white min-h-28 content-center">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo and site title */}
          <div className="flex items-center space-x-1 gap-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/islandis.svg"
                alt="Logo"
                width={160}
                height={32}
                className="mr-2"
              />
            </Link>
              <hr className="h-16 w-0.5 border-t-0 bg-black/35 dark:bg-black/10" />
              <div className='flex flex-col'>
                <span className="text-xl font-bold text-gray-700">Skatturinn</span>
                <span className="text-sm font-medium text-gray-500">Skattxxxxframtal x2025</span>
              </div>
          </div>
          
          {/* Navigation */}
          {/* <Navigation /> */}
          
          {/* Right side - account, search, etc */}
          <div className="flex items-center space-x-4 flex-row px-6">
            <button className="bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded-md flex font-medium flex-row items-center gap-2.5">
                <div className='rounded-2xl bg-amber-200 h-4 w-4'></div>
              Notandi Notandason
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;