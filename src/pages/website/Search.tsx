import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Product } from '../../interfaces/product'
import instance from '../../apis'
import sp8 from '../../image/annie-spratt-ncQ2sguVlgo-unsplash 1.png'
import { AiOutlineHeart, AiOutlineShareAlt, AiOutlineShoppingCart } from 'react-icons/ai';


const Search = () => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(8000);
    const [minSize, setMinSize] = useState(2);
    const [maxSize, setMaxSize] = useState(50);
    const handleMinChange = (e) => {
        setMinPrice(e.target.value);
    };

    const handleMaxChange = (e) => {
        setMaxPrice(e.target.value);
    };

    const handleMinChangeSize = (e) => {
        setMinSize(e.target.value);
    };

    const handleMaxChangeSize = (e) => {
        setMaxSize(e.target.value);
    };

    const [search] = useSearchParams()
    const [products, setProducts] = useState<Product[]>([])
    const [keywords, setKeywords] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        (async () => {
            try {
                const keyword = search.get('keyword') || ''
                const { data } = await instance.get(`products?name_like=${keyword}`)
                setProducts(data)
                setKeywords(keyword)
                setError(null)
            } catch (err) {
                setError('Không thể lấy dữ liệu sản phẩm')
                console.error(err)
            }
        })()
    }, [search])

    return (
        <>
            <div>
                <h1 className='text-2xl ml-48'>Kết quả tìm kiếm theo từ khóa: <strong>{keywords}</strong></h1>
                <div className='grid grid-cols-2 gap-30'>
                    {error && <p className="error">{error}</p>}
                    <div className='gap-24 ml-36 pb-16 w-4/5 grid grid-cols-2 gap-30'>
                        {products.map(item => (
                            <div className="relative group mt-10" key={item.id}>
                                <div className="relative">
                                    <Link to={`/detail/${item.id}`}>
                                        <img src={item.thumbnail} alt="Product" className="" />
                                    </Link>
                                    <div className="absolute top-16 left-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="flex space-x-2">
                                            <AiOutlineShareAlt className="bg-[#4E7C32] text-xl cursor-pointer rounded-sm text-[#fff] hover:text-black bg-[#4E7C32]" />
                                            <AiOutlineShoppingCart className="bg-[#4E7C32] text-xl cursor-pointer rounded-sm text-[#fff] hover:text-black bg-[#4E7C32]" />
                                            <AiOutlineHeart className="bg-[#4E7C32] text-xl cursor-pointer rounded-sm text-[#fff] hover:text-black bg-[#4E7C32]" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <Link to={`/detail/${item.id}`}>
                                        <p>{item.name}</p>
                                    </Link>
                                    <span className="text-gray-400">${item.price} <del className="text-gray-500 ml-3">${item.sale}</del></span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='mr-24'>
                        <div className='relative right-0 ml-80'>
                            <p className='font-baloo text-[#505F4E] text-2xl ml-20'>Kategorien</p>
                            <div className='ml-2'>
                                <div className='flex mt-6 ml-20'>
                                    <input type="checkbox" />
                                    <p className='ml-1'>Eckige Töpfe</p>
                                </div>
                                <div className='flex mt-4  ml-20'>
                                    <input type="checkbox" />
                                    <p className='ml-1'>Eckige Töpfe</p>
                                </div>
                                <div className='flex mt-4  ml-20'>
                                    <input type="checkbox" />
                                    <p className='ml-1'>Eckige Töpfe</p>
                                </div>
                                <div className='flex mt-4  ml-20'>
                                    <input type="checkbox" />
                                    <p className='ml-1'>Eckige Töpfe</p>
                                </div>
                            </div>
                            <div className="relative left-1/4 bottom-3/4 mt-4">
                                <div className="relative">
                                    <img src={sp8} alt="" className="" />
                                    <div className="absolute inset-0 flex flex-col items-center w-52 justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300">
                                        <p className="text-white font-bold absolute top-2 left-2">Grow your own <br /> favourite plant</p>
                                        <span className="text-white absolute bottom-2 left-2">Shop Now</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='relative ml-[53%] w-56'>
                            <div className="mt-4 ml-10 relative left-3 pr-2 w-full">
                                <div className="text-lg font-semibold mb-4">Filter By Price</div>
                                <div className="relative">
                                    <input
                                        type="range"
                                        min="0"
                                        max="8000"
                                        value={minPrice}
                                        onChange={handleMinChange}
                                        className="absolute w-full h-1 bg-gray-300 rounded-lg"
                                    />
                                    <input
                                        type="range"
                                        min="0"
                                        max="8000"
                                        value={maxPrice}
                                        onChange={handleMaxChange}
                                        className="absolute w-full h-1 bg-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="flex justify-between mt-8 w-full">
                                    <div className='text-gray-400'>From ${minPrice} to ${maxPrice}</div>
                                    <button className="text-gray-500 ml-4">Filter</button>
                                </div>
                            </div>
                            <div className="mt-4 ml-10 relative left-3 pr-2 w-full">
                                <div className="text-lg font-semibold mb-4">Filter By Size</div>
                                <div className="relative">
                                    <input
                                        type="range"
                                        min="2"
                                        max="50"
                                        value={minSize}
                                        onChange={handleMinChangeSize}
                                        className="absolute w-full h-1 bg-gray-300 rounded-lg"
                                    />
                                    <input
                                        type="range"
                                        min="2"
                                        max="50"
                                        value={maxSize}
                                        onChange={handleMaxChangeSize}
                                        className="absolute w-full h-1 bg-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="flex justify-between mt-8 w-full">
                                    <div className='text-gray-400'>{minSize}mm to {maxSize}mm</div>
                                    <button className="text-gray-500 ml-4">Filter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search