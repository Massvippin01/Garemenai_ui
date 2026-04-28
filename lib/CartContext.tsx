"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string; // use a composite ID like `${productId}-${size}-${color}`
  productId: string;
  name: string;
  price: number;
  image?: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("shop-co-cart");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Filter out any stale items with broken image paths from before the fix
        const cleaned = parsed.filter((item: CartItem) => 
          !item.image || item.image.startsWith("/") || item.image.startsWith("http")
        );
        setItems(cleaned);
        if (cleaned.length !== parsed.length) {
          localStorage.setItem("shop-co-cart", JSON.stringify(cleaned));
        }
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save to local storage whenever items change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("shop-co-cart", JSON.stringify(items));
    }
  }, [items, mounted]);

  const addToCart = (newItem: CartItem) => {
    setItems((prev) => {
      const existingIdx = prev.findIndex((i) => i.id === newItem.id);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = { 
          ...next[existingIdx], 
          quantity: next[existingIdx].quantity + newItem.quantity 
        };
        return next;
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: newQuantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
