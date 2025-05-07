import Link from 'next/link';
// import Navigation from './Navigation';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="bg-white min-h-28 px-12 content-center">
      <div className="container h-[112px] mx-auto px-4">
        <div className="flex h-full justify-between items-center">
          {/* Logo and site title */}
          <div className="flex h-full items-center space-x-1 gap-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/islandis.svg"
                alt="Logo"
                width={160}
                height={32}
                className="mr-2"
              />
            </Link>
              <hr className="h-full w-0.5 border-t-0 bg-secondary-purple-100" />
              <div className='flex flex-col'>
                <span className="text-sm font-bold text-gray-700">Skatturinn</span>
                <span className="text font-medium text-gray-600">Skattframtal x2025</span>
              </div>
          </div>
          
          {/* Navigation */}
          {/* <Navigation /> */}
          
          {/* Right side - account, search, etc */}
          <div className="flex items-center space-x-4 flex-row px-6">
            <button className="bg-white border border-primary-blue-200 hover:bg-gray-200 text-black px-4 py-2 rounded-md flex font-medium flex-row items-center gap-2.5">
                <div className='rounded-2xl bg-amber-200 h-4 w-4 text-sm'></div>
              Notandi Notandason
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;