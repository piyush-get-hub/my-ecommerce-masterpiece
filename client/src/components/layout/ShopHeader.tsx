import React, { useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '@/app/store';
import { logout } from '@/features/user/userSlice';
import { Button } from '@/components/ui/button';
import { Search, ShoppingCart, LogOut, ChevronDown, LayoutGrid } from 'lucide-react';

const ShopHeader = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword.trim()}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col shadow-md bg-white">
      {/* 🟦 TOP HEADER */}
      <div className="bg-[#2874f0] text-white h-16 md:h-20 flex items-center justify-between px-4 md:px-20 gap-8">
        
        <div className="flex items-center gap-8">
          {/* 1. Logo */}
          <Link to="/" className="text-2xl font-black italic tracking-tighter shrink-0">
            MASTERPIECE
          </Link>

          {/* 🎯 2. THE MISSING LINK: All Products Button */}
          <Link 
            to="/products" 
            className="hidden lg:flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-sm font-bold text-sm transition-all border border-white/20"
          >
            <LayoutGrid size={18} />
            ALL PRODUCTS
          </Link>
        </div>

        {/* 🔍 SEARCH BAR */}
        <form onSubmit={searchHandler} className="hidden md:flex flex-1 max-w-xl bg-white rounded-sm overflow-hidden shadow-sm border">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full px-4 py-2 text-black outline-none text-sm"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button type="submit" className="bg-white text-[#2874f0] hover:bg-gray-100 rounded-none h-10 px-4 border-l">
            <Search size={20} />
          </Button>
        </form>

        {/* 👤 AUTH & CART */}
        <div className="flex items-center gap-6">
          {userInfo ? (
            <div className="group relative py-2 cursor-pointer">
               <span className="font-bold text-sm flex items-center gap-1">
                 {userInfo.name} <ChevronDown size={14} />
               </span>
               <div className="absolute top-full right-0 w-48 bg-white text-black shadow-xl rounded-b-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border z-[100]">
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 text-sm">My Profile</Link>
                  {(userInfo.role === 'admin' || userInfo.role === 'seller') && (
                    <Link to="/seller/dashboard" className="block px-4 py-2 hover:bg-gray-100 text-sm border-b font-bold">Seller Panel</Link>
                  )}
                  <button onClick={() => dispatch(logout())} className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 text-sm flex items-center gap-2">
                    <LogOut size={14} /> Logout
                  </button>
               </div>
            </div>
          ) : (
            <Link to="/login">
              <Button className="bg-white text-[#2874f0] hover:bg-gray-50 font-bold px-6 h-9 rounded-sm">Login</Button>
            </Link>
          )}

          <Link to="/cart" className="flex items-center gap-2 font-bold relative">
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-[10px] rounded-full px-1.5 py-0.5 font-black border border-[#2874f0]">0</span>
            <span className="hidden sm:block">Cart</span>
          </Link>
        </div>
      </div>

    </header>
  );
};

export default ShopHeader;