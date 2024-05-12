import { Fragment, useState } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Modal from "../../components/Modal";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";

const MyPostedJobs = () => {

    const [showModal, setShowModal] = useState(false);
    const { user } = useAuth();
    const [job, setJob] = useState({})
    const { jobTitle, pictureURL, category, description, salaryRange, applicantsNumber } = job;
    const [postingdate, setPostingDate] = useState(job.deadline);
    const [deadLine, setDeadline] = useState(job.postingDate);

    const getData = async () => {
        const { data } = await axios(`http://localhost:5000/job/${user?.email}`,{withCredentials: true})
        return data;
    }

    const { data: jobs = [],isLoading, refetch } = useQuery({
        queryFn: () => getData(),
        queryKey: ['myJobs'],
    })
    if (isLoading) {
        return <Loader></Loader>
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await axios.delete(`http://localhost:5000/job/${id}`)
                    console.log(data)
                    if (data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                        });
                        refetch()
                    }
                }
                catch (err) {
                    console.log(err)
                    toast.error(err?.message)
                }
            }
        })
    }
    const handleUpdateJob = async (e) => {
        e.preventDefault()
        const from = e.target;
        const jobTitle = from.jobTitle.value;
        const pictureURL = from.pictureURL.value
        const category = from.category.value;
        const min_price = from.min_price.value;
        const max_price = from.max_price.value;
        const description = from.description.value;
        const applicantsNumber = parseInt(from.applicantsNumber.value);
        const postingDate = new Date(postingdate).toLocaleDateString();
        const deadline = new Date(deadLine).toLocaleDateString();

        const updateJob = {
            jobTitle, pictureURL, category, description, postingDate, deadline, applicantsNumber,
            salaryRange: { min_price, max_price }
        }
        console.log(updateJob);

        try {
            const { data } = await axios.patch(`http://localhost:5000/jobs/${job._id}`, updateJob);
            console.log(data);
            if (data?.modifiedCount > 0) {
                Swal.fire({
                    title: "Success",
                    text: "Your file has updated successfuly",
                    icon: "success",
                });
                refetch()
                setShowModal(!showModal)
            }
        }
        catch (err) {
            console.log(err);
            toast.error(err?.message)
        }
    }
    return (
        <Fragment>
            <section className='container px-4 mx-auto pt-12'>
                <div className='flex items-center gap-x-3'>
                    <h2 className='text-lg font-medium text-gray-800 '>My Posted Jobs</h2>

                    <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
                        {jobs.length} Job
                    </span>
                </div>

                <div className='flex flex-col mt-6'>
                    <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                        <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                            <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
                                <table className='min-w-full divide-y divide-gray-200'>
                                    <thead className='bg-gray-50'>
                                        <tr>
                                            <th
                                                scope='col'
                                                className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                                            >
                                                <div className='flex items-center gap-x-3'>
                                                    <span>Title</span>
                                                </div>
                                            </th>

                                            <th
                                                scope='col'
                                                className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                            >
                                                <span>Deadline</span>
                                            </th>

                                            <th
                                                scope='col'
                                                className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                            >
                                                <button className='flex items-center gap-x-2'>
                                                    <span>Price Range</span>
                                                </button>
                                            </th>

                                            <th
                                                scope='col'
                                                className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                            >
                                                Category
                                            </th>

                                            <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                                Edit
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-white divide-y divide-gray-200 '>
                                        {
                                            jobs.map(job => <tr key={job._id}>
                                                <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                    {job.jobTitle}
                                                </td>

                                                <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                    {job.deadline}
                                                </td>

                                                <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                    {`${job.salaryRange.min_price} - ${job.salaryRange.max_price}`}
                                                </td>
                                                <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                    <div className='flex items-center gap-x-2'>
                                                        <p
                                                            className={`px-3 py-1 
                                                        ${job.category === 'Web Development' && 'text-blue-500 bg-blue-100/60'}
                                                        ${job.category === 'Graphics Design' && 'text-emerald-500 bg-emerald-100/60'}
                                                        ${job.category === 'Digital Marketing' && 'text-pink-500 bg-pink-100/60'}
                                                         rounded-full text-xs`}
                                                        >
                                                            {job.category}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                    <div className='flex items-center gap-x-6'>
                                                        <button onClick={() => handleDelete(job._id)} className='text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none'>
                                                            <svg
                                                                xmlns='http://www.w3.org/2000/svg'
                                                                fill='none'
                                                                viewBox='0 0 24 24'
                                                                strokeWidth='1.5'
                                                                stroke='currentColor'
                                                                className='w-5 h-5'
                                                            >
                                                                <path
                                                                    strokeLinecap='round'
                                                                    strokeLinejoin='round'
                                                                    d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                                                                />
                                                            </svg>
                                                        </button>

                                                        <Link onClick={() => { setShowModal(!showModal), setJob(job) }} className='text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none'>
                                                            <svg
                                                                xmlns='http://www.w3.org/2000/svg'
                                                                fill='none'
                                                                viewBox='0 0 24 24'
                                                                strokeWidth='1.5'
                                                                stroke='currentColor'
                                                                className='w-5 h-5'
                                                            >
                                                                <path
                                                                    strokeLinecap='round'
                                                                    strokeLinejoin='round'
                                                                    d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                                                                />
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal isVisible={showModal} showModal={showModal} setShowModal={setShowModal}>
                    <form onSubmit={handleUpdateJob} className="overflow-y-auto h-[80vh] md:h-[80vh] py-5 md:py-0 ">
                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>

                            <div>
                                <label className='text-gray-700 ' htmlFor='job_title'>
                                    Job Title
                                </label>
                                <input
                                    defaultValue={jobTitle}
                                    id='jobTitle'
                                    name='jobTitle'
                                    type='text'
                                    className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                />
                            </div>

                            <div className='flex flex-col gap-2 '>
                                <label className='text-gray-700 ' htmlFor='category'>
                                    Job Category
                                </label>
                                <select
                                    defaultValue={category}
                                    name='category'
                                    id='category'
                                    className='border p-2 rounded-md'
                                >
                                    <option value=''>All Jobs</option>
                                    <option value='On Site'>On Site</option>
                                    <option value='Remote'>Remote</option>
                                    <option value='Part-Time'>Part-Time</option>
                                    <option value='Hybrid'>Hybrid</option>
                                </select>
                            </div>

                            <div className='flex flex-col gap-2 '>
                                <label className='text-gray-700'>Posting Date</label>
                                <DatePicker className="border p-2 w-full rounded-md" selected={postingdate} onChange={(date) => setPostingDate(date)} />
                            </div>

                            <div className='flex flex-col gap-2 '>
                                <label className='text-gray-700'>Deadline</label>
                                <DatePicker className="border p-2 w-full rounded-md" selected={deadLine} onChange={(date) => setDeadline(date)} />
                            </div>

                            <div className="md:col-span-2 ">
                                <label className='text-gray-700 text-xl' htmlFor='min_price'>
                                    Salary range
                                </label>
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="w-full">
                                        <input
                                            defaultValue={salaryRange?.min_price}
                                            placeholder=" Minimum Price"
                                            id='min_price'
                                            name='min_price'
                                            type='number'
                                            className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                        />
                                    </div>

                                    <div className="w-full">
                                        <input
                                            defaultValue={salaryRange?.max_price}
                                            placeholder="Maximum Price"
                                            id='max_price'
                                            name='max_price'
                                            type='number'
                                            className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className='text-gray-700' htmlFor='pictureURL'>
                                    Picture URL of the Job Banner
                                </label>
                                <input
                                    defaultValue={pictureURL}
                                    id='pictureURL'
                                    name='pictureURL'
                                    type='text'
                                    className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                />
                            </div>
                            <div className="mt-4">
                                <label className='text-gray-700' htmlFor='applicantsNumber'>
                                    Job Applicants Number
                                </label>
                                <input
                                    value={applicantsNumber}
                                    id='applicantsNumber'
                                    name='applicantsNumber'
                                    type='number'
                                    className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                />
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 mt-4'>
                            <label className='text-gray-700 ' htmlFor='description'>
                                Job Description
                            </label>
                            <textarea
                                defaultValue={description}
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                name='description'
                                id='description'
                            ></textarea>
                        </div>
                        <div className='flex justify-end mt-6'>
                            <button className='px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
                                Save
                            </button>
                        </div>
                    </form>
                </Modal>
            </section>
        </Fragment>
    )
}

export default MyPostedJobs