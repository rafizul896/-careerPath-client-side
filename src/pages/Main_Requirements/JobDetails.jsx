import { Link, useLoaderData } from "react-router-dom"
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { Fragment, useState } from "react";
import { MdOutlineWatchLater } from "react-icons/md";
import { BiSolidShoppingBag } from "react-icons/bi";
import Modal from "../../components/Modal";
import { Helmet } from "react-helmet";

const JobDetails = () => {
    const [showModal, setShowModal] = useState(false);
    const job = useLoaderData();
    const { user } = useAuth();
    const today = new Date();
    const { _id, jobTitle, category, postingDate, deadline, description, salaryRange, pictureURL, applicantsNumber } = job;

    const handleFromSuumit = async (e) => {
        e.preventDefault();
        if (user?.email === job.user?.email) {
            return toast.error('Action not permitted!')
        }
        if (today > deadline) {
            return toast.error('job deadline is over')
        }
        const from = e.target;
        const name = from.name.value
        const email = from.email.value;
        const resumeLink = from.resumeLink.value;
        const job_id = _id;
        const applicationDate = today;

        const applyedJob = {
            name, email, resumeLink, job_id, jobTitle, category, applicationDate, salaryRange
        }
        console.log(applyedJob);

        try {
            const { data } = await axios.post('https://job-seeking-flax.vercel.app/applyedJob', applyedJob);
            if (data.acknowledged) {
                axios.patch(`https://job-seeking-flax.vercel.app/jobs/${_id}`, { applicantsNumber: applicantsNumber + 1 }, { withCredentials: true })
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
             <Helmet>
                <title>{jobTitle} | CareerPath</title>
            </Helmet>
            <div className="flex py-5 md:my-10 flex-col lg:flex-row justify-around gap-5 rounded-md items-center min-h-[calc(100vh-306px)] md:w-[90%] mx-auto bg-[url('https://i.imghippo.com/files/ixGTl1715763309.png')] text-black">
                <div className="flex-1">
                    <img src={pictureURL} alt="" />
                </div>
                {/* Job Details */}
                <div className='flex-1 px-4 py-5 rounded-md shadow md:min-h-[350px]'>
                    <div className=''>
                        <h1 className='mt-2 text-2xl md:text-3xl font-semibold'>
                            {jobTitle}
                        </h1>

                        <div className='flex items-center gap-5'>
                            <p className='mt-2 text-sm  '>{job.user?.name}</p>
                        </div>

                        <div className="flex gap-5">
                            <div className='mt-2 text-sm flex items-center gap-1'>
                                <span className='text-lg'><MdOutlineWatchLater /></span> {new Date(postingDate).toLocaleDateString()}
                            </div>
                            <div className='mt-2 text-sm flex items-center gap-1'>
                                <span className='text-lg'><BiSolidShoppingBag /></span> {category}
                            </div>
                        </div>

                        <div className='mt-3 border-t pt-2 '>
                            <span className="text-lg md:text-xl font-semibold">
                                Job Description / Responsibility
                            </span>
                            <p className="text-justify pt-2">
                                {description}
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-10 md:items-center mt-3">
                            <span className='md:text-lg font-semibold  '>
                                Deadline: {new Date(deadline).toLocaleDateString()}
                            </span>
                            <p className='md:text-lg font-semibold  '>
                                Number of Applicants: {applicantsNumber}
                            </p>

                        </div>
                        <div className="mt-3">
                            <p className='md:text-lg font-semibold  '>
                                Range: {`$${salaryRange.min_price}-$${salaryRange.max_price} per/year`}
                            </p>
                        </div>
                        <div>
                            <Link className="flex justify-end mt-3">
                                <button onClick={() => setShowModal(!showModal)} className="px-5 py-2.5 text-lg font-medium text-white bg-[#2557a7] rounded-md hover:bg-[#0d2d5e]">Apply now</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Modal isVisible={showModal} showModal={showModal} setShowModal={setShowModal}>
                    <div>
                        <form onSubmit={handleFromSuumit}>
                            <div className='grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2'>

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
                                    <button className='py-2 px-6 text-lg font-medium text-white bg-[#2557a7] rounded-md hover:bg-[#0d2d5e]'>
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