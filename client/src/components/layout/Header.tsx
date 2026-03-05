import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { RootState } from '@/app/store';
import { logout } from '@/features/user/userSlice';
import { Button } from '@/components/ui/button';
import { LogOut, User, ShoppingCart, Menu } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Header = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Alvida! Safalta-purvak logout ho gaye.");
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Mobile Menu Icon (Placeholder) */}
        <div className="md:hidden">
          <Menu className="h-6 w-6" />
        </div>

        {/* Search Bar or Page Title (Optional) */}
        <div className="hidden md:block">
          <p className="text-sm font-medium text-muted-foreground italic">
            "Masterpiece in making..."
          </p>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 rounded-full">
              0
            </span>
          </Button>

          {userInfo ? (
            <div className="flex items-center gap-3 border-l pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none">{userInfo.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{userInfo.role}</p>
              </div>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleLogout}
                className="h-8 px-3"
              >
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;