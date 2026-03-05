import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ShoppingCart, DollarSign, Plus } from "lucide-react";
import { useNavigate} from 'react-router-dom';

const SellerDashboard = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const navigate=useNavigate()

  // Dummy data (Baad mein hum ise backend se layenge)
  const stats = [
    { title: "Total Products", value: "12", icon: <Package className="h-5 w-5" />, color: "text-blue-600" },
    { title: "Active Orders", value: "05", icon: <ShoppingCart className="h-5 w-5" />, color: "text-orange-600" },
    { title: "Total Revenue", value: "₹45,200", icon: <DollarSign className="h-5 w-5" />, color: "text-green-600" },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vandematram, {userInfo?.name}! 👋</h1>
          <p className="text-muted-foreground">Apne store ki performance yahan track karein.</p>
        </div>
        <Button className="w-fit" onClick={() => navigate('/seller/add-product')}>
          <Plus className="mr-2 h-4 w-4" /> Naya Product Add Karein
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((item, index) => (
          <Card key={index} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <div className={item.color}>{item.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity Section (Placeholder) */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">Abhi koi orders nahi hain. Marketing shuru karein! 🚀</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerDashboard;