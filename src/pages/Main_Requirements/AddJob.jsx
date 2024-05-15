import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";

const AddJob = () => {
    const [postingdate, setPostingDate] = useState(new Date());
    const [deadLine, setDeadline] = useState(new Date());
    const { user } = useAuth();
    console.log(user)

    const handleAddJob = async (e) => {
        e.preventDefault()
        const from = e.target;
        const jobTitle = from.jobTitle.value;
        const email = from.email.value;
        const pictureURL = from.pictureURL.value
        const category = from.category.value;
        const min_price = from.min_price.value;
        const max_price = from.max_price.value;
        const description = from.description.value;
        const applicantsNumber = parseInt(from.applicantsNumber.value);
        const postingDate = postingdate;
        const deadline = deadLine;

        const addJob = {
            jobTitle, pictureURL, category, description, postingDate, deadline, applicantsNumber,
            user: {
                email,
                name: user?.displayName,
            },
            salaryRange: { min_price, max_price }
        }
        console.log(addJob);

        try {
            const { data } = await axios.post('https://job-seeking-flax.vercel.app/jobs', addJob)
            if (data.acknowledged) {
                Swal.fire({
                    title: "Success",
                    text: "Your file has added successfuly",
                    icon: "success",
                });
                from.reset()
            }
        }
        catch (err) {
            console.log(err?.message);
            toast.error(err?.message);
        }
    }
    return (
        <div className='flex justify-center items-center min-h-[calc(100vh-306px)] my-12'>
             <Helmet>
                <title>Post A Job | CareerPath</title>
            </Helmet>
            <section className='p-2 md:p-6 mx-auto bg-white rounded-md shadow-md border w-full md:w-[70%]'>
                <div className="flex flex-col justify-center items-center space-y-2">
                    <h2 className='text-2xl font-semibold capitalize '>
                        Post a Job
                    </h2>
                    <p className="text-center text-lg w-[85%]">
                        Review and manage your active job postings. Easily access details, edit descriptions, and track applications.
                    </p>
                </div>


                <form onSubmit={handleAddJob}>
                    <div className='grid grid-cols-1 gap-6 mt-10 sm:grid-cols-2'>

                        <div>
                            <label className='text-black text-xl font-medium' htmlFor='emailAddress'>
                                Name
                            </label>
                            <input
                                required
                                id='emailAddress'
                                type='text'
                                name='name'
                                defaultValue={user?.displayName}
                                disabled
                                className='block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>

                        <div>
                            <label className='text-black text-xl font-medium' htmlFor='emailAddress'>
                                Email Address
                            </label>
                            <input
                                required
                                id='emailAddress'
                                type='email'
                                name='email'
                                defaultValue={user?.email}
                                disabled
                                className='block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>

                        <div>
                            <label className='text-black text-xl font-medium' htmlFor='job_title'>
                                Job Title
                            </label>
                            <input
                                required
                                id='jobTitle'
                                name='jobTitle'
                                type='text'
                                className='block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>

                        <div className='flex flex-col gap-2 '>
                            <label className='text-black text-xl font-medium' htmlFor='category'>
                                Job Category
                            </label>
                            <select
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
                            <label className='text-xl'>Posting Date</label>
                            <DatePicker className="border p-2 w-full rounded-md" selected={postingdate} onChange={(date) => setPostingDate(date)} />
                        </div>

                        <div className='flex flex-col gap-2 '>
                            <label className='text-xl'>Deadline</label>
                            <DatePicker className="border p-2 w-full rounded-md" selected={deadLine} onChange={(date) => setDeadline(date)} />
                        </div>

                        <div className="md:col-span-2 ">
                            <label className='text-xl' htmlFor='min_price'>
                                Salary range
                            </label>
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="w-full">
                                    <input
                                        required
                                        placeholder=" Minimum Price"
                                        id='min_price'
                                        name='min_price'
                                        type='number'
                                        className='block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                    />
                                </div>

                                <div className="w-full">
                                    <input
                                        required
                                        placeholder="Maximum Price"
                                        id='max_price'
                                        name='max_price'
                                        type='number'
                                        className='block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className='text-xl font-medium' htmlFor='pictureURL'>
                                Picture URL of the Job
                            </label>
                            <input
                                required
                                id='pictureURL'
                                name='pictureURL'
                                type='text'
                                className='block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>
                        <div className="mt-4">
                            <label className='text-xl font-medium' htmlFor='applicantsNumber'>
                                Job Applicants Number
                            </label>
                            <input
                                required
                                value={0}
                                id='applicantsNumber'
                                name='applicantsNumber'
                                type='number'
                                className='block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 mt-4'>
                        <label className='text-black text-xl font-medium' htmlFor='description'>
                            Job Description
                        </label>
                        <textarea
                            className='block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
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
            </section>
        </div>
    )
};

export default AddJob;