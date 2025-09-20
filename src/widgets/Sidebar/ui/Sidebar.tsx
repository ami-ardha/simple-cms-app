'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Home, Settings, X } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isSidebarOpen, toggleSidebar }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (href: string) => {
    router.push(href);
    if (isSidebarOpen) {
      toggleSidebar();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, href: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleNavigate(href);
    }
  };

  return (
    <>
      <button
        aria-label="Close sidebar"
        className={clsx('bg-opacity-50 fixed inset-0 z-30 bg-black md:hidden', {
          block: isSidebarOpen,
          hidden: !isSidebarOpen,
        })}
        onClick={toggleSidebar}
      ></button>

      <aside
        className={clsx(
          'bg-neutral-base fixed top-0 left-0 z-40 h-full w-64 transform border-r-2 p-4 transition-transform duration-300 ease-in-out md:relative md:translate-x-0',
          {
            'translate-x-0': isSidebarOpen,
            '-translate-x-full': !isSidebarOpen,
          }
        )}
      >
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-2xl font-bold">SimpleCMS</h2>
          <button onClick={toggleSidebar} className="text-white md:hidden">
            <X size={24} />
          </button>
        </div>
        <nav>
          <ul>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.href} className="mt-2 first:mt-0">
                  <div
                    onClick={() => handleNavigate(item.href)}
                    onKeyDown={(e) => handleKeyDown(e, item.href)}
                    role="link"
                    tabIndex={0}
                    className={clsx(
                      'flex cursor-pointer items-center rounded-md border-2 p-2 font-semibold transition-colors',
                      {
                        'text-neutral-darker bg-secondary-base border-white text-white':
                          isActive,
                        'hover:text-neutral-darker hover:bg-secondary-base border-transparent':
                          !isActive,
                      }
                    )}
                  >
                    <Icon className="mr-3" />
                    {item.label}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
