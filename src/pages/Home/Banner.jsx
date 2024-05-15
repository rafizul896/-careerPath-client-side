// Import Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

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
                        className='w-full bg-center bg-cover h-[35rem]'
                        style={{
                            backgroundImage: `url(${'https://i.imghippo.com/files/2tWOH1715667734.png'})`,
                        }}
                    >
                        <div className='flex items-center justify-center w-full h-full bg-gray-900/50'>
                            <div className='text-center space-y-3'>
                                <h1 className='text-2xl md:text-3xl font-bold md:font-semibold text-white lg:text-4xl'>
                                    Find Your Dream Job Today!
                                </h1>
                                <p className='text-white w-[89%] mx-auto'>We connect you with top employers across all industries. Search millions of jobs and land your perfect fit!</p>
                                <br />
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className='w-full bg-center bg-cover h-[35rem]'
                        style={{
                            backgroundImage: `url(${'https://i.imghippo.com/files/0putE1715667270.jpg'})`,
                        }}
                    >
                        <div className='flex items-center justify-center w-full h-full bg-gray-900/50'>
                            <div className='text-center space-y-3'>
                                <h1 className='text-2xl md:text-3xl font-bold md:font-semibold text-white lg:text-4xl'>
                                    Launch Your Career Now!
                                </h1>
                                <p className='text-white w-[89%] mx-auto'>
                                    Fresh out of school? Dont wait!  Get started on your dream career with our resources designed specifically for recent graduates. Find entry-level positions, build your network, and land your first job.
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className='w-full bg-center bg-cover h-[35rem]'
                        style={{
                            backgroundImage: `url(${'https://i.imghippo.com/files/aUkGt1715667342.jpg'})`,
                        }}
                    >
                        <div className='flex items-center justify-center w-full h-full bg-gray-900/50'>
                            <div className='text-center space-y-3'>
                                <h1 className='text-2xl md:text-3xl font-bold md:font-semibold text-white lg:text-4xl'>
                                    Ready to take the next step?
                                </h1>
                                <p className='text-white w-[89%] mx-auto'>
                                    Let us help you find the perfect job that matches your skills and aspirations. Start your search today!
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default Banner;