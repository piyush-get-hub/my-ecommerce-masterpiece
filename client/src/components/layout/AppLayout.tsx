import React, { useState } from 'react'; // useState add kiya
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

interface AppLayoutProps {
  isAdmin?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ isAdmin = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Collapse state

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar ko state pass ki */}
      <Sidebar isAdmin={isAdmin} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header />
        <main className="p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;