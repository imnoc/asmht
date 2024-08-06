import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../interfaces/cart';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart } = useCart();

    const groupedItems: { [key: string]: CartItem } = {};

    cartItems.forEach(item => {
        if (!groupedItems[item.name]) {
            groupedItems[item.name] = { ...item };
        } else {
            groupedItems[item.name].quantity += item.quantity;
        }
    });

    const groupedItemsArray = Object.values(groupedItems);


    const totalAmount = groupedItemsArray.reduce((total, item) => {
        const price = parseFloat(item.price);
        return total + (price * item.quantity);
    }, 0);

    const handleQuantityChange = (name: string, delta: number) => {
        const product = cartItems.find(item => item.name === name);
        if (product) {
            const newQuantity = product.quantity + delta;
            if (newQuantity > 0) {
                updateQuantity(name, newQuantity);
            }
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-6xl">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Giỏ hàng</h1>
            <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {groupedItemsArray.length > 0 ? (
                            groupedItemsArray.map((item: CartItem) => (
                                <tr key={item.name}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img
                                                src={item.thumbnail || '/default-thumbnail.png'}
                                                alt={item.name}
                                                className="w-24 h-24 object-cover rounded-lg shadow-md"
                                            />
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                                <p className="text-sm text-gray-500">{item.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {parseFloat(item.price).toFixed(2) || '0.00'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <button
                                                onClick={() => handleQuantityChange(item.name, -1)}
                                                className="bg-gray-200 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-300"
                                            >
                                                -
                                            </button>
                                            <span className="mx-3">{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item.name, 1)}
                                                className="bg-gray-200 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-300"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {(parseFloat(item.price) * item.quantity).toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => removeFromCart(item.name)} className="text-red-600 hover:text-red-900">Xóa</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">Giỏ hàng của bạn đang trống.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="px-6 py-4 flex justify-between items-center font-bold text-lg text-gray-800">
                    <span>Tổng cộng</span>
                    <span>{totalAmount.toFixed(2)}</span>
                </div>
                <div className="px-6 py-4 flex justify-center">
                    <Link to={`/checkout`}>
                        <button className="bg-blue-600 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
                            Thanh toán
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
