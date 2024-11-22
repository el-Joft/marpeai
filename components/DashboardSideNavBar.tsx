import { Home, CalendarDays, Settings, LogOut } from 'lucide-react';
import { useRouter } from 'next/router';

export function DashboardSideNavbar() {
  const router = useRouter(); // Access the current route

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-primary">Marpe AI</h2>
      </div>
      <nav className="mt-6 flex-grow">
        <a
          href="/dashboard"
          className={`flex items-center px-4 py-2 text-gray-700 ${
            router.pathname === '/dashboard' ? 'bg-gray-100' : 'hover:bg-gray-100'
          }`}
        >
          <Home className="w-5 h-5 mr-2" />
          Home
        </a>
        <a
          href="/meal_plan"
          className={`flex items-center px-4 py-2 text-gray-700 ${
            router.pathname === '/meal_plan' ? 'bg-gray-100' : 'hover:bg-gray-100'
          }`}
        >
          <CalendarDays className="w-5 h-5 mr-2" />
          Meal Planner
        </a>
        <a
          href="/settings"
          className={`flex items-center px-4 py-2 text-gray-700 ${
            router.pathname === '/settings' ? 'bg-gray-100' : 'hover:bg-gray-100'
          }`}
        >
          <Settings className="w-5 h-5 mr-2" />
          Settings
        </a>
      </nav>
      <div className="p-4">
        <a
          href="/logout"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </a>
      </div>
    </aside>
  );
}
