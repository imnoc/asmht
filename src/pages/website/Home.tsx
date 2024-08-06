import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import anh6 from '../../image/AdobeStock_204287225_Preview 1.png';
import anh10 from '../../image/bfdsA 1.png';
import anh9 from '../../image/ffgdsa 1.png';
import anh1 from '../../image/fwfqq 1.png';
import anh8 from '../../image/gggrrr 1.png';
import anh7 from '../../image/gtgre 1.png';
import { Category, Product } from '../../interfaces/product';

const slides = [
  {
    text: 'Chúng tôi chăm sóc khu vườn và ngôi nhà xinh đẹp của bạn',
    description: "Lorem Ipsum chỉ đơn giản là văn bản giả của ngành in ấn và sắp chữ. Lorem Ipsum đã trở thành văn bản giả tiêu chuẩn của ngành kể từ những năm 1500.",
    image: anh1,
  },
  {
    text: 'Chăm sóc sân vườn và bảo trì nhà chuyên nghiệp',
    description: 'Chúng tôi cung cấp các dịch vụ toàn diện để chăm sóc và bảo trì khu vườn và ngôi nhà của bạn. Hãy tin tưởng chúng tôi về chất lượng và độ tin cậy.',
    image: anh1,
  }
];

type Props = {
  products: Product[],
  categories: Category[],
}

const Home = ({ products, categories }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentProductSlide, setCurrentProductSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const handleProductPrev = () => {
    setCurrentProductSlide((prevSlide) => (prevSlide === 0 ? products.length - 1 : prevSlide - 1));
  };

  const handleProductNext = () => {
    setCurrentProductSlide((prevSlide) => (prevSlide === products.length - 1 ? 0 : prevSlide + 1));
  };

  const { text, description, image } = slides[currentSlide];
  const productsToShow = products.slice(currentProductSlide, currentProductSlide + 4);

  return (
    <div>
      <div className="bg-gradient-to-r from-[#B6DDB0] to-[#E6EDDE] relative">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center p-8">
          <div className="lg:w-1/2 lg:pr-8 py-16 grid grid-cols-1 gap-8 relative">
            <div className="relative">
              <p className="font-baloo text-[#505F4E] text-2xl md:text-4xl">{text}</p>
              <FiChevronLeft size={30} color="#000" className='absolute top-1/2 -left-10 transform -translate-y-1/2 cursor-pointer' onClick={handlePrev} />
              <p className="text-[#665345] mt-4">{description}</p>
              <button className="text-[#505F4E] border-solid border-[#505F4E] border-2 mt-5 p-2">Đọc thêm</button>
            </div>
          </div>
          <img src={image} className="w-full lg:w-1/2 object-cover mt-8 lg:mt-0 lg:absolute lg:right-0 lg:bottom-0 lg:w-3/5" />
        </div>
        <FiChevronRight size={30} color="#000" className='absolute bottom-1/2 right-4 transform -translate-y-1/2 cursor-pointer' onClick={handleNext} />
      </div>

      <div className="p-2 bg-[#F8F4F0]">
        <p className='font-baloo text-2xl mt-4 text-[#505F4E] ml-20 font-bold'>Sản phẩm bán chạy</p>
      </div>
      <div className='relative mx-4 lg:mx-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {productsToShow.map(product => (
            <div key={product.id} className="p-4">
              <img src={product.thumbnail} alt={product.name} className='w-full h-auto object-cover' />
              <p className='text-[#665345] mt-4'>{product.name}</p>
              <div className='flex flex-col md:flex-row md:justify-between mt-4'>
                <span className='text-sm text-[#665345]'>{product.category}</span>
                <span className='text-sm text-[#665345] md:ml-4'>$ {product.price}</span>
              </div>
            </div>
          ))}
        </div>
        <FiChevronLeft size={30} color="#000" className='absolute top-[50%] left-0 transform -translate-y-1/2 cursor-pointer' onClick={handleProductPrev} />
        <FiChevronRight size={30} color="#000" className='absolute top-[50%] right-0 transform -translate-y-1/2 cursor-pointer' onClick={handleProductNext} />
      </div>

      <div className='bg-[#F5F5F5] flex flex-wrap space-x-5 justify-center py-20'>
        <div className="relative inline-block group w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
          <img src={anh6} alt="Garten Spaten" className="block w-full h-[100%]" />
          <p className="opacity-0 transition-opacity duration-300 absolute top-2 w-full py-4 bg-white bg-opacity-50 text-black p-1 group-hover:opacity-100">
            Danh mục 1
          </p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
          <div className="relative group">
            <img src={anh7} alt="Sand" className="block w-full h-auto" />
            <p className="opacity-0 transition-opacity duration-300 absolute top-2 w-full py-4 bg-white bg-opacity-50 text-black p-1 group-hover:opacity-100">
              Danh mục 2
            </p>
          </div>
          <div className="relative mt-3 group">
            <img src={anh8} alt="Schlammkuchen" className="block w-full h-auto" />
            <p className="opacity-0 transition-opacity duration-300 absolute top-2 w-full py-4 bg-white bg-opacity-50 text-black p-1 group-hover:opacity-100">
              Danh mục 3
            </p>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
          <div className="relative group">
            <img src={anh9} alt="Pflanzer" className="block w-full h-auto" />
            <p className="opacity-0 transition-opacity duration-300 absolute top-2 w-full py-4 bg-white bg-opacity-50 text-black p-1 group-hover:opacity-100">
              Danh mục 4
            </p>
          </div>
          <div className="relative mt-3 group">
            <img src={anh10} alt="Klemmen" className="block w-full h-auto" />
            <p className="opacity-0 transition-opacity duration-300 absolute top-2 w-full py-4 bg-white bg-opacity-50 text-black p-1 group-hover:opacity-100">
              Danh mục 5
            </p>
          </div>
        </div>
      </div>

      <p className='font-baloo text-2xl text-[#505F4E] bg-[#F5F5F5] pl-20 font-bold'>Danh mục</p>
      <hr className='bg-[#F5F5F5] w-full mx-auto hidden md:block' />
      <div className='bg-[#F5F5F5] pt-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4'>
          {categories?.map((category: Category) => (
            <div key={category.id} className="relative bg-[#F5F5F5]">
              <img src={category.thumbnail} alt={category.name} className="block w-full h-auto bg-[#F5F5F5] object-cover" />
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-[#000] bg-opacity-50 text-center text-white p-4">
                <p className="text-lg font-bold">{category.name}</p>
                <span className="text-sm">{category.quantity} items</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Home;
