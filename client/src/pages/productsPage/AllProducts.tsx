// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProducts } from '@/features/product/productSlice';
// import { AppDispatch, RootState } from '@/app/store';
// import ProductCard from '@/components/products/ProductCard';
// import { useParams, useSearchParams } from 'react-router-dom';
// import { Loader2, PackageSearch, ChevronLeft, ChevronRight } from 'lucide-react';
// import Sidebar from '@/components/layout/Sidebar';

// const AllProducts = () => {
//   const { keyword } = useParams(); 
//   const [searchParams] = useSearchParams();
//   const dispatch = useDispatch<AppDispatch>();
  
//   // 🚀 URL se category pakdo
//   const categoryFromUrl = searchParams.get('category') || "";

//   const { products, loading, filteredProductsCount, resPerPage } = useSelector(
//     (state: RootState) => state.product
//   );

//   // Filters State
//   const [currentPage, setCurrentPage] = useState(1);
//   const [price, setPrice] = useState<[number, number]>([0, 100000]);
//   const [ratings, setRatings] = useState(0);

//   // 🎯 Reset page to 1 when category or keyword changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [categoryFromUrl, keyword]);

//   useEffect(() => {
//     dispatch(getProducts({ 
//       keyword: keyword || "", 
//       currentPage, 
//       category: categoryFromUrl,
//       price,
//       ratings 
//     }));
    
//     // Scroll to top when page changes
//     window.scrollTo(0, 0);
//   }, [dispatch, keyword, currentPage, categoryFromUrl, price, ratings]);

//   // Pagination Logic
//   const totalPages = Math.ceil(filteredProductsCount / (resPerPage || 8));

//   if (loading) {
//     return (
//       <div className="h-screen flex flex-col items-center justify-center text-gray-500 bg-white">
//         <Loader2 className="animate-spin mb-4 text-[#2874f0]" size={40} />
//         <p className="font-bold tracking-tight">Masterpiece items dhoond rahe hain...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#f1f3f6] min-h-screen">
//       <div className="container mx-auto px-0 md:px-4 py-4 flex flex-col md:flex-row gap-4">
        
//         {/* 1. LEFT SIDEBAR */}
//         <aside className="w-full md:w-1/4 lg:w-1/5 shrink-0">
//           <Sidebar 
//             price={price} 
//             setPrice={setPrice} 
//             ratings={ratings} 
//             setRatings={setRatings} 
//             activeCategory={categoryFromUrl}
//           />
//         </aside>

//         {/* 2. RIGHT CONTENT */}
//         <main className="flex-grow bg-white shadow-sm rounded-sm p-4 md:p-6">
//           <div className="border-b pb-4 mb-6">
//             <h1 className="text-xl font-bold text-gray-800">
//               {keyword ? `Search Results for "${keyword}"` : categoryFromUrl ? `Premium ${categoryFromUrl}` : "All Products"}
//             </h1>
//             <p className="text-sm text-gray-500 font-medium">{filteredProductsCount} items found</p>
//           </div>

//           {products && products.length > 0 ? (
//             <>
//               {/* Product Grid */}
//               <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
//                 {products.map(product => (
//                   <ProductCard key={product._id} product={product} />
//                 ))}
//               </div>

//               {/* 🚀 MANUAL PAGINATION BAR */}
//               {filteredProductsCount > (resPerPage || 8) && (
//                 <div className="mt-12 flex justify-center items-center gap-2 border-t pt-8">
//                   <button 
//                     disabled={currentPage === 1}
//                     onClick={() => setCurrentPage(prev => prev - 1)}
//                     className="p-2 border rounded-md hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
//                   >
//                     <ChevronLeft size={20} />
//                   </button>

//                   {Array.from({ length: totalPages }).map((_, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setCurrentPage(index + 1)}
//                       className={`px-4 py-2 border rounded-md text-sm font-bold transition-all ${
//                         currentPage === index + 1 
//                         ? 'bg-[#2874f0] text-white border-[#2874f0] shadow-md' 
//                         : 'text-gray-600 hover:bg-gray-50'
//                       }`}
//                     >
//                       {index + 1}
//                     </button>
//                   ))}

//                   <button 
//                     disabled={currentPage === totalPages}
//                     onClick={() => setCurrentPage(prev => prev + 1)}
//                     className="p-2 border rounded-md hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
//                   >
//                     <ChevronRight size={20} />
//                   </button>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-lg">
//               <PackageSearch size={60} className="text-gray-300 mb-4" />
//               <h2 className="text-lg font-bold text-gray-600">Bhai, is category mein abhi kuch nahi hai!</h2>
//               <p className="text-sm text-gray-400">Filters thode kam karke dekho shayad kuch mil jaye.</p>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AllProducts;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '@/features/product/productSlice';
import { AppDispatch, RootState } from '@/app/store';
import ProductCard from '@/components/products/ProductCard';
import { useParams, useSearchParams } from 'react-router-dom';
import { Loader2, PackageSearch, ChevronLeft, ChevronRight, Star, RotateCcw } from 'lucide-react';
import { Slider } from "@/components/ui/slider";

const AllProducts = () => {
  const { keyword } = useParams(); 
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  
  const categoryFromUrl = searchParams.get('category') || "";
  const { products, loading, filteredProductsCount, resPerPage } = useSelector(
    (state: RootState) => state.product
  );

  // --- STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const [ratings, setRatings] = useState(0);
  const [sort, setSort] = useState(""); 
  
  // 🚀 Slider Fix: Do states chahiye
  const [price, setPrice] = useState<[number, number]>([0, 100000]); // Sirf UI ke liye (Fast)
  const [filterPrice, setFilterPrice] = useState<[number, number]>([0, 100000]); // API ke liye (Slow)

  // 🎯 Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFromUrl, keyword, filterPrice, ratings, sort]);

  // 🎯 API Call (Price ki jagah filterPrice use kiya hai)
  useEffect(() => {
    dispatch(getProducts({ 
      keyword: keyword || "", 
      currentPage, 
      category: categoryFromUrl,
      price: filterPrice, 
      ratings,
      sort 
    }));
    window.scrollTo(0, 0);
  }, [dispatch, keyword, currentPage, categoryFromUrl, filterPrice, ratings, sort]);

  const totalPages = Math.ceil(filteredProductsCount / (resPerPage || 8));

  // --- HANDLERS ---
  const handleSliderChange = (val: number[]) => {
    setPrice([val[0], val[1]]); // Slider smooth chalega
  };

  const handleSliderCommit = (val: number[]) => {
    setFilterPrice([val[0], val[1]]); // API sirf ab call hogi
  };

  const clearFilters = () => {
    setPrice([0, 100000]);
    setFilterPrice([0, 100000]);
    setRatings(0);
    setSort("");
    setCurrentPage(1);
  };

  return (
    <div className="bg-[#f1f3f6] min-h-screen">
      <div className="container mx-auto px-0 md:px-4 py-4 flex flex-col md:flex-row gap-4">
        
        {/* 🛠️ 1. SIDEBAR (Hamesha dikhega, loading par gayab nahi hoga) */}
        <aside className="w-full md:w-1/4 lg:w-1/5 shrink-0 bg-white p-5 shadow-sm rounded-sm h-fit sticky top-20">
          <div className="flex justify-between items-center mb-6 border-b pb-2">
            <h2 className="font-bold text-lg uppercase tracking-tighter">Filters</h2>
            <RotateCcw 
              size={18} 
              className="text-blue-500 cursor-pointer hover:rotate-[-90deg] transition-all" 
              onClick={clearFilters}
            />
          </div>

          {/* Price Filter */}
          <div className="mb-10">
            <p className="text-[10px] font-black text-gray-400 uppercase mb-6 tracking-widest">Price Range</p>
            <Slider 
              defaultValue={[0, 100000]} 
              max={100000} 
              step={1000} 
              value={price}
              onValueChange={handleSliderChange}
              onValueCommit={handleSliderCommit}
            />
            <div className="flex justify-between mt-4 text-[11px] font-bold text-gray-600 italic">
              <span>₹{price[0].toLocaleString()}</span>
              <span>₹{price[1].toLocaleString()}</span>
            </div>
          </div>

          {/* Ratings Filter */}
          <div className="border-t pt-6">
            <p className="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-widest">Ratings</p>
            <div className="flex flex-col gap-3">
              {[4, 3, 2, 1].map((star) => (
                <label key={star} className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="radio" name="rating" checked={ratings === star}
                    onChange={() => setRatings(star)}
                    className="w-4 h-4 accent-[#2874f0]"
                  />
                  <div className="flex items-center gap-1 text-sm font-bold text-gray-700 group-hover:text-[#2874f0]">
                    {star} <Star size={14} className="fill-yellow-400 text-yellow-400" /> & Up
                  </div>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* 🛒 2. MAIN AREA */}
        <main className="flex-grow bg-white shadow-sm rounded-sm p-4 md:p-6 min-h-[70vh]">
          
          {/* Top Bar */}
          <div className="border-b pb-4 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-800 uppercase italic tracking-tighter">
                {keyword ? `Search: "${keyword}"` : categoryFromUrl ? `Premium ${categoryFromUrl}` : "All Products"}
              </h1>
              <p className="text-xs text-gray-400 font-bold">{filteredProductsCount} items found</p>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-400">Sort By:</span>
              <select 
                value={sort} onChange={(e) => setSort(e.target.value)}
                className="text-sm font-bold outline-none border-b-2 border-[#2874f0] pb-1 cursor-pointer"
              >
                <option value="">Newest First</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="-ratings">Customer Ratings</option>
              </select>
            </div>
          </div>

          {/* 🚀 Loader sirf Products Grid par aayega, pure page par nahi */}
          {loading ? (
            <div className="h-96 flex flex-col items-center justify-center">
              <Loader2 className="animate-spin text-[#2874f0] mb-2" size={40} />
              <p className="text-xs font-bold text-gray-400 uppercase">Updating List...</p>
            </div>
          ) : (
            <>
              {products && products.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                    {products.map(product => <ProductCard key={product._id} product={product} />)}
                  </div>

                  {/* PAGINATION */}
                  {filteredProductsCount > (resPerPage || 8) && (
                    <div className="mt-12 flex justify-center items-center gap-2 border-t pt-8">
                      <button 
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className="p-2 border rounded-md disabled:opacity-30 hover:bg-gray-50 transition-all"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                          key={index} onClick={() => setCurrentPage(index + 1)}
                          className={`px-4 py-2 border rounded-md text-sm font-bold transition-all ${
                            currentPage === index + 1 ? 'bg-[#2874f0] text-white' : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}

                      <button 
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className="p-2 border rounded-md disabled:opacity-30 hover:bg-gray-50 transition-all"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-lg">
                  <PackageSearch size={60} className="text-gray-200 mb-4" />
                  <h2 className="text-lg font-bold text-gray-400 uppercase tracking-tighter">Result Nahi Mila!</h2>
                  <p className="text-sm text-gray-400">Filters thode kam karke dekho.</p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AllProducts;