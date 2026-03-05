// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProducts } from '@/features/product/productSlice';
// import { AppDispatch, RootState } from '@/app/store';
// import ProductCard from '@/components/products/ProductCard';
// import { Skeleton } from '@/components/ui/skeleton';
// import { Truck, ShieldCheck, RefreshCcw, ChevronRight } from 'lucide-react';

// const categories = [
//   { name: "Mobiles", img: "https://rukminim2.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png" },
//   { name: "Electronics", img: "https://rukminim2.flixcart.com/flap/128/128/image/69c6589653afdb9a.png" },
//   { name: "Fashion", img: "https://rukminim2.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png" },
//   { name: "Home", img: "https://rukminim2.flixcart.com/flap/128/128/image/ab7e2c021d972921.png" },
//   { name: "Appliances", img: "https://rukminim2.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png" },
// ];

// const Home = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { products, loading } = useSelector((state: RootState) => state.product);

//   useEffect(() => {
//     // 🚀 Landing page par saara data mangwa lo
//     dispatch(getProducts({})); 
//   }, [dispatch]);

//   // 🎯 Frontend Filtering Logic
//   const getCategoryProducts = (catName: string) => {
//     return products?.filter(p => p.category.toLowerCase() === catName.toLowerCase()).slice(0, 5);
//   };

//   const sections = [
//     { title: "Best of Electronics", cat: "electronics" },
//     { title: "Fashion Top Deals", cat: "fashion" },
//     { title: "Latest Mobiles", cat: "mobiles" },
//     { title: "Home & Kitchen", cat: "home" }
//   ];

//   return (
//     <div className="bg-[#f1f3f6] min-h-screen pb-10">
      
//       {/* 1. TOP CATEGORY BAR */}
//       <div className="bg-white shadow-sm border-b hidden md:block">
//         <div className="container mx-auto flex justify-between px-10 py-4">
//           {categories.map((cat) => (
//             <Link key={cat.name} to={`/products?category=${cat.name.toLowerCase()}`} className="flex flex-col items-center gap-1 group">
//               <img src={cat.img} alt={cat.name} className="w-16 h-16 object-contain group-hover:scale-110 transition-transform" />
//               <span className="text-sm font-bold text-gray-700 group-hover:text-blue-600">{cat.name}</span>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* 2. HERO BANNER */}
//       <section className="container mx-auto px-2 md:px-4 mt-4">
//         <div className="relative h-44 md:h-[350px] w-full bg-[#2874f0] rounded-sm overflow-hidden shadow-md">
//           <img 
//             src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070" 
//             className="w-full h-full object-cover opacity-80"
//             alt="Main Banner"
//           />
//           <div className="absolute inset-0 flex flex-col justify-center px-10 text-white bg-gradient-to-r from-black/40 to-transparent">
//             <h1 className="text-2xl md:text-5xl font-black italic">MASTERPIECE SALE</h1>
//             <p className="text-sm md:text-xl mt-2 opacity-90">Premium Quality, Unmatched Prices</p>
//           </div>
//         </div>
//       </section>

//       {/* 3. TRUST BAR */}
//       <div className="container mx-auto px-4 mt-4">
//         <div className="bg-white py-4 px-6 shadow-sm rounded-sm flex flex-wrap justify-around items-center gap-4 text-gray-600">
//           <div className="flex items-center gap-2 text-xs md:text-sm font-medium"><Truck className="text-blue-600" size={20} /> Free Shipping</div>
//           <div className="flex items-center gap-2 text-xs md:text-sm font-medium"><ShieldCheck className="text-blue-600" size={20} /> 100% Genuine</div>
//           <div className="flex items-center gap-2 text-xs md:text-sm font-medium"><RefreshCcw className="text-blue-600" size={20} /> Easy Returns</div>
//         </div>
//       </div>

//       {/* 4. DYNAMIC CATEGORY SECTIONS */}
//       {sections.map((section) => {
//         const sectionProducts = getCategoryProducts(section.cat);
        
//         // Agar us category mein koi product nahi hai, toh section mat dikhao
//         if (sectionProducts?.length === 0 && !loading) return null;

//         return (
//           <section key={section.cat} className="container mx-auto px-2 md:px-4 mt-6">
//             <div className="bg-white shadow-sm rounded-sm">
//               <div className="flex justify-between items-center p-5 border-b">
//                 <h2 className="text-lg md:text-xl font-bold text-gray-800">{section.title}</h2>
//                 <Link 
//                   to={`/products?category=${section.cat}`} 
//                   className="bg-[#2874f0] text-white px-4 py-2 rounded-sm text-[10px] md:text-xs font-bold shadow-md hover:bg-blue-700 flex items-center gap-1"
//                 >
//                   VIEW ALL <ChevronRight size={14} />
//                 </Link>
//               </div>

//               <div className="p-5">
//                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
//                   {loading ? (
//                     Array.from({ length: 5 }).map((_, i) => (
//                       <Skeleton key={i} className="h-64 w-full bg-gray-100 rounded-sm" />
//                     ))
//                   ) : (
//                     sectionProducts?.map((product) => (
//                       <ProductCard key={product._id} product={product} />
//                     ))
//                   )}
//                 </div>
//               </div>
//             </div>
//           </section>
//         );
//       })}

//     </div>
//   );
// };

// export default Home;


import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '@/features/product/productSlice';
import { AppDispatch, RootState } from '@/app/store';
import ProductCard from '@/components/products/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Truck, ShieldCheck, RefreshCcw, ChevronRight } from 'lucide-react';

const categories = [
  { name: "Mobiles", img: "https://rukminim2.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png" },
  { name: "Electronics", img: "https://rukminim2.flixcart.com/flap/128/128/image/69c6589653afdb9a.png" },
  { name: "Fashion", img: "https://rukminim2.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png" },
  { name: "Home", img: "https://rukminim2.flixcart.com/flap/128/128/image/ab7e2c021d972921.png" },
  { name: "Appliances", img: "https://rukminim2.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png" },
];

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.product);

  useEffect(() => {
  // 🚀 Ab limit bhej rahe hain
  dispatch(getProducts({ limit: 50 })); 
}, [dispatch]);

  // 🎯 Frontend Filtering Logic
  const getCategoryProducts = (catName: string) => {
    return products?.filter(p => p.category.toLowerCase() === catName.toLowerCase()).slice(0, 5);
  };

  const sections = [
    { title: "Best of Electronics", cat: "electronics" },
    { title: "Fashion Top Deals", cat: "fashion" },
    { title: "Latest Mobiles", cat: "mobiles" },
    { title: "Home & Kitchen", cat: "home" },
    { title: "Top Appliances", cat: "appliances" }
  ];

  return (
    <div className="bg-[#f1f3f6] min-h-screen pb-10">
      
      {/* 1. TOP CATEGORY BAR */}
      <div className="bg-white shadow-sm border-b hidden md:block">
        <div className="container mx-auto flex justify-between px-10 py-4">
          {categories.map((cat) => (
            <Link key={cat.name} to={`/products?category=${cat.name.toLowerCase()}`} className="flex flex-col items-center gap-1 group">
              <img src={cat.img} alt={cat.name} className="w-16 h-16 object-contain group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold text-gray-700 group-hover:text-blue-600">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 2. HERO BANNER */}
      <section className="container mx-auto px-2 md:px-4 mt-4">
        <div className="relative h-44 md:h-[350px] w-full bg-[#2874f0] rounded-sm overflow-hidden shadow-md">
          <img 
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070" 
            className="w-full h-full object-cover opacity-80"
            alt="Main Banner"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-10 text-white bg-gradient-to-r from-black/40 to-transparent">
            <h1 className="text-2xl md:text-5xl font-black italic">MASTERPIECE SALE</h1>
            <p className="text-sm md:text-xl mt-2 opacity-90">Premium Quality, Unmatched Prices</p>
          </div>
        </div>
      </section>

      {/* 3. TRUST BAR */}
      <div className="container mx-auto px-4 mt-4">
        <div className="bg-white py-4 px-6 shadow-sm rounded-sm flex flex-wrap justify-around items-center gap-4 text-gray-600">
          <div className="flex items-center gap-2 text-xs md:text-sm font-medium"><Truck className="text-blue-600" size={20} /> Free Shipping</div>
          <div className="flex items-center gap-2 text-xs md:text-sm font-medium"><ShieldCheck className="text-blue-600" size={20} /> 100% Genuine</div>
          <div className="flex items-center gap-2 text-xs md:text-sm font-medium"><RefreshCcw className="text-blue-600" size={20} /> Easy Returns</div>
        </div>
      </div>

      {/* 4. DYNAMIC CATEGORY SECTIONS */}
      {sections.map((section) => {
        const sectionProducts = getCategoryProducts(section.cat);
        
        // Agar us category mein koi product nahi hai, toh section mat dikhao
        if (sectionProducts?.length === 0 && !loading) return null;

        return (
          <section key={section.cat} className="container mx-auto px-2 md:px-4 mt-6">
            <div className="bg-white shadow-sm rounded-sm">
              <div className="flex justify-between items-center p-5 border-b">
                <h2 className="text-lg md:text-xl font-bold text-gray-800">{section.title}</h2>
                <Link 
                  to={`/products?category=${section.cat}`} 
                  className="bg-[#2874f0] text-white px-4 py-2 rounded-sm text-[10px] md:text-xs font-bold shadow-md hover:bg-blue-700 flex items-center gap-1"
                >
                  VIEW ALL <ChevronRight size={14} />
                </Link>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-64 w-full bg-gray-100 rounded-sm" />
                    ))
                  ) : (
                    sectionProducts?.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

    </div>
  );
};

export default Home;