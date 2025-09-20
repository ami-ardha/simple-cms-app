import Link from 'next/link';
import { Home, Settings, X } from 'lucide-react';

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isSidebarOpen, toggleSidebar }: SidebarProps) {
  return (
    <>
      <div
        className={`bg-opacity-50 bg-primary-base fixed inset-0 z-30 md:hidden ${
          isSidebarOpen ? 'block' : 'hidden'
        }`}
        onClick={toggleSidebar}
      ></div>

      <aside
        className={`bg-background-dark fixed top-0 left-0 z-40 h-full w-64 transform border-r-2 p-4 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-primary-base text-2xl font-bold">SimpleCMS</h2>
          <button onClick={toggleSidebar} className="text-white md:hidden">
            <X size={24} />
          </button>
        </div>
        <nav>
          <ul>
            <li>
              <Link
                href="/"
                className="hover:text-primary-base flex items-center border-2 border-transparent p-2 font-semibold hover:bg-white"
              >
                <Home className="mr-3" />
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="hover:text-primary-base mt-2 flex items-center border-2 border-transparent p-2 font-semibold hover:bg-white"
              >
                <Settings className="mr-3" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
