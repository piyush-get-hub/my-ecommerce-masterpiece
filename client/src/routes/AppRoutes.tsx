import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './PrivateRoute';

// Pages Import
import Home from '../pages/home/Home';
import Login from '../pages/auth/Login';
import Register from '@/pages/auth/Register';
import Unauthorized from '../pages/Unauthorized/Unauthorized';
import UserDashboard from '@/pages/user/Dashboard';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import SellerDashboard from '@/pages/seller/SellerDashboard';
import WaitingApproval from '../pages/seller/WaitingApproval';
import AllProducts from '@/pages/productsPage/AllProducts';
import AppLayout from '@/components/layout/AppLayout'; // Sidebar wala
import ShopLayout from '@/components/layout/ShopLayout'; // 👈 Naya Layout (Bina Sidebar wala)
import AddProductForm from '@/components/products/AddProductForm';

const AppRoutes = () => {
  return (
    <Routes>
      {/* ============================================================
          DUNIYA 1: SHOPPING AREA (No Sidebar - Full Width)
          Yahan sirf upar Amazon wala Navbar aayega.
      ============================================================ */}
      <Route element={<ShopLayout />}> 
        <Route path="/" element={<Home />} /> 
        <Route path="/products" element={<AllProducts />} />
        <Route path="/search/:keyword" element={<AllProducts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/waiting-approval" element={<WaitingApproval />} />
      </Route>

      {/* ============================================================
          DUNIYA 2: DASHBOARD AREA (With Sidebar - Masterpiece Style)
          Yahan tera purana AppLayout chalega jisme Sidebar hai.
      ============================================================ */}
      
      {/* 1. Admin & Seller Panel (Sidebar wala) */}
      <Route element={<AppLayout isAdmin={true} />}>
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>

      <Route element={<AppLayout isAdmin={false} />}>
        {/* ✅ USER DASHBOARD: Ab ye Sidebar ke saath chamkega */}
        <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
          <Route path="/dashboard" element={<UserDashboard />} />
        </Route>

        {/* ✅ SELLER DASHBOARD: Ismein bhi Sidebar rahega */}
        <Route element={<ProtectedRoute allowedRoles={['seller', 'admin']} />}>
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/add-product" element={<AddProductForm />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;