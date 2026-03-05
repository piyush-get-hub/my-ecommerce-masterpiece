import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '@/services/axiosInstance';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'user', storeName: '', description: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post('/auth/register', formData);
      toast.success(res.data.message || 'Registration Successful! Ab login karein.');
      navigate('/login');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration fail ho gaya!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">Naya Account</CardTitle>
          <CardDescription className="text-center">Masterpiece par aapka swagat hai!</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="user" onValueChange={(val) => setFormData({ ...formData, role: val })}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="user">Customer 🛍️</TabsTrigger>
              <TabsTrigger value="seller">Seller 🏪</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Poora Naam</Label>
                <Input id="name" placeholder="Rahul Singh" onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="rahul@example.com" onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" onChange={handleChange} required />
              </div>

              {/* Extra fields sirf Seller ke liye */}
              <TabsContent value="seller" className="space-y-4 pt-4 border-t mt-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Ka Naam</Label>
                  <Input id="storeName" placeholder="Rahul Electronics" onChange={handleChange} required={formData.role === 'seller'} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Store Description</Label>
                  <Textarea id="description" placeholder="Aap kya bechna chahte hain?" onChange={handleChange} required={formData.role === 'seller'} />
                </div>
              </TabsContent>

              <Button className="w-full mt-4 h-11" type="submit" disabled={loading}>
                {loading ? "Rukiye..." : "Account Banayein"}
              </Button>
            </form>
          </Tabs>
        </CardContent>
        <CardFooter className="justify-center border-t py-4">
          <p className="text-sm text-muted-foreground">
            Pehle se account hai? <Link to="/login" className="text-primary hover:underline font-bold">Login karein</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;