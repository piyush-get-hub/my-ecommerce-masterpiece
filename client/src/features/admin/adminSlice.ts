import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/services/axiosInstance';

// Fetch all sellers who are not yet approved
export const fetchPendingSellers = createAsyncThunk(
  'admin/fetchPending',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/pending-sellers');
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// Approve Seller Thunk
export const approveSellerThunk = createAsyncThunk(
  'admin/approveSeller',
  async ({ id, status }: { id: string; status: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/admin/approve-seller/${id}`, { status });
      return { id, status }; // Return ID to update UI state
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// 2. Product Approve karne ke liye
export const approveProductThunk = createAsyncThunk(
  'admin/approveProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.put(`/admin/product/approve/${id}`);
      return id; 
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: { pendingSellers: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingSellers.fulfilled, (state, action) => {
        state.pendingSellers = action.payload;
      })
      .addCase(approveSellerThunk.fulfilled, (state, action) => {
        // Remove approved seller from the list instantly (State Update)
        state.pendingSellers = state.pendingSellers.filter(s => s._id !== action.payload.id);
      });
  },
});

export default adminSlice.reducer;