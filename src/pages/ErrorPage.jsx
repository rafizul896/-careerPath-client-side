import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex justify-center flex-col items-center max-w-screen-xl min-h-screen md:w-[70%] mx-auto">
            <img className="" src={'https://i.imghippo.com/files/sKUHu1715762009.svg'} alt="img" />
            <Link to='/' className='px-14 rounded-full py-3 md:py-5 font-medium text-white bg-[#2557a7] hover:bg-[#0d2d5e]'>Back to Home</Link>
        </div>
    );
};

export default ErrorPage;