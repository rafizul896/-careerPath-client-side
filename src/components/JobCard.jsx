import PropTypes from 'prop-types';
// import { PiBagSimpleDuotone } from "react-icons/pi";
import { MdOutlineWatchLater } from "react-icons/md";
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
    const { _id,jobTitle, postingDate, salaryRange, deadline, applicantsNumber, user } = job
    return (
        <div className='w-full max-w-sm px-4 py-5 bg-white rounded-md shadow-xl border hover:scale-[1.05] transition-all space-y-2'>
            <div className='flex items-center justify-end '>
                <span className='px-3 py-2 text-[10px] text-white uppercase bg-red-400 rounded-full '>
                    Deadline: {deadline}
                </span>
            </div>

            <h1 className='mt-2 text-lg font-semibold text-gray-800 '>
                {jobTitle}
            </h1>
            <p className='mt-2 text-sm font-bold text-gray-600 '>
                {user.name}
            </p>
            <p className='mt-2 text-sm font-bold text-gray-600 '>
                Salary range: {salaryRange}
            </p>
            <div className="flex justify-between">
                <p className='mt-2 text-sm text-gray-600 flex items-center gap-1'>
                    <span className='text-lg'><MdOutlineWatchLater /></span> {postingDate}
                </p>
                <p className='mt-2 text-sm font-bold text-gray-600 '>
                    Applicants Number: {applicantsNumber}
                </p>
            </div>

            <Link to={`/job/${_id}`}>
                <button className="btn btn-primary w-full mt-3 rounded-full">View Details</button>
            </Link>
        </div>
    )
}

JobCard.propTypes = {
    job: PropTypes.object
}

export default JobCard