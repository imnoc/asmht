import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
    const { cartItems, clearCart } = useCart();
    const [billingInfo, setBillingInfo] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // Calculate the total amount from cart items
        const amount = cartItems.reduce((total, product) => total + (product.price * (product.quantity || 1)), 0);
        setTotalAmount(amount);
    }, [cartItems]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setBillingInfo(prevInfo => ({ ...prevInfo, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Tạo đối tượng đơn hàng
            const order = {
                ...billingInfo,
                items: cartItems,
                totalAmount: totalAmount + 5.00 + 4.20 // Tổng cộng bao gồm vận chuyển và thuế
            };

            // Gửi thông tin đơn hàng đến API
            await axios.post('http://localhost:3000/orders', order); // Địa chỉ API của bạn

            clearCart();
            alert('Đặt hàng thành công');
            navigate('/');
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Thanh toán</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                    {/* Thông tin người dùng */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-4">Thông tin giao hàng</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900">Họ và tên</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        value={billingInfo.fullName}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Địa chỉ email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={billingInfo.email}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="john.doe@example.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Địa chỉ</label>
                                    <input
                                        type="text"
                                        id="address"
                                        value={billingInfo.address}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="123 Main St"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">Thành phố</label>
                                    <input
                                        type="text"
                                        id="city"
                                        value={billingInfo.city}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="New York"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900">Bang/Tỉnh</label>
                                    <input
                                        type="text"
                                        id="state"
                                        value={billingInfo.state}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="NY"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="zip" className="block mb-2 text-sm font-medium text-gray-900">Mã bưu điện</label>
                                    <input
                                        type="text"
                                        id="zip"
                                        value={billingInfo.zip}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="10001"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Thông tin thanh toán */}
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold mb-4">Thông tin thanh toán</h2>
                                <div className="mb-6">
                                    <label htmlFor="cardNumber" className="block mb-2 text-sm font-medium text-gray-900">Số thẻ</label>
                                    <input
                                        type="text"
                                        id="cardNumber"
                                        value={billingInfo.cardNumber}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="1234 5678 9123 4567"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label htmlFor="expiryDate" className="block mb-2 text-sm font-medium text-gray-900">Ngày hết hạn</label>
                                        <input
                                            type="text"
                                            id="expiryDate"
                                            value={billingInfo.expiryDate}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="MM/YY"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="cvv" className="block mb-2 text-sm font-medium text-gray-900">CVV</label>
                                        <input
                                            type="text"
                                            id="cvv"
                                            value={billingInfo.cvv}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="123"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Tổng giá trị và nút thanh toán */}
                            <div className="bg-gray-100 p-6 rounded-lg">
                                <h2 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>
                                <div className="flex justify-between mb-4">
                                    <span className="font-medium">Tổng phụ</span>
                                    <span>${totalAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="font-medium">Vận chuyển</span>
                                    <span>$5.00</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="font-medium">Thuế</span>
                                    <span>$4.20</span>
                                </div>
                                <div className="flex justify-between mb-6 font-bold text-lg">
                                    <span>Tổng cộng</span>
                                    <span>${(totalAmount + 5.00 + 4.20).toFixed(2)}</span>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
                                >
                                    Đặt hàng
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
