// import React, { useEffect, useState } from 'react';
// import axiosInstance from '@/services/axiosInstance';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { toast } from 'react-hot-toast';
// import { Users, Clock, CheckCircle } from "lucide-react";

// const AdminDashboard = () => {
//   const [pendingSellers, setPendingSellers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 1. Pending Sellers ko fetch karne ka logic
//   const fetchPendingSellers = async () => {
//     try {
//       const { data } = await axiosInstance.get('/admin/pending-sellers');
//       setPendingSellers(data);
//     } catch (error) {
//       console.error("Data laane mein dikkat hui", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPendingSellers();
//   }, []);

//   // 2. Approve karne ka logic
//   // const handleApprove = async (id: string) => {
//   //   try {
//   //     await axiosInstance.put(`/admin/approve-seller/${id}`);
//   //     toast.success("Seller ko hari jhandi mil gayi! ✅");
//   //     fetchPendingSellers(); // List refresh karo
//   //   } catch (error) {
//   //     toast.error("Approve nahi ho paya.");
//   //   }
//   // };

//   const handleApprove = async (id: string) => {
//   try {
//     // ✅ URL ke baad comma daal kar object { status: 'approve' } bhejo
//     await axiosInstance.put(`/admin/approve-seller/${id}`, { status: 'approve' }); 
    
//     toast.success("Seller ko hari jhandi mil gayi! ✅");
//     fetchPendingSellers(); // List refresh karo
//   } catch (error) {
//     toast.error("Approve nahi ho paya.");
//   }
// };

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold tracking-tight">Admin Control Center 👑</h1>

//       {/* Stats Cards */}
//       <div className="grid gap-4 md:grid-cols-3">
//         <Card shadow-sm>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
//             <Clock className="h-4 w-4 text-yellow-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{pendingSellers.length}</div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Sellers Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Seller Approval Requests</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {loading ? (
//             <p className="text-center py-4">Sellers ki list dhoond raha hoon...</p>
//           ) : pendingSellers.length === 0 ? (
//             <p className="text-center py-4 text-muted-foreground">Abhi koi pending request nahi hai. ✨</p>
//           ) : (
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Store Name</TableHead>
//                   <TableHead>Owner</TableHead>
//                   <TableHead>Email</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead className="text-right">Action</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {pendingSellers.map((seller: any) => (
//                   <TableRow key={seller._id}>
//                     <TableCell className="font-medium">{seller.storeDetails?.storeName || 'N/A'}</TableCell>
//                     <TableCell>{seller.name}</TableCell>
//                     <TableCell>{seller.email}</TableCell>
//                     <TableCell>
//                       <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
//                         Pending
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="text-right">
//                       <Button size="sm" onClick={() => handleApprove(seller._id)}>
//                         Approve Karein
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AdminDashboard;



// import React, { useEffect, useState } from 'react';
// import axiosInstance from '@/services/axiosInstance';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { toast } from 'react-hot-toast';
// import { Users, Clock, Package } from "lucide-react"; // Package icon add kiya

// const AdminDashboard = () => {
//   const [pendingSellers, setPendingSellers] = useState([]);
//   const [pendingProducts, setPendingProducts] = useState([]); // ✨ Naya State
//   const [loading, setLoading] = useState(true);

//   // 1. Combine Fetch Logic (Sellers + Products)
//   const fetchAllPendingData = async () => {
//     try {
//       setLoading(true);
//       const resSellers = await axiosInstance.get('/admin/pending-sellers');
//       const resProducts = await axiosInstance.get('/admin/pending-products'); // Backend route check kar lena
      
//       setPendingSellers(resSellers.data);
//       setPendingProducts(resProducts.data.products || resProducts.data);
//     } catch (error) {
//       console.error("Data laane mein dikkat hui", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllPendingData();
//   }, []);

//   // 2. Seller Approve Logic (Tera purana wala)
//   const handleApprove = async (id: string) => {
//     try {
//       await axiosInstance.put(`/admin/approve-seller/${id}`, { status: 'approve' });
//       toast.success("Seller approve ho gaya! ✅");
//       fetchAllPendingData(); 
//     } catch (error) {
//       toast.error("Approve nahi ho paya.");
//     }
//   };

//   // 3. Product Approve Logic (Naya wala)
//   const handleProductApprove = async (id: string) => {
//     try {
//       await axiosInstance.put(`/admin/product/approve/${id}`);
//       toast.success("Product ab live hai! 🚀");
//       fetchAllPendingData(); 
//     } catch (error) {
//       toast.error("Product approval fail ho gaya.");
//     }
//   };

//   return (
//     <div className="space-y-10"> {/* Gap badha diya dono tables ke beech */}
//       <h1 className="text-3xl font-bold tracking-tight">Admin Control Center 👑</h1>

//       {/* --- STATS CARDS --- */}
//       <div className="grid gap-4 md:grid-cols-2">
//         <Card shadow-sm>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Pending Sellers</CardTitle>
//             <Clock className="h-4 w-4 text-yellow-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{pendingSellers.length}</div>
//           </CardContent>
//         </Card>
//         <Card shadow-sm>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Pending Products</CardTitle>
//             <Package className="h-4 w-4 text-blue-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{pendingProducts.length}</div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* --- TABLE 1: SELLER APPROVALS (Purana) --- */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2"><Users size={20}/> Seller Requests</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {loading ? <p className="text-center py-4 italic">Loading...</p> : pendingSellers.length === 0 ? (
//             <p className="text-center py-4 text-muted-foreground">Koi pending seller nahi hai.</p>
//           ) : (
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Store Name</TableHead>
//                   <TableHead>Owner</TableHead>
//                   <TableHead className="text-right">Action</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {pendingSellers.map((seller: any) => (
//                   <TableRow key={seller._id}>
//                     <TableCell className="font-medium">{seller.storeDetails?.storeName || 'N/A'}</TableCell>
//                     <TableCell>{seller.name}</TableCell>
//                     <TableCell className="text-right">
//                       <Button size="sm" onClick={() => handleApprove(seller._id)}>Approve</Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           )}
//         </CardContent>
//       </Card>

//       {/* --- TABLE 2: PRODUCT APPROVALS (Naya) --- */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2"><Package size={20}/> Product Requests</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {loading ? <p className="text-center py-4 italic">Loading...</p> : pendingProducts.length === 0 ? (
//             <p className="text-center py-4 text-muted-foreground italic">Koi pending product nahi hai. ✨</p>
//           ) : (
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Product Name</TableHead>
//                   <TableHead>Category</TableHead>
//                   <TableHead>Price</TableHead>
//                   <TableHead className="text-right">Action</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {pendingProducts.map((product: any) => (
//                   <TableRow key={product._id}>
//                     <TableCell className="font-bold">{product.name}</TableCell>
//                     <TableCell className="uppercase text-xs font-medium">{product.category}</TableCell>
//                     <TableCell>₹{product.price}</TableCell>
//                     <TableCell className="text-right">
//                       <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleProductApprove(product._id)}>
//                         Approve Product
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AdminDashboard;



import React, { useEffect, useState } from 'react';
import axiosInstance from '@/services/axiosInstance';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from 'react-hot-toast';
import { Users, Clock, Package } from "lucide-react"; 

const AdminDashboard = () => {
  const [pendingSellers, setPendingSellers] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]); 
  const [loading, setLoading] = useState(true);

  const fetchAllPendingData = async () => {
    try {
      setLoading(true);
      const resSellers = await axiosInstance.get('/admin/pending-sellers');
      const resProducts = await axiosInstance.get('/admin/pending-products'); 
      
      setPendingSellers(resSellers.data);
      setPendingProducts(resProducts.data.products || resProducts.data);
    } catch (error) {
      console.error("Data laane mein dikkat hui", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPendingData();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await axiosInstance.put(`/admin/approve-seller/${id}`, { status: 'approve' });
      toast.success("Seller approve ho gaya! ✅");
      fetchAllPendingData(); 
    } catch (error) {
      toast.error("Approve nahi ho paya.");
    }
  };

  const handleProductApprove = async (id: string) => {
    try {
      await axiosInstance.put(`/admin/product/approve/${id}`);
      toast.success("Product ab live hai! 🚀");
      fetchAllPendingData(); 
    } catch (error) {
      toast.error("Product approval fail ho gaya.");
    }
  };

  // 🚀 Naya Logic: Approve All Products
  const handleApproveAllProducts = async () => {
    try {
      await axiosInstance.put('/admin/products/approve-all');
      toast.success("Saare products ek saath live ho gaye! 🚀🔥");
      fetchAllPendingData();
    } catch (error) {
      toast.error("Bulk approval fail ho gaya.");
    }
  };

  return (
    <div className="space-y-10"> 
      <h1 className="text-3xl font-bold tracking-tight">Admin Control Center 👑</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <Card shadow-sm>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Sellers</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingSellers.length}</div>
          </CardContent>
        </Card>
        <Card shadow-sm>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Products</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingProducts.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Users size={20}/> Seller Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? <p className="text-center py-4 italic">Loading...</p> : pendingSellers.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">Koi pending seller nahi hai.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Store Name</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingSellers.map((seller: any) => (
                  <TableRow key={seller._id}>
                    <TableCell className="font-medium">{seller.storeDetails?.storeName || 'N/A'}</TableCell>
                    <TableCell>{seller.name}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" onClick={() => handleApprove(seller._id)}>Approve</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          {/* ✨ UI Update: Title ke saath Approve All Button */}
          <CardTitle className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Package size={20}/> Product Requests
            </div>
            {pendingProducts.length > 0 && (
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleApproveAllProducts}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Approve All ({pendingProducts.length})
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? <p className="text-center py-4 italic">Loading...</p> : pendingProducts.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground italic">Koi pending product nahi hai. ✨</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingProducts.map((product: any) => (
                  <TableRow key={product._id}>
                    <TableCell className="font-bold">{product.name}</TableCell>
                    <TableCell className="uppercase text-xs font-medium">{product.category}</TableCell>
                    <TableCell>₹{product.price}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleProductApprove(product._id)}>
                        Approve Product
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;