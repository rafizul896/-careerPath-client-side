import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const FeaturedJobs = () => {
    const requests = async () => {
        const { data } = await axios(`http://localhost:5000/featuredJobs`, { withCredentials: true })
        return data;
    }

    const { data: featuredJobs = [] } = useQuery({
        queryFn: () => requests(),
        queryKey: ['featuredJobs']
    })
    console.log(featuredJobs)


    return (
        <div>
            <h1 className="text-center text-3xl font-bold pb-7">Top Jobs & High-Demand Jobs</h1>
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
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    featuredJobs.map(job =>
                        <SwiperSlide key={job._id}>
                            <div className='w-full mb-10 py-7 md:py-0 md:h-[20rem] flex gap-14 md:gap-0 flex-col-reverse md:flex-row items-center border border-red-500'>
                                <div className='flex-1 flex-col flex items-center justify-center w-full space-y-3'>
                                    <h1 className='text-2xl md:text-3xl font-bold md:font-semibold'>
                                        {job.jobTitle}
                                    </h1>
                                    <p className="w-[75%] mx-auto text-center">
                                        {job.description.slice(0, 100)}...
                                    </p>

                                    <h3 className='text-xl font-bold md:font-semibold'>
                                        {`$${job.salaryRange.min_price}-$${job.salaryRange.max_price}`}
                                    </h3>

                                    <Link to={`/job/${job._id}`} className='px-5 py-4 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-gray-600 rounded-md lg:w-auto hover:bg-gray-500 focus:outline-none focus:bg-gray-500'>
                                        Learn more
                                    </Link>

                                </div>
                                <div className="flex-1 flex justify-center">
                                    <img className="px-3 md:mx-0 md:w-[80%] max-w-[500px]" src={job.pictureURL} alt="" />
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                }


            </Swiper>
        </div>
    );
};

export default FeaturedJobs;