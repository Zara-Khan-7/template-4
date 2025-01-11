'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BeakerIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type Product = {
  id: number;
  img: string;
  name: string;
  price: number;
  sale?: boolean;
  quantity?: number;  // Make sure the product can have a quantity property
};

function LatestProducts() {
  const [cart, setCart] = useState<Product[]>([]); // Initialize empty cart
  const [message, setMessage] = useState<string>(''); // Message to show when product is added
  const [showConfirmation, setShowConfirmation] = useState(false); // State to manage popup visibility
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Store selected product for confirmation

  useEffect(() => {
    // Retrieve cart data from localStorage when the component mounts
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Update localStorage whenever the cart changes
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product: Product) => {
    setSelectedProduct(product); // Store the selected product for confirmation
    setShowConfirmation(true); // Show the confirmation popup
  };

  const handleConfirmAddToCart = () => {
    if (selectedProduct) {
      setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.id === selectedProduct.id);

        if (existingProduct) {
          // If product already exists in cart, update the quantity
          return prevCart.map((item) =>
            item.id === selectedProduct.id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          );
        }

        // If product doesn't exist in cart, add a new one
        return [...prevCart, { ...selectedProduct, quantity: 1 }];
      });

      setMessage('Product added to cart!');
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    }

    setShowConfirmation(false); // Close the confirmation popup after confirming
  };

  const handleCancelAddToCart = () => {
    setShowConfirmation(false); // Close the confirmation popup without adding the product
  };

  const products: Product[] = [
    { id: 1, img: '/images/product1.png', name: 'Product 1', price: 42 },
    { id: 2, img: '/images/product2.png', name: 'Product 2', price: 50, sale: true },
    { id: 3, img: '/images/product3.png', name: 'Product 3', price: 60 },
    { id: 4, img: '/images/product4.png', name: 'Product 4', price: 55 },
    { id: 5, img: '/images/product5.png', name: 'Product 5', price: 45 },
    { id: 6, img: '/images/product6.png', name: 'Product 6', price: 50 },
  ];

  return (
    <div className="w-full bg-white py-20">
      <h2 className="text-[#3F509E] text-4xl text-center font-bold mb-8">Latest Products</h2>

      {/* Message Section */}
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

      {/* Confirmation Popup */}
      {showConfirmation && selectedProduct && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white text-black px-6 py-4 rounded-lg shadow-lg font-bold text-xl space-y-4 text-center w-1/2">
            <p>Are you sure you want to add {selectedProduct.name} to the cart?</p>
            <div className="space-x-4 mt-4">
              <button
                className="bg-[#3F509E] text-white px-6 py-2 rounded-lg hover:bg-[#2b3a7d] transition duration-300"
                onClick={handleConfirmAddToCart}
              >
                Yes, Add to Cart
              </button>
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                onClick={handleCancelAddToCart}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="relative group">
            {/* Product Image */}
            <div className="w-full bg-gray-200 flex justify-center items-center relative overflow-hidden h-[300px] transition-all duration-300 group-hover:bg-white">
              {product.sale && (
                <span className="absolute top-2 left-2 bg-[#3F509E] text-white text-sm px-3 py-1 rounded">
                  Sale
                </span>
              )}
              <Image
                src={product.img}
                width={200}
                height={200}
                alt={product.name}
                className="object-contain"
              />

              {/* Add to Cart Button */}
              <div className="absolute top-2 right-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  className="bg-white p-2 rounded-full shadow"
                  onClick={() => addToCart(product)} // Add to Cart functionality
                >
                  <BeakerIcon className="h-6 w-6 text-blue-500" />
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold text-[#3F509E]">{product.name}</h3>
              <div className="mt-2 text-gray-600 flex justify-center items-center gap-2">
                <span className="text-red-600 font-medium line-through">${product.price * 1.2}</span>
                <span className="text-gray-800">${product.price}</span>
              </div>
            </div>

            <div className="text-center mt-4">
              <button
                className="bg-[#3F509E] text-white px-6 py-2 rounded-lg hover:bg-[#2b3a7d] transition duration-300"
                onClick={() => addToCart(product)} // Add to Cart functionality
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestProducts;
