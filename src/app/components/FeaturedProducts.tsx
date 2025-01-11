'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { HeartIcon, ShoppingCartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type Product = {
  id: number;
  img: string;
  name: string;
  code: string;
  price: number;  // Ensure price is a number
};

function FeaturedProducts() {
  const [cart, setCart] = useState<Product[]>([]);
  const [message, setMessage] = useState<string>("");

  const products: Product[] = [
    {
      id: 1,
      img: "/images/chair.png",
      name: "Cantilever Chair",
      code: "Y523201",
      price: 42.00,  // Store as a number
    },
    {
      id: 2,
      img: "/images/chair2.png",
      name: "Cantilever Chair",
      code: "Y523201",
      price: 42.00,
    },
    {
      id: 3,
      img: "/images/chair3.png",
      name: "Cantilever Chair",
      code: "Y523201",
      price: 42.00,
    },
    {
      id: 4,
      img: "/images/chair4.png",
      name: "Cantilever Chair",
      code: "Y523201",
      price: 42.00,
    },
  ];

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart); // Load cart items only when component mounts
  }, []);

  // Add item to cart
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const isProductInCart = prevCart.some((item) => item.id === product.id);

      if (isProductInCart) {
        showMessage(`${product.name} is already in the cart!`);
        return prevCart;
      }

      const updatedCart = [...prevCart, product];
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save updated cart to localStorage
      showMessage(`${product.name} added to cart!`);
      return updatedCart;
    });
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(""); // Clear message after 3 seconds
    }, 2000);
  };

  return (
    <div className="w-full bg-white py-20">
      {/* Heading */}
      <h2 className="text-black text-4xl text-center mb-16 font-bold">Featured Products</h2>

      {/* Message Section (Popup Message) */}
      {message && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-green-100 text-green-700 px-6 py-3 rounded-lg shadow-lg font-bold text-xl space-y-4 text-center">
            <p>{message}</p>
            <Link href="/cart">
              <button className="bg-[#3F509E] text-white px-6 py-2 rounded-lg hover:bg-[#2b3a7d] transition duration-300">
                View Cart
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="relative group">
            {/* Product Image with Icons */}
            <div className="w-full bg-gray-200 flex justify-center items-center relative overflow-hidden h-[400px]">
              {/* Product Image */}
              <Image
                src={product.img}
                width={200}
                height={250}
                alt={product.name}
                className="object-cover w-[200px] h-[250px] transition-all duration-300 group-hover:scale-105"
              />

              {/* Icons (Wishlist, View Details, and Zoom) */}
              <div className="absolute top-2 right-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white p-2 rounded-full">
                  <HeartIcon className="w-6 h-6 text-gray-700" />
                </button>
                <button className="bg-white p-2 rounded-full">
                  <MagnifyingGlassIcon className="w-6 h-6 text-gray-700" />
                </button>
                <button className="bg-white p-2 rounded-full">
                  <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <div className="absolute bottom-0 w-full text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="w-full py-2 text-sm bg-[#08D15F] rounded-none hover:bg-green-700 transition-colors"
                  onClick={() => addToCart(product)} // Add to Cart Handler
                >
                  Add To Cart
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold text-red-500">{product.name}</h3>
              <div className="flex justify-center items-center gap-1 mt-1">
                <span className="text-[#05E6B7] text-4xl">-</span>
                <span className="text-[#F701A8] text-4xl">-</span>
                <span className="text-[#00009D] text-4xl">-</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">Code - {product.code}</p>
              <p className="mt-1 text-dark-blue-900">${product.price.toFixed(2)}</p> {/* Display formatted price */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
