import React from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductProps {
  product: any;
}

const ProductCard = ({ product }: ProductProps) => {
  // 🚀 Logic: Sabse pehle attachments dekho, phir images, phir placeholder
  const displayImage = 
    (product.attachments && product.attachments.length > 0) ? product.attachments[0].url :
    (product.images && product.images.length > 0) ? product.images[0].url :
    'https://via.placeholder.com/300?text=Masterpiece+Product';

  // 💰 Fake Discount % calculate karne ke liye (Amazon/Flipkart feel)
  const originalPrice = product.price + 500;
  const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <div className="group relative bg-white rounded-sm border border-transparent hover:border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer">
      
      {/* पूरे कार्ड को लिंक बनाया है (Add to Cart को छोड़कर) */}
      <Link to={`/product/${product._id}`} className="flex flex-col h-full">
        
        {/* 1. Image Section */}
        <div className="relative aspect-[4/5] overflow-hidden p-4 bg-white">
          <img
            src={displayImage}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Discount Badge */}
          <div className="absolute top-2 left-2">
            <span className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm shadow-sm">
              {discount}% OFF
            </span>
          </div>
        </div>

        {/* 2. Details Section */}
        <div className="p-4 flex flex-col flex-grow pt-0">
          {/* Category */}
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            {product.category}
          </span>

          {/* Name */}
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight group-hover:text-[#2874f0] transition-colors mb-2">
            {product.name}
          </h3>

          {/* Ratings (Amazon Style) */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center gap-0.5 bg-green-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
              {product.ratings || "0"} <Star size={10} fill="currentColor" />
            </div>
            <span className="text-[11px] font-bold text-gray-400">
              ({product.numReviews || 0})
            </span>
          </div>

          {/* Price Section */}
          <div className="mt-auto">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">₹{product.price?.toLocaleString()}</span>
              <span className="text-xs text-gray-400 line-through">₹{originalPrice}</span>
            </div>
            <p className="text-[10px] text-green-700 font-bold">Free delivery</p>
          </div>
        </div>
      </Link>

      {/* 3. Quick Action Button (Isolated from Card Link) */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          alert("Add to cart logic yahan aayegi!");
        }}
        className="absolute bottom-4 right-4 bg-[#ff9f00] text-white p-2.5 rounded-full hover:bg-[#fb641b] transition-all active:scale-95 shadow-lg md:opacity-0 md:group-hover:opacity-100"
      >
        <ShoppingCart size={18} fill="currentColor" />
      </button>
    </div>
  );
};

export default ProductCard;