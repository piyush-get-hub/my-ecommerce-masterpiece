// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '@/services/axiosInstance';

// // State ka structure update kiya hai taaki products ka list bhi handle ho sake
// interface ProductState {
//   products: any[];
//   productsCount: number;
//   filteredProductsCount: number;
//   resPerPage: number;
//   loading: boolean;
//   success: boolean;
//   error: string | null;
// }

// const initialState: ProductState = {
//   products: [],
//   productsCount: 0,
//   filteredProductsCount: 0,
//   resPerPage: 8,
//   loading: false,
//   success: false,
//   error: null,
// };

// // ==========================================
// // 1. Async Thunk: Sare Products Fetch Karne Ke Liye (With Filters)
// // ==========================================
// // productSlice.ts ka getProducts thunk update karo
// export const getProducts = createAsyncThunk(
//   'product/getAll',
//   async (queryParams: any = {}, { rejectWithValue }) => {
//     try {
//       // 🚀 sort ko bhi yahan extract karo
//       const { 
//         keyword = '', 
//         currentPage = 1, 
//         price = [0, 100000], 
//         category, 
//         ratings = 0, 
//         sort = "" 
//       } = queryParams;

//       let link = `/products?page=${currentPage}`;

//       if (price[0] !== 0 || price[1] !== 100000) {
//         link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
//       }

//       if (category) link += `&category=${category}`;
//       if (keyword) link += `&keyword=${keyword}`;
//       if (ratings > 0) link += `&ratings[gte]=${ratings}`;
      
//       // 🎯 Sorting Parameter add karo
//       if (sort) link += `&sort=${sort}`;

//       const { data } = await axiosInstance.get(link);
//       return data;
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message || 'Error loading products');
//     }
//   }
// );
// // ==========================================
// // 2. Async Thunk: Naya Product Create Karne Ke Liye (Puraana wala)
// // ==========================================
// export const createProduct = createAsyncThunk(
//   'product/create',
//   async (productData: FormData, { rejectWithValue }) => {
//     try {
//       const { data } = await axiosInstance.post('/admin/product/new', productData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return data;
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message || 'Product add nahi ho paya');
//     }
//   }
// );

// const productSlice = createSlice({
//   name: 'product',
//   initialState,
//   reducers: {
//     resetProductState: (state) => {
//       state.success = false;
//       state.error = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // --- GET ALL PRODUCTS CASES ---
//       .addCase(getProducts.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.products = action.payload.products;
//         state.productsCount = action.payload.productsCount;
//         state.filteredProductsCount = action.payload.filteredProductsCount;
//         state.resPerPage = action.payload.resPerPage;
//       })
//       .addCase(getProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       // --- CREATE PRODUCT CASES ---
//       .addCase(createProduct.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createProduct.fulfilled, (state) => {
//         state.loading = false;
//         state.success = true;
//       })
//       .addCase(createProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { resetProductState } = productSlice.actions;
// export default productSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/services/axiosInstance';

// State ka structure update kiya hai taaki products ka list bhi handle ho sake
interface ProductState {
  products: any[];
  productsCount: number;
  filteredProductsCount: number;
  resPerPage: number;
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  productsCount: 0,
  filteredProductsCount: 0,
  resPerPage: 8,
  loading: false,
  success: false,
  error: null,
};

// ==========================================
// 1. Async Thunk: Sare Products Fetch Karne Ke Liye (With Filters)
// ==========================================
// productSlice.ts ka getProducts thunk update karo
export const getProducts = createAsyncThunk(
  'product/getAll',
  async (queryParams: any = {}, { rejectWithValue }) => {
    try {
      const { 
        keyword = '', 
        currentPage = 1, 
        price = [0, 100000], 
        category, 
        ratings = 0, 
        sort = "",
        limit = 8 // 🚀 Naya param
      } = queryParams;

      let link = `/products?page=${currentPage}&limit=${limit}`;

      if (price[0] !== 0 || price[1] !== 100000) {
        link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      }

      if (category) link += `&category=${category}`;
      if (keyword) link += `&keyword=${keyword}`;
      if (ratings > 0) link += `&ratings[gte]=${ratings}`;
      
      // 🎯 Sorting Parameter add karo
      if (sort) link += `&sort=${sort}`;

      const { data } = await axiosInstance.get(link);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Error loading products');
    }
  }
);
// ==========================================
// 2. Async Thunk: Naya Product Create Karne Ke Liye (Puraana wala)
// ==========================================
export const createProduct = createAsyncThunk(
  'product/create',
  async (productData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/admin/product/new', productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Product add nahi ho paya');
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // --- GET ALL PRODUCTS CASES ---
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.productsCount = action.payload.productsCount;
        state.filteredProductsCount = action.payload.filteredProductsCount;
        state.resPerPage = action.payload.resPerPage;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // --- CREATE PRODUCT CASES ---
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;