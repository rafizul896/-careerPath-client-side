import { Link, useLoaderData} from "react-router-dom"
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
    const job = useLoaderData();
    const { user } = useAuth();
    const today = new Date().toLocaleDateString()
    const {  _id,jobTitle, category, postingDate, deadline, description, salaryRange, pictureURL } = job;

    const handleFromSuumit = async (e) => {
        e.preventDefault();
        if (user?.email === job.user?.email) {
            return toast.error('Action not permitted!')
        }
        if(today > deadline){
            return toast.error('job deadline is over')
        }
        const from = e.target;
        const name = from.name.value
        const email = from.email.value;
        const resumeLink= from.resumeLink.value;
        const job_id = _id

        const applyedJob = {
            name,email,resumeLink,job_id
        }
        console.log(applyedJob);

        try {
            const { data } = await axios.post('http://localhost:5000/applyedJob', applyedJob);
            console.log(data);
            if (data.acknowledged) {
                toast.success('Apply Successfully')
                setShowModal(!showModal)
            }
        }
        catch (err) {
            console.log(err?.message)
            toast.error(err?.message)
            from.reset()
        }

    }

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
                        <form onSubmit={handleFromSuumit}>
                            <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>

                                <div>
                                    <label className='' htmlFor='emailAddress'>
                                        Name
                                    </label>
                                    <input
                                        id='name'
                                        type='text'
                                        name='name'
                                        defaultValue={user?.displayName}
                                        disabled
                                        className='block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                    />
                                </div>

                                <div>
                                    <label className='' htmlFor='emailAddress'>
                                        Email Address
                                    </label>
                                    <input
                                        id='emailAddress'
                                        type='email'
                                        name='email'
                                        defaultValue={user?.email}
                                        disabled
                                        className='block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className='' htmlFor='job_title'>
                                        Resume Link
                                    </label>
                                    <input
                                        placeholder="Submit your resume link"
                                        id='jobTitle'
                                        name='resumeLink'
                                        type='text'
                                        required
                                        className='block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                    />
                                </div>

                                <div className='flex justify-end md:col-span-2'>
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