import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { AiOutlineDollarCircle } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { FcCalendar } from "react-icons/fc";
import { IoMdHeartEmpty,IoMdHeart } from "react-icons/io";
import { useState } from 'react';

const JobCard = ({ job }) => {
    const { user } = useAuth()
    const [love,setLove] = useState(false)
    const handleCheckLogin = () => {
        if (!user) {
            toast.error('You have to log in first to view details')
        }
    }

    const { _id, jobTitle, postingDate, salaryRange, deadline, applicantsNumber } = job
    return (
        <div className='w-full max-w-sm px-3 py-6 bg-white rounded-md shadow-md hover:shadow-2xl border hover:scale-[1.025] transition-all space-y-2'>
            <div className='flex justify-between items-center'>

                <h1 className='text-xl font-semibold text-gray-800 '>
                    {jobTitle}
                </h1>

                <div onClick={()=>setLove(!love)} className='text-2xl cursor-pointer'>
                    {
                        love ? 
                        <IoMdHeart/>:
                        <IoMdHeartEmpty />
                    }

                </div>
            </div>

            <div className='flex  flex-col'>
                <p className='text-gray-800 '>
                    {job?.user.name}
                </p>
                <p className='text-gray-600 flex items-center gap-1'>
                    {new Date(postingDate).toLocaleDateString()}
                </p>
            </div>

            <div className='font-medium text-gray-600 flex items-center gap-1'>
                <span className='text-lg'><AiOutlineDollarCircle /></span>
                <p className='flex items-center'>
                    {<BsCurrencyDollar />}{`${salaryRange.min_price}`} to
                    <BsCurrencyDollar />
                    {`${salaryRange.max_price}`} Annualy
                </p>
            </div>

            <div className="flex justify-between items-center">
                <span className=' text-black flex items-center gap-2'>
                    <span className='text-lg'><FcCalendar /></span>{new Date(deadline).toLocaleDateString()}
                </span>
                <p className=''>
                    Applicants Number: {applicantsNumber}
                </p>
            </div>

            <Link to={`/job/${_id}`}>
                <button onClick={handleCheckLogin} className="btn w-full btn-primary  mt-4 rounded-ful">View Details</button>
            </Link>
        </div>
    )
}

JobCard.propTypes = {
    job: PropTypes.object
}

export default JobCard