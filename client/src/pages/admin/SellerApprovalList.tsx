import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPendingSellers, approveSellerThunk } from '@/features/admin/adminSlice';
import { AppDispatch, RootState } from '@/app/store';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from 'react-hot-toast';
import { Check, X, Store } from 'lucide-react';

const SellerApprovalList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pendingSellers, loading } = useSelector((state: RootState) => state.admin);

  useEffect(() => {
    dispatch(fetchPendingSellers());
  }, [dispatch]);

  const handleAction = async (id: string, status: 'approve' | 'reject') => {
    const resultAction = await dispatch(approveSellerThunk({ id, status }));
    
    if (approveSellerThunk.fulfilled.match(resultAction)) {
      toast.success(`Seller ${status === 'approve' ? 'Approve' : 'Reject'} ho gaya!`);
    } else {
      toast.error('Action fail ho gaya bhai');
    }
  };

  if (loading) return <div className="p-10 text-center">Sellers dhoond raha hoon...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Seller Requests</h1>
        <Badge variant="outline" className="text-sm font-medium">
          {pendingSellers.length} Pending
        </Badge>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Seller Details</TableHead>
              <TableHead>Store Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingSellers.length > 0 ? (
              pendingSellers.map((seller: any) => (
                <TableRow key={seller._id}>
                  <TableCell>
                    <div className="font-medium">{seller.name}</div>
                    <div className="text-sm text-muted-foreground">{seller.email}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Store className="h-4 w-4 text-primary" />
                      {seller.storeDetails?.storeName || 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                      Pending
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleAction(seller._id, 'reject')}
                    >
                      <X className="h-4 w-4 mr-1" /> Reject
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleAction(seller._id, 'approve')}
                    >
                      <Check className="h-4 w-4 mr-1" /> Approve
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Koi pending request nahi hai. Chill karo! 😎
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SellerApprovalList;