// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className='py-5 mx-auto'>
            <Swiper
                spaceBetween={30}
                loop={true}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div
                        className='w-full bg-center bg-cover h-[30rem]'
                        style={{
                            backgroundImage: `url(${'https://i.imghippo.com/files/qTWyp1714545036.jpg'})`,
                        }}
                    >
                        <div className='flex items-center justify-center w-full h-full bg-gray-900/70'>
                            <div className='text-center'>
                                <h1 className='text-2xl md:text-3xl font-bold md:font-semibold text-white lg:text-4xl'>
                                    Get Your Development Projects Done in minutes
                                </h1>
                                <br />
                                <Link to='/' className='w-full px-5 py-4 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-gray-600 rounded-md lg:w-auto hover:bg-gray-500 focus:outline-none focus:bg-gray-500'>
                                    Post Job & Hire Expert
                                </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className='w-full bg-center bg-cover h-[30rem]'
                        style={{
                            backgroundImage: `url(${'https://i.imghippo.com/files/qTWyp1714545036.jpg'})`,
                        }}
                    >
                        <div className='flex items-center justify-center w-full h-full bg-gray-900/70'>
                            <div className='text-center'>
                                <h1 className='text-2xl md:text-3xl font-bold md:font-semibold text-white lg:text-4xl'>
                                    Get Your Graphics Design Projects Done in minutes
                                </h1>
                                <br />
                                <Link to='/' className='w-full px-5 py-4 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-gray-600 rounded-md lg:w-auto hover:bg-gray-500 focus:outline-none focus:bg-gray-500'>
                                    Post Job & Hire Expert
                                </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className='w-full bg-center bg-cover h-[30rem]'
                        style={{
                            backgroundImage: `url(${'https://i.imghippo.com/files/qTWyp1714545036.jpg'})`,
                        }}
                    >
                        <div className='flex items-center justify-center w-full h-full bg-gray-900/70'>
                            <div className='text-center'>
                                <h1 className='text-2xl md:text-3xl font-bold md:font-semibold text-white lg:text-4xl'>
                                    Get Your Digital Marketing Campaings up an running
                                </h1>
                                <br />
                                <Link to='/' className='w-full px-5 py-4 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-gray-600 rounded-md lg:w-auto hover:bg-gray-500 focus:outline-none focus:bg-gray-500'>
                                    Post Job & Hire Expert
                                </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default Banner;