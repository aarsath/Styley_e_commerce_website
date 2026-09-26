// ProductCard.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductTOCheckout } from '../../store/userStore';

const ProductCard = ({product}) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const {checkoutProducts} = useSelector((state) => state.user);
  const isProductAddedForCheckout = checkoutProducts.findIndex(checkoutProduct => checkoutProduct.id === product.id) === -1

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <article className="group flex h-full min-w-0 flex-col rounded-lg border border-[#e5e5e5] bg-white p-3 transition-shadow hover:shadow-md">
      <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-lg bg-[#fafafa] sm:h-56">
        {isLoading && <div className="absolute inset-0 animate-pulse bg-[#f3f3f3]" />}
        <img className="h-full w-full object-cover transition duration-300 group-hover:scale-105" src={product.imageUrl} alt={product.title} onLoad={handleImageLoad} onError={() => setIsLoading(false)} style={{ display: isLoading ? 'none' : 'block' }} />
      </div>
      <div className="flex flex-1 flex-col pt-3">
        <div className="text-[13px] font-medium text-[#333]">{product.title}</div>
        <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-[#767676]">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="text-[13px] font-medium text-[#333]">
            ₹{product.price}
          </span>
          <button
            aria-label={isProductAddedForCheckout ? `Add ${product.title} to cart` : `Remove ${product.title} from cart`}
            className={"rounded-lg px-3 py-2 text-[12px] font-medium transition focus:outline-none focus:ring-4 " + (isProductAddedForCheckout ? "bg-[#1a1a1a] text-white hover:bg-[#333] focus:ring-[#e5e5e5]" : "border border-[#d32f2f] bg-white text-[#d32f2f] hover:bg-[#fff5f5] focus:ring-[#fce4e4]")}
            onClick={() => dispatch(addProductTOCheckout(product))}>
            {isProductAddedForCheckout ? "Add to cart" : "Remove"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
