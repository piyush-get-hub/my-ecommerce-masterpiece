import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../app/store';

interface Props {
  allowedRoles: string[];
  requiresApproval?: boolean;
}

const ProtectedRoute = ({ allowedRoles, requiresApproval = false }: Props) => {
  const { userInfo, loading } = useSelector((state: RootState) => state.user);

  if (loading) return <div>Loading... Please Wait</div>;

  // 1. Agar login nahi hai toh login page par bhejo
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // 2. Role Check: Kya user ke paas permission hai?
  if (!allowedRoles.includes(userInfo.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3. Approval Check: Sirf Sellers ke liye
  if (requiresApproval && userInfo.role === 'seller' && !userInfo.isApproved) {
    return <Navigate to="/waiting-approval" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;