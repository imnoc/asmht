// CartContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '../interfaces/cart';
import axios from 'axios';

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    updateQuantity: (name: string, quantity: number) => void;
    removeFromCart: (name: string) => void;
}

const CartContext = createContext<CartContextType>({
    cartItems: [],
    addToCart: () => { },
    updateQuantity: () => { },
});

export const useCart = () => useContext(CartContext);

const CartProvider: React.FC = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/carts')
            .then(response => setCartItems(response.data))
            .catch(error => console.error('Error fetching cart items:', error));
    }, []);

    const addToCart = (item: CartItem) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(cartItem => cartItem.name === item.name);
            if (existingItemIndex > -1) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += item.quantity;
                return updatedItems;
            } else {
                return [...prevItems, item];
            }
        });
    };

    const updateQuantity = async (name: string, quantity: number) => {
        const existingItem = cartItems.find(cartItem => cartItem.name === name);
        if (existingItem) {
            const updatedItem = { ...existingItem, quantity };
            await axios.patch(`http://localhost:3000/carts/${existingItem.id}`, { quantity: updatedItem.quantity });
            setCartItems(prevItems => prevItems.map(cartItem => cartItem.id === existingItem.id ? updatedItem : cartItem));
        }
    };
    const removeFromCart = async (name: string) => {
        if (confirm('Are you sure?')) {
            const existingItem = cartItems.find(cartItem => cartItem.name === name);
            if (existingItem) {

                await axios.delete(`http://localhost:3000/carts/${existingItem.id}`);
                setCartItems(prevItems => prevItems.filter(cartItem => cartItem.id !== existingItem.id));
            }
        }
    };
    const clearCart = () => {
        setCartItems([]);
    };



    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartProvider };
