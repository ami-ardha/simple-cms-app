import { Menu } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="border-neo-black border-b-2 bg-white p-4 md:hidden">
      <button onClick={toggleSidebar} className="text-neo-black">
        <Menu size={24} />
      </button>
    </header>
  );
}
