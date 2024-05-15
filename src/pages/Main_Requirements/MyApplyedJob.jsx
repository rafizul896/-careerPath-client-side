import axios from "axios";
import { useEffect, useState, useRef } from "react";
import useAuth from "../../hooks/useAuth";
import { useReactToPrint } from "react-to-print";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const MyApplyedJob = () => {
    const { user } = useAuth()
    const [filter, setFilter] = useState('')
    const [jobs, setJobs] = useState([]);
    const componentPDF = useRef()

    const handlePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: 'ApplyedJob',
        onAfterPrint: () => toast.success('Data Save')
    })

    // filter
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`https://job-seeking-flax.vercel.app/myApplyedJob?email=${user.email}&filter=${filter}`, { withCredentials: true })
            setJobs(data)
        }
        getData();
    }, [filter, user]);

    return (
        <div className='w-[90%] py-5 mx-auto flex flex-col justify-between'>
             <Helmet>
                <title>My Applyed Job | CareerPath</title>
            </Helmet>
            <div>
                <h1 className="text-xl font-semibold">My Applyed Jobs : </h1>
            </div>
            <div>
                <div className='flex flex-col md:flex-row justify-center items-center gap-5 '>
                    <div className="">
                        <select
                            onChange={e => { setFilter(e.target.value) }}
                            value={filter}
                            name='category'
                            id='category'
                            className='border p-3.5 rounded-lg'
                        >
                            <option value=''>All Jobs</option>
                            <option value='On Site'>On Site</option>
                            <option value='Remote'>Remote</option>
                            <option value='Part-Time'>Part-Time</option>
                            <option value='Hybrid'>Hybrid</option>
                        </select>
                    </div>
                </div>

                <section className='py-5'>
                    <div className='flex flex-col'>
                        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                            <div className='inline-block min-w-full py-2 align-middle'>
                                <div ref={componentPDF} className='overflow-hidden border border-gray-200  md:rounded-lg'>
                                    <table className='min-w-full divide-y divide-gray-200'>
                                        <thead className='bg-gray-50'>
                                            <tr>
                                                <th scope='col' className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                                    <div className='flex items-center gap-x-3'>
                                                        <span>Job Title</span>
                                                    </div>
                                                </th>

                                                <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                                    <span>Application Date</span>
                                                </th>

                                                <th
                                                    scope='col'
                                                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                                >
                                                    <button className='flex items-center gap-x-2'>
                                                        <span>Salary range per/year</span>
                                                    </button>
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
                                                        {new Date(job.applicationDate).toLocaleDateString()}
                                                    </td>

                                                    <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                        <div className='flex items-center gap-x-2'>
                                                            {`$${job.salaryRange.min_price} - $${job.salaryRange.max_price}`}
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
                    <div className="flex justify-end mt-10">
                        <button className="btn btn-primary" onClick={handlePDF}>Download summary to PDF</button>
                    </div>
                </section>
            </div>
        </div >
    )
}

export default MyApplyedJob;