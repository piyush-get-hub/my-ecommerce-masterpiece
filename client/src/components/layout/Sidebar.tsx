import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LayoutDashboard, ShoppingBag, Users, Settings, Home, ChevronLeft, ChevronRight } from 'lucide-react'; // Icons add kiye
import { Button } from '../ui/button'; // Button use kiya toggle ke liye

interface SidebarProps {
  isAdmin: boolean;
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

const Sidebar = ({ isAdmin, isCollapsed, setIsCollapsed }: SidebarProps) => {
  const { userInfo } = useSelector((state: any) => state.user); 
  const location = useLocation();

  const getDashboardPath = () => {
    if (userInfo?.role === 'admin') return '/admin/dashboard';
    if (userInfo?.role === 'seller') return '/seller/dashboard';
    return '/dashboard';
  };

  const dashboardPath = getDashboardPath();

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 bg-card border-r hidden md:flex flex-col h-screen relative`}>
      {/* Toggle Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-7 h-6 w-6 rounded-full border bg-background z-10"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </Button>

      <div className="p-6">
        <h2 className="text-xl font-bold text-primary tracking-tight truncate">
          {isCollapsed ? 'M' : `Masterpiece ${userInfo?.role === 'admin' ? 'Admin' : ''}`}
        </h2>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <Link 
          to={dashboardPath} 
          className={`flex items-center p-2 rounded-md transition-colors ${
            location.pathname === dashboardPath ? 'bg-primary text-white' : 'hover:bg-accent'
          }`}
        >
          <LayoutDashboard className={`${isCollapsed ? 'mr-0' : 'mr-2'} h-5 w-5`} /> 
          {!isCollapsed && <span className="font-medium">Dashboard</span>}
        </Link>

        {userInfo?.role === 'admin' && (
          <Link 
            to="/admin/dashboard" 
            className="flex items-center p-2 hover:bg-accent rounded-md text-slate-600"
          >
            <Users className={`${isCollapsed ? 'mr-0' : 'mr-2'} h-5 w-5`} /> 
            {!isCollapsed && <span>Seller Approvals</span>}
          </Link>
        )}

        {userInfo?.role === 'seller' && (
          <Link 
            to="/seller/products" 
            className="flex items-center p-2 hover:bg-accent rounded-md text-slate-600"
          >
            <ShoppingBag className={`${isCollapsed ? 'mr-0' : 'mr-2'} h-5 w-5`} /> 
            {!isCollapsed && <span>My Products</span>}
          </Link>
        )}

        <hr className="my-4 border-slate-200" />

        <Link to="/" className="flex items-center p-2 hover:bg-accent rounded-md text-slate-600">
          <Home className={`${isCollapsed ? 'mr-0' : 'mr-2'} h-5 w-5`} /> 
          {!isCollapsed && <span>Go to Shop</span>}
        </Link>
      </nav>

      <div className="p-4 border-t">
        <Link to="/settings" className="flex items-center p-2 hover:bg-accent rounded-md text-slate-600">
          <Settings className={`${isCollapsed ? 'mr-0' : 'mr-2'} h-5 w-5`} /> 
          {!isCollapsed && <span>Settings</span>}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;