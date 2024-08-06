import { useEffect, useState } from "react";
import sp8 from "../../image/annie-spratt-ncQ2sguVlgo-unsplash 1.png";
import sp3 from "../../image/dedww 1.png";
import sp4 from "../../image/gbfdf 1.png";
import sp1 from "../../image/htgyr 1.png";
import sp2 from "../../image/hthrt 1.jpg";

import {
    AiOutlineHeart,
    AiOutlineShareAlt,
    AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Category, Product } from "../../interfaces/product";
import instance from "../../apis";

type Props = {
    categories: Category[];
};

const Category = ({ categories = [] }: Props) => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(8000);
    const [minSize, setMinSize] = useState(2);
    const [maxSize, setMaxSize] = useState(50);
    const [categorys, setCategorys] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [products, setProducts] = useState<Product[]>([]);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Fetch categories and products
    useEffect(() => {
        (async () => {
            try {
                const [categoryResponse, productResponse] = await Promise.all([
                    instance.get('categorys'),
                    instance.get('products') // Assumes 'products' is the correct endpoint
                ]);
                setCategorys(categoryResponse.data);
                setProducts(productResponse.data);
            } catch (error) {
                console.error('Error fetching categories or products:', error);
            }
        })();
    }, []);

    // Update selected category when ID changes
    useEffect(() => {
        if (id) {
            const selected = categorys.find((category) => category.id === id);
            if (selected) {
                setSelectedCategory(selected.name);
            }
        } else {
            setSelectedCategory("");
        }
    }, [id, categorys]);

    const filteredProducts = products.filter(
        (product: Product) =>
            (selectedCategory === "" || product.category === selectedCategory)
    );

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = categorys.find((cat) => cat.name === e.target.value);
        if (selected) {
            setSelectedCategory(selected.name);
            navigate(`/category/${selected.id}`);
        } else {
            setSelectedCategory("");
            navigate("/products");
        }
    };

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinPrice(Number(e.target.value));
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxPrice(Number(e.target.value));
    };

    const handleMinChangeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinSize(Number(e.target.value));
    };

    const handleMaxChangeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxSize(Number(e.target.value));
    };

    return (
        <div>
            <div className="text-[#505F4E] text-3xl font-baloo bg-[#D2E8CD] p-20">
                <p className="ml-24">Töpfe & Behälter</p>
            </div>
            <div className="flex gap-36 justify-center py-10 pb-20">
                <div className="flex border-2 p-3 px-6 bg-[#D2E8CD] rounded-lg ">
                    <img src={sp1} alt="" />
                    <p className="text-[#505F4E] mt-2 ml-2">EckigeTöpfe</p>
                </div>
                <div className="flex border-2 p-3 bg-[#D2E8CD] rounded-lg">
                    <img src={sp2} alt="" />
                    <p className="text-[#505F4E] mt-3 ml-2">RundeTöpfe</p>
                </div>
                <div className="flex border-2 p-3 bg-[#D2E8CD] rounded-lg">
                    <img src={sp3} alt="" />
                    <p className="text-[#505F4E] mt-3 ml-2">Untersetzer</p>
                </div>
                <div className="flex border-2 p-3 bg-[#D2E8CD] rounded-lg">
                    <img src={sp4} alt="" />
                    <p className="text-[#505F4E] mt-3 ml-2">Pflanzschalen</p>
                </div>
            </div>
            <div className="flex space-x-10 ml-32">
                <div className="flex">
                    <p className="mt-1">Category:</p>
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="border-gray-300 text-gray-400 w-48 p-2 rounded-lg border-solid border ml-2"
                    >
                        <option value="">All Categories</option>
                        {categorys.map((item) => (
                            <option key={item.id} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex">
                    <p className="mt-1">Show:</p>
                    <select
                        name="sort"
                        id="sort-select"
                        className="border-gray-300 text-gray-400 w-48 p-1 rounded-lg border-solid border ml-2"
                    >
                        <option value="newest">Default</option>
                        <option value="oldest">Oldest</option>
                        <option value="alphabetical">Alphabetical</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-30">
                <div className="ml-22 grid grid-cols-3 w-full gap-20 ml-20">
                    {filteredProducts.map((item: Product) => (
                        <div className="relative group mt-10" key={item.id}>
                            <div className="relative">
                                <Link to={`/detail/${item.id}`}>
                                    <img src={item.thumbnail} alt="Product" className="" />
                                </Link>
                                <div className="absolute top-16 left-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="flex space-x-2 mt-10 ml-4">
                                        <AiOutlineShareAlt className=" text-4xl cursor-pointer rounded-sm text-[#fff] hover:text-black bg-[#4E7C32]" />
                                        <AiOutlineShoppingCart className="text-4xl cursor-pointer rounded-sm text-[#fff] hover:text-black bg-[#4E7C32]" />
                                        <AiOutlineHeart className=" text-4xl cursor-pointer rounded-sm text-[#fff] hover:text-black bg-[#4E7C32]" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2">
                                <Link to={`/detail/${item.id}`}>
                                    <p>{item.name}</p>
                                </Link>
                                <span className="text-gray-400">
                                    ${item.price} <del className="text-gray-500 ml-3">$50</del>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mr-24">
                    <div className="relative right-0 ml-80">
                        <p className="font-baloo text-[#505F4E] text-2xl ml-20">
                            Kategorien
                        </p>
                        <div className="ml-2">
                            <div className="flex mt-6 ml-20">
                                <input type="checkbox" />
                                <p className="ml-2">Eckige Töpfe</p>
                            </div>
                            <div className="flex mt-4 ml-20">
                                <input type="checkbox" />
                                <p className="ml-2">Eckige Töpfe</p>
                            </div>
                            <div className="flex mt-4 ml-20">
                                <input type="checkbox" />
                                <p className="ml-2">Eckige Töpfe</p>
                            </div>
                            <div className="flex mt-4 ml-20">
                                <input type="checkbox" />
                                <p className="ml-2">Eckige Töpfe</p>
                            </div>
                        </div>
                        <div className="relative left-1/4 bottom-3/4 mt-4">
                            <div className="relative">
                                <img src={sp8} alt="" className="" />
                                <div className="absolute inset-0 flex flex-col items-center w-52 justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300">
                                    <p className="text-white font-bold absolute top-2 left-2">
                                        Grow your own <br /> favourite plant
                                    </p>
                                    <span className="text-white absolute bottom-2 left-2">
                                        Shop Now
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative ml-[53%] w-56">
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
                                    className="absolute w-full h-1 bg-gray-300 rounded-lg "
                                />
                            </div>
                            <div className="flex justify-between mt-8 w-full">
                                <div className="text-gray-400 ">
                                    From ${minPrice} to ${maxPrice}
                                </div>
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
                                    className="absolute w-full h-1 bg-gray-300 rounded-lg "
                                />
                            </div>
                            <div className="flex justify-between mt-8 w-full">
                                <div className="text-gray-400 ">
                                    {minSize}mm to {maxSize}mm
                                </div>
                                <button className="text-gray-500 ml-4">Filter</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;
