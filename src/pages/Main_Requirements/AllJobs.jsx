import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { Helmet } from "react-helmet";

const AllJobs = () => {
    const [count, setCount] = useState('')
    // const [jobs, setJobs] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState('');
    const [searchText, setSearchText] = useState('');
    const queryClient = useQueryClient();

    const getData = async () => {
        const { data } = await axios(`https://job-seeking-flax.vercel.app/all-jobs?page=${currentPage}&size=${itemsPerPage}&search=${search}`)
        return data;
    }

    const { data: jobs = [], isLoading } = useQuery({
        queryFn: () => getData(),
        queryKey: ['jobs']
    })

    useEffect(() => {
        const getCount = async () => {
            const { data } = await axios(`https://job-seeking-flax.vercel.app/jobs-total?search=${search}`)
            setCount(data.count)
        }
        getCount()
    }, [search])

    const pages = [...Array(Math.ceil(count / itemsPerPage)).keys()].map(e => e + 1)
    // handle pagination button
    const handlePaginationButton = (value) => {
        setCurrentPage(value)
    }
    // search
    const handleSearch = e => {
        e.preventDefault()
        const text = e.target.search.value;
        setSearch(text);
    }

    if (isLoading) {
        return <Loader></Loader>
    }
    
    queryClient.invalidateQueries({ queryKey: ['jobs'] },)

    return (
        <div className='container py-10 mx-auto flex flex-col justify-between'>
            <Helmet>
                <title>All Jobs | CareerPath</title>
            </Helmet>
            <div className="flex flex-col justify-center items-center space-y-2">
                <h2 className='text-3xl font-semibold capitalize text-center'>
                    Find Your Dream Job - Explore Open Positions
                </h2>
                <p className="text-center md:w-[80%]">
                    Discover a wide range of exciting career opportunities across various industries. Search by job title, category, or location to find the perfect fit for your skills and experience. Apply directly from our platform and take the next step in your career journey.
                </p>
            </div>
            <div>
                <div className='flex flex-col md:flex-row justify-center items-center gap-5 mt-5'>

                    <form onSubmit={handleSearch}>
                        <div className='flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
                            <input
                                onChange={(e) => setSearchText(e.target.value)}
                                value={searchText}
                                className='px-4 md:px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                                type='text'
                                name='search'
                                placeholder='Enter Job Title'
                                aria-label='Enter Job Title'
                            />

                            <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 transition-colors duration-300 transform bg-[#2557a7] rounded-md hover:bg-[#0d2d5e] focus:bg-gray-600 focus:outline-none'>
                                Find jobs
                            </button>
                        </div>
                    </form>

                </div>
                <section className='py-7'>

                    <div className='flex flex-col'>
                        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                            <div className='inline-block min-w-full py-2 align-middle'>
                                <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
                                    <table className='min-w-full divide-y divide-gray-200'>
                                        <thead className='bg-gray-200'>
                                            <tr className="text-black ">
                                                <th scope='col' className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right'>
                                                    <div className='flex items-center gap-x-3'>
                                                        <span>Job Title</span>
                                                    </div>
                                                </th>

                                                <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right'>
                                                    <span>Posting Date</span>
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right'
                                                >
                                                    <span>Application Deadline</span>
                                                </th>

                                                <th
                                                    scope='col'
                                                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right'
                                                >
                                                    <button className='flex items-center gap-x-2'>
                                                        <span>Salary range  Per/Year</span>
                                                    </button>
                                                </th>

                                                <th
                                                    scope='col'
                                                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right'
                                                >
                                                    Details Button
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
                                                        {new Date(job.postingDate).toLocaleDateString()}
                                                    </td>

                                                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                        {new Date(job.deadline).toLocaleDateString()}
                                                    </td>
                                                    <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                        <div className='flex items-center gap-x-2'>
                                                            {`$${job.salaryRange.min_price}-$${job.salaryRange.max_price}`}
                                                        </div>
                                                    </td>
                                                    <td className='px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap'>
                                                        <div className='inline-flex items-center px-4 py-1.5 rounded-full gap-x-2 bg-blue-500/20 text-[#0d2d5e]'>
                                                            <Link to={`/job/${job._id}`}>
                                                                <h2 className='text-sm font-normal'>View Details</h2>
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
                </section>
            </div>

            <div className='flex justify-center mt-12'>
                <button onClick={() => handlePaginationButton(currentPage - 1)}
                    disabled={currentPage === 1}
                    className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-[#0d2d5e]  hover:text-white'>
                    <div className='flex items-center -mx-1'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 mx-1 rtl:-scale-x-100'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M7 16l-4-4m0 0l4-4m-4 4h18'
                            />
                        </svg>

                        <span className='mx-1'>previous</span>
                    </div>
                </button>

                {pages.map(btnNum => (
                    <button
                        onClick={() => handlePaginationButton(btnNum)}
                        key={btnNum}
                        className={`${currentPage === btnNum ? 'bg-[#2557a7] text-white' : ''} hidden px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-[#0d2d5e]  hover:text-white`}
                    >
                        {btnNum}
                    </button>
                ))}
                <select onChange={(e) => setItemsPerPage(e.target.value)} className="border border-[#0d2d5e] rounded-md" value={itemsPerPage}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>
                <button
                    onClick={() => handlePaginationButton(currentPage + 1)}
                    disabled={currentPage === Math.ceil(count / itemsPerPage)}
                    className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-[#0d2d5e] disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'>
                    <div className='flex items-center -mx-1'>
                        <span className='mx-1'>Next</span>

                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 mx-1 rtl:-scale-x-100'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M17 8l4 4m0 0l-4 4m4-4H3'
                            />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default AllJobs