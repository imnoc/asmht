
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import imft from '../image/icons_payment 1.png';

const Footer = () => {
  return (
    <>
      <div className="bg-gradient-to-br from-[#fff] to-[#DCEED9] pb-20 pt-10">
        <div className="max-w-[1200px] mx-auto px-4">
          <h1 className="text-3xl font-bold font-baloo text-[#505F4E] text-center md:text-left">
            Đăng ký ngay * <br />_ Bản tin người dùng
          </h1>
          <div className="mt-4 flex flex-col md:flex-row items-center">
            <p className="text-[#555555] text-center md:text-left md:ml-10">
              Nhận cập nhật hàng tuần về chúng tôi
              sản phẩm trên <br /> email của bạn, không có thư rác
              đảm bảo  <br />chúng tôi hứa<span role="img" aria-label="peace">✌️</span>
            </p>
            <div className="mt-4 flex justify-center md:justify-start md:ml-auto">
              <div className="relative flex items-center w-full md:w-auto">
                <span className="absolute left-3 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.94 3.06a8.002 8.002 0 0112.12 0 7.978 7.978 0 011.756 6.182l-.066.192A5.992 5.992 0 0110 18H6.888A7.978 7.978 0 015 12.244a8.035 8.035 0 01-2.06-9.182zM14.612 9.95l-.188-.05a1.5 1.5 0 10-1.287 2.787l.188.05a1.5 1.5 0 101.287-2.787zM10.5 4a1 1 0 100 2 1 1 0 000-2zm-2 4a1 1 0 100 2 1 1 0 000-2zm2.5 4a1 1 0 110 2 1 1 0 010-2zm-3.5 2a1 1 0 100 2 1 1 0 000-2zm5-4a1 1 0 100 2 1 1 0 000-2zm-2.5 2a1 1 0 110 2 1 1 0 010-2zm-3 2a1 1 0 100 2 1 1 0 000-2zm5.5 1a1 1 0 110 2 1 1 0 010-2zM8.5 12a1 1 0 100 2 1 1 0 000-2z" />
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="youremail123@gmail.com"
                  className="w-full md:w-96 pr-20 py-3 pl-10  border rounded-md focus:outline-none focus:ring-2"
                />
                <button className='bg-[#656C66] absolute px-4 right-0 mt-10 py-2 rounded-md'>
                  Đăng ký
                </button>
              </div>
            </div>
          </div>


        </div>
      </div>
      <footer className='bg-[#053D29] p-4 py-10'>
        <div className='max-w-[1200px] mx-auto flex flex-col md:flex-row gap-20'>
          <div className='flex-1 mb-6 md:mb-0'>
            <p className='text-white'>
              Khách hàng rất quan trọng, khách hàng sẽ được tuân theo
              nhưng điều tương tự cũng xảy ra cùng lúc với lao động và
              với một số nỗi đau lớn

            </p>
            <div className="flex items-center space-x-4 mt-6">
              <a href="#" className="text-white hover:text-gray-900">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-gray-900">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-gray-900">
                <FaYoutube className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-gray-900">
                <FaTwitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className='flex-1 text-white'>
            <h4 className='font-semibold'>Xung quanh</h4>
            <ul className='mt-3'>
              <li className='mt-3'>Liên hệ chúng tôi</li>
              <li className='mt-3'>Về chúng tôi </li>
              <li className='mt-3'>Sự nghiệp</li>
              <li className='mt-3'>Thông tin công ty</li>
            </ul>
          </div>
          <div className='flex-1 text-white'>
            <h4 className='font-semibold'>
              Giúp đỡ</h4>
            <ul className='mt-3'>
              <li className='mt-3'>Nhà sản xuất của chúng tôi </li>
              <li className='mt-3'>Sự chi trả</li>
              <li className='mt-3'>Lô hàng</li>
              <li className='mt-3'>Hủy & Trả hàng</li>
              <li className='mt-3'> Báo cáo một sự vi phạm</li>
            </ul>
          </div>
          <div className='flex-1 text-white'>
            <h4 className='font-semibold'>Chính trị</h4>
            <ul className='mt-3'>
              <li className='mt-3'>Đảm bảo hoàn trả</li>
              <li className='mt-3'>Điều khoản sử dụng</li>
              <li className='mt-3'>Bảo vệ</li>
              <li className='mt-3'>Sự riêng tư</li>
              <li className='mt-3'>Thư mục trang</li>
            </ul>
          </div>
        </div>
      </footer>
      <div className='bg-[#062F21] p-4 flex flex-col md:flex-row justify-between items-center'>
        <p className='text-white mb-4 md:mb-0'>2023 hood.de, Inc.</p>
        <img src={imft} alt="Payment Methods" className='mb-4 md:mb-0' />
        <p className='text-white cursor-pointer'>Scroll to top</p>
      </div>
    </>
  );
}

export default Footer;
