// export default function UserDashboard() { return <div className="p-10">User Dashboard - Welcome!</div> }


import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Package, Heart, MapPin, User, Settings, ShoppingBag, CreditCard 
} from "lucide-react";

const Dashboard = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 1. WELCOME SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-gray-900 italic uppercase">
            Namaste, {userInfo?.name}!
          </h1>
          <p className="text-muted-foreground font-medium">
            Aapka apna Masterpiece corner. Yahan sab kuch aapke control mein hai.
          </p>
        </div>
        <Button variant="outline" className="gap-2 border-2 font-bold uppercase text-xs tracking-widest">
          <Settings size={16} /> Edit Settings
        </Button>
      </div>

      {/* 2. QUICK STATS GRID */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Orders", val: "08", icon: <Package className="text-blue-500" /> },
          { label: "Wishlist", val: "12", icon: <Heart className="text-rose-500 fill-rose-500" /> },
          { label: "Saved Addresses", val: "02", icon: <MapPin className="text-green-500" /> },
          { label: "Reviews", val: "05", icon: <CreditCard className="text-purple-500" /> },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black">{stat.val}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 3. THE TABS (Flipkart Features in Modern UI) */}
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0 gap-8 mb-6">
          <TabsTrigger value="orders" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-4 font-bold uppercase text-xs tracking-widest">
            <ShoppingBag className="mr-2 h-4 w-4" /> My Orders
          </TabsTrigger>
          <TabsTrigger value="profile" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-4 font-bold uppercase text-xs tracking-widest">
            <User className="mr-2 h-4 w-4" /> Profile Details
          </TabsTrigger>
          <TabsTrigger value="addresses" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-4 font-bold uppercase text-xs tracking-widest">
            <MapPin className="mr-2 h-4 w-4" /> Addresses
          </TabsTrigger>
        </TabsList>

        {/* --- ORDERS TAB --- */}
        <TabsContent value="orders">
          <Card className="border-none shadow-none bg-transparent">
            <div className="space-y-4">
              {/* Dummy Order Item */}
              {[1, 2].map((order) => (
                <div key={order} className="flex items-center gap-6 bg-white p-4 rounded-lg border hover:border-blue-200 transition-colors">
                  <div className="h-20 w-20 bg-muted rounded-md shrink-0 border" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-sm line-clamp-1">Masterpiece Premium Sneaker v2</h4>
                      <span className="text-xs font-black text-green-600 uppercase bg-green-50 px-2 py-1 rounded">Delivered</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">Ordered on: 12 Feb 2026</p>
                    <div className="flex gap-4">
                      <Button size="sm" variant="link" className="p-0 h-auto text-xs font-bold text-blue-600">Track Order</Button>
                      <Button size="sm" variant="link" className="p-0 h-auto text-xs font-bold text-gray-500">Rate Product</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* --- PROFILE TAB --- */}
        <TabsContent value="profile">
          <Card className="border-none shadow-sm max-w-2xl bg-white">
            <CardHeader>
              <CardTitle className="text-lg uppercase italic font-black">Personal Information</CardTitle>
              <CardDescription>Apne account ki basic details yahan se update karein.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</Label>
                  <Input defaultValue={userInfo?.name} className="font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</Label>
                  <Input defaultValue={userInfo?.email} disabled className="bg-muted font-bold" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Gender</Label>
                <div className="flex gap-4 pt-2">
                   {['Male', 'Female'].map(g => (
                     <label key={g} className="flex items-center gap-2 cursor-pointer font-bold text-sm">
                       <input type="radio" name="gender" className="accent-black w-4 h-4" /> {g}
                     </label>
                   ))}
                </div>
              </div>
              <Button className="w-full md:w-fit px-10 uppercase font-black text-xs tracking-widest italic">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- ADDRESSES TAB --- */}
        <TabsContent value="addresses">
          <div className="grid md:grid-cols-2 gap-4 mt-2">
            <Button variant="outline" className="h-full min-h-[150px] border-2 border-dashed border-gray-200 hover:border-primary hover:bg-primary/5 transition-all flex flex-col gap-2">
              <MapPin className="text-gray-300" />
              <span className="font-bold text-xs uppercase tracking-widest">Naya Address Add Karein</span>
            </Button>
            
            <Card className="shadow-sm border-none bg-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4">
                 <Badge variant="secondary" className="text-[8px] font-black uppercase tracking-tighter">HOME</Badge>
               </div>
               <CardContent className="p-6">
                 <h4 className="font-bold text-sm mb-2 uppercase italic">{userInfo?.name}</h4>
                 <p className="text-xs text-muted-foreground leading-relaxed">
                   Plot No. 42, Masterpiece Villa,<br />
                   Noida, Uttar Pradesh - 201301<br />
                   Phone: +91 9876543210
                 </p>
               </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;