import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaStar } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { getIdProduct } from '../../apis/products';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../interfaces/cart';
import { Product } from '../../interfaces/product';

const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const { addToCart, getCart } = useCart();
    const navigate = useNavigate();

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    useEffect(() => {
        (async () => {
            const data = await getIdProduct(`${id}`);
            setProduct(data);
        })();
    }, [id]);

    const handleAddToCart = async () => {
        if (product) {
            const cartItem: CartItem = {
                id: product.id,
                name: product.name,
                quantity,
                category: product.category,
                thumbnail: product.thumbnail,
                description: product.description,
                price: product.price
            };

            try {
                // Lấy giỏ hàng hiện tại
                const cartResponse = await axios.get('http://localhost:3000/carts');
                const cartItems = cartResponse.data;

                // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
                const existingItem = cartItems.find((item: CartItem) => item.id === product.id);

                if (existingItem) {
                    // Cập nhật số lượng của sản phẩm trong giỏ hàng
                    await axios.patch(`http://localhost:3000/carts/${existingItem.id}`, {
                        quantity: existingItem.quantity + quantity
                    });
                } else {
                    // Thêm sản phẩm mới vào giỏ hàng
                    await axios.post('http://localhost:3000/carts', cartItem);
                }

                // Thêm vào giỏ hàng thông qua context
                addToCart(cartItem);

                // Điều hướng đến trang giỏ hàng
                navigate('/cart');
            } catch (error) {
                console.error('Error adding to cart:', error.response ? error.response.data : error.message);
                alert('Đã xảy ra lỗi khi thêm vào giỏ hàng.');
            }
        }
    };




    return (
        <div className="w-[1350px]">
            <div className="ml-20 pt-20 grid grid-cols-2 mr-20">
                <div className="">
                    <img src={product?.thumbnail} alt="" className="w-3/6 mx-20" />
                    <div className="flex space-x-1 ml-14 mt-8">
                        {product?.images &&
                            product.images.map((item, index) => (
                                <img key={index} src={item} alt="" className="hover:border hover:border-gray-500 rounded-lg w-1/5" />
                            ))}
                    </div>
                </div>
                <div className="w-[95%]">
                    <p className="text-[#4E7C32] text-3xl font-bold font-kumbh">Chi tiết sản phẩm</p>
                    <h1 className="text-4xl font-kumbh mt-4 mb-4">{product?.name}</h1>
                    <span className="text-[#68707D] mt-4">{product?.short_description}</span>
                    <div className="flex space-x-4 mt-4">
                        <del>
                            <span className=" text-[#4E7C32] rounded-lg"></span>150.000
                        </del>
                    </div>
                    <p className="mt-4 text-xl font-bold text-red-700">{product?.price} </p>
                    <div className="flex space-x-10 mt-4">
                        <div className="flex items-center justify-between w-40 p-2 bg-gray-50 rounded-lg">
                            <button className="" onClick={handleDecrement}>
                                <span className="text-2xl">-</span>
                            </button>
                            <span className="text-2xl font-bold">{quantity}</span>
                            <button className="" onClick={handleIncrement}>
                                <span className="text-2xl">+</span>
                            </button>
                        </div>
                        <div className="flex bg-[#4E7C32] w-44 py-2 pl-6 rounded-lg">
                            <AiOutlineShoppingCart className="text-white mt-2 mr-2 text-xl" />
                            <button className="text-white" onClick={handleAddToCart}>
                                Thêm giỏ hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ml-32 mt-10">
                <div className="w-4/5">
                    <p className="text-[#4E7C32] text-2xl">Mô tả</p>
                    <span className="text-[#665345]">{product?.desc}</span>
                </div>
                <div className="mt-6">
                    <p className="text-[#4E7C32] text-2xl">Về chúng tôi</p>
                    <span className="text-[#665345]">
                        Lorem Ipsum chỉ đơn giản là văn bản giả của ngành in ấn và sắp chữ. Lorem Ipsum đã là Văn bản giả tiêu chuẩn của ngành kể từ
                        những năm 1500, <br /> khi một nhà in không xác định đã sử dụng một bản in gõ và xáo trộn tôi
                    </span>
                </div>
            </div>
            <div className="flex ml-32 mt-10">
                <img src={product?.thumbnail} alt="" className="hover:border hover:border-gray-500 rounded-lg w-1/6" />
                <p className="absolute right-96 text-white bg-[#4E7C32] p-2 rounded-lg">Bình luận</p>
                <div className="flex mt-24 text-gray-500 ml-4">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </div>
                <span className="mt-32 ml-56 text-[#4E7C32]  absolute">5.0 (388)</span>
            </div>
            <div className="flex ml-32 mt-14 space-x-1">
                1 <FaStar className="mt-1 border- border-gray-300" />
                <div className="relative w-3/6 h-4 mt-1 ">
                    <div className="absolute top-0 left-0 h-4 bg-[#A2A0A0] rounded" style={{ width: '75%' }}></div>
                </div>
            </div>
            <div className="flex ml-32 mt-2 space-x-1">
                2 <FaStar className="mt-1 border- border-gray-300" />
                <div className="relative w-3/6 h-4 mt-1 ">
                    <div className="absolute top-0 left-0 h-4 bg-[#D9D9D9] rounded" style={{ width: '15%' }}></div>
                </div>
            </div>
            <div className="flex ml-32 mt-2 space-x-1">
                3 <FaStar className="mt-1 border- border-gray-300" />
                <div className="relative w-3/6 h-4 mt-1 ">
                    <div className="absolute top-0 left-0 h-4 bg-[#D9D9D9] rounded" style={{ width: '15%' }}></div>
                </div>
            </div>
            <div className="flex ml-32 mt-2 space-x-1">
                4 <FaStar className="mt-1 border- border-gray-300" />
                <div className="relative w-3/6 h-4 mt-1 ">
                    <div className="absolute top-0 left-0 h-4 bg-[#D9D9D9] rounded" style={{ width: '15%' }}></div>
                </div>
            </div>
            <div className="flex ml-32 mt-2 space-x-1">
                5 <FaStar className="mt-1 border- border-gray-300" />
                <div className="relative w-3/6 h-4 mt-1 ">
                    <div className="absolute top-0 left-0 h-4 bg-[#4E7C32] rounded" style={{ width: '75%' }}></div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
