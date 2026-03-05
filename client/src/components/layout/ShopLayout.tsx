import React from 'react';
import { Outlet } from 'react-router-dom';
import ShopHeader from './ShopHeader';

const ShopLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* 🚀 Sirf Shop ka Header, No Sidebar! */}
      <ShopHeader />
      
      <main className="flex-1">
        {/* Yahan tera Home, AllProducts, etc. render hoga */}
        <Outlet />
      </main>

      {/* Future mein yahan Footer daal dena */}
    </div>
  );
};

export default ShopLayout;