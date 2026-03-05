import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosInstance';

// Login Action
export const loginUser = createAsyncThunk('user/login', async (userData: any, thunkAPI) => {
  try {
    const response = await axiosInstance.post('/auth/login', userData);
    localStorage.setItem('token', response.data.token); // Token save karo
    return response.data.user; 
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message || 'Login failed');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;