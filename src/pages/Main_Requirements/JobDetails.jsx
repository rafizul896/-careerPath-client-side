import { Link, useLoaderData, useNavigate } from "react-router-dom"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { Fragment, useState } from "react";
import { MdOutlineWatchLater } from "react-icons/md";
import { BiSolidShoppingBag } from "react-icons/bi";
import Modal from "../../components/Modal";

const JobDetails = () => {
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate()
    const [startDate, setStartDate] = useState(new Date());
    const job = useLoaderData();
    console.log(job)
    const { user } = useAuth();
    const { _id, jobTitle, category, postingDate, deadline, description, salaryRange, pictureURL } = job;

    // const handleFromSubmission = async (e) => {
    //     e.preventDefault();
    //     if (user?.email === job.user?.email) {
    //         return toast.error('Action not permitted!')
    //     }
    //     const from = e.target;
    //     const job_id = _id;
    //     const price = parseFloat(from.price.value);
    //     if (price < parseFloat(min_price)) {
    //         return toast.error('Offer more or at least equal to Minimun Price.')
    //     }
    //     const email = from.email.value;
    //     const comment = from.comment.value;
    //     const status = 'Pending';
    //     const deadline = startDate;

    //     const bidData = {
    //         jobTitle, category, job_id, price, email, comment, buyer_email: job.user?.email, status, deadline
    //     }
    //     console.table(bidData);

    //     try {
    //         const { data } = await axios.post('http://localhost:5000/bid', bidData);
    //         console.log(data);
    //         if (data.acknowledged) {
    //             toast.success('Bid Placed Successfully')
    //             navigate('/my-bids')
    //         }
    //     }
    //     catch (err) {
    //         console.log(err?.message)
    //         toast.error(err?.message)
    //         from.reset()
    //     }

    // }

    return (
        <Fragment>
            <div className='flex my-5 flex-col lg:flex-row justify-around gap-5  items-center min-h-[calc(100vh-306px)] md:w-[90%] mx-auto '>
                <div className="flex-1">
                    <img src={pictureURL} alt="" />
                </div>
                {/* Job Details */}
                <div className='flex-1 px-4 py-5 rounded-md shadow-md md:min-h-[350px]'>
                    <div className=''>
                        {/* <span className='text-sm font-light'>
                        Deadline: {new Date(deadline).toLocaleDateString()}
                    </span>
                    <span className='px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full '>
                        {category}
                    </span> */}

                        <h1 className='mt-2 text-2xl md:text-3xl font-semibold'>
                            {jobTitle}
                        </h1>

                        <div className='flex items-center gap-5'>
                            <p className='mt-2 text-sm  text-gray-600 '>{job.user?.name}</p>
                        </div>

                        <div className="flex gap-5">
                            <div className='mt-2 text-sm text-gray-600 flex items-center gap-1'>
                                <span className='text-lg'><MdOutlineWatchLater /></span> {postingDate}
                            </div>
                            <div className='mt-2 text-sm text-gray-600 flex items-center gap-1'>
                                <span className='text-lg'><BiSolidShoppingBag /></span> {category}
                            </div>
                        </div>

                        <div className='mt-3 border-t pt-2 '>
                            <span className="text-lg md:text-xl font-semibold">
                                Job Description / Responsibility
                            </span>
                            <p className="text-justify">
                                {description}
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-5 md:gap-0 items-center justify-between mt-6">
                            <p className='text-lg font-bold text-gray-600 '>
                                Range: {salaryRange}
                            </p>
                            <Link>
                                <button onClick={() => setShowModal(!showModal)} className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Apply now</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Modal isVisible={showModal} showModal={showModal} setShowModal={setShowModal}>
                    <div>
                        <form>
                            <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>

                                <div>
                                    <label className='text-gray-700 ' htmlFor='emailAddress'>
                                        Name
                                    </label>
                                    <input
                                        id='emailAddress'
                                        type='text'
                                        name='name'
                                        defaultValue={user?.displayName}
                                        disabled
                                        className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                    />
                                </div>

                                <div>
                                    <label className='text-gray-700 ' htmlFor='emailAddress'>
                                        Email Address
                                    </label>
                                    <input
                                        id='emailAddress'
                                        type='email'
                                        name='email'
                                        defaultValue={user?.email}
                                        disabled
                                        className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                    />
                                </div>

                                <div>
                                    <label className='text-gray-700 ' htmlFor='job_title'>
                                        Job Title
                                    </label>
                                    <input
                                        id='jobTitle'
                                        name='jobTitle'
                                        type='text'
                                        className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                    />
                                </div>

                                <div className='flex justify-end mt-6'>
                                    <button className='px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        </Fragment>
    )
}

export default JobDetails