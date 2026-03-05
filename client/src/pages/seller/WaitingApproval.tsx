import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/app/store';
import { logout } from '@/features/user/userSlice';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, LogOut, Mail, RefreshCcw } from "lucide-react";

const WaitingApproval = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-lg text-center shadow-lg border-t-4 border-yellow-500">
        <CardHeader>
          <div className="mx-auto bg-yellow-100 p-4 rounded-full w-fit mb-4">
            <Clock className="h-12 w-12 text-yellow-600 animate-pulse" />
          </div>
          <CardTitle className="text-2xl font-bold">Thoda Sabr Rakhein, {userInfo?.name}! ⏳</CardTitle>
          <p className="text-muted-foreground">
            Aapke store <span className="font-bold text-foreground">"{userInfo?.storeDetails?.storeName || 'Apna Store'}"</span> ki details Admin ke paas approval ke liye gayi hain.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg text-sm text-left border-l-4 border-primary">
            <h4 className="font-bold mb-1">Agla Step Kya Hai?</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Admin aapki details verify karega.</li>
              <li>Approval hote hi aapko ek email milega.</li>
              <li>Uske baad aap products list kar payenge.</li>
            </ul>
          </div>
          <p className="text-xs text-muted-foreground italic">
            Aamtaur par isme 24-48 ghante lagte hain.
          </p>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row justify-center gap-3 border-t pt-6">
          <Button variant="outline" className="w-full sm:w-auto" onClick={() => window.location.reload()}>
            <RefreshCcw className="mr-2 h-4 w-4" /> Status Check Karein
          </Button>
          <Button variant="ghost" className="w-full sm:w-auto text-destructive hover:bg-destructive/10" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </CardFooter>
      </Card>
      
      {/* Support Info */}
      <div className="absolute bottom-10 flex items-center gap-2 text-sm text-muted-foreground">
        <Mail className="h-4 w-4" /> support@masterpiece.com par sampark karein
      </div>
    </div>
  );
};

export default WaitingApproval;