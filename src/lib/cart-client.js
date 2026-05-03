"use client";

const CART_KEY = "suncart_cart";

export const getCartItems = () => {
  if (typeof window === "undefined") return [];

  try {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

export const saveCartItems = (items) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("suncart-cart-change"));
};

export const addToCart = (product) => {
  const cartItems = getCartItems();

  const existingItem = cartItems.find((item) => item.id === product.id);

  if (existingItem) {
    const updatedItems = cartItems.map((item) =>
      item.id === product.id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    saveCartItems(updatedItems);
    return;
  }

  const newItem = {
    id: product.id,
    name: product.name,
    brand: product.brand,
    price: product.price,
    image: product.image,
    quantity: 1,
  };

  saveCartItems([...cartItems, newItem]);
};

export const removeFromCart = (productId) => {
  const cartItems = getCartItems();
  const updatedItems = cartItems.filter((item) => item.id !== productId);
  saveCartItems(updatedItems);
};

export const clearCart = () => {
  saveCartItems([]);
};

export const getCartTotal = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};