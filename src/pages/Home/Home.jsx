import Banner from "./Banner";
import TabCategories from "./TabCategories";
import { TbClockCheck } from "react-icons/tb";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { IoTrophyOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import FeaturedJobs from "./Extra/FeaturedJobs";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const Home = () => {
    const { user } = useAuth()
    return (
        <div className="pb-12">
             <Helmet>
                <title>Home | CareerPath</title>
            </Helmet>
            <Banner></Banner>
            <TabCategories></TabCategories>
            {/* Exter section */}
            <FeaturedJobs></FeaturedJobs>
            {/*  */}
            <motion.div
            inherit={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 } }}
            viewport={{ once: false, amount: .5 }}
            >
                <h1 className="text-center text-3xl font-bold pb-8 pt-3">The only job seeker centric platform</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center py-14 px-3 bg-[url('https://i.imghippo.com/files/rF1tA1713751811.jpg')] text-black rounded-md">
                    <div className="space-y-2 flex flex-col justify-center items-center">
                        <div className="text-5xl">
                            <TbClockCheck />
                        </div>
                        <h1 className="text-xl font-semibold">Get matched in minutes</h1>
                        <p className="text-center text-lg">Our profiles understand your career goals and match you to jobs you wont find on other boards</p>
                    </div>
                    <div className="space-y-2 flex flex-col justify-center items-center">
                        <div className="text-5xl">
                            <MdOutlineNotificationsActive />
                        </div>
                        <h1 className="text-xl font-semibold">Never miss an opportunity</h1>
                        <p className="text-center text-lg">
                            Get alerted the moment a great matching job comes along
                        </p>
                    </div>
                    <div className="space-y-2 flex flex-col justify-center items-center">
                        <div className="text-5xl">
                            <IoTrophyOutline />
                        </div>
                        <h1 className="text-xl font-semibold">Have a winning resume</h1>
                        <p className="text-center text-lg">
                            Receive free reviews to improve your CV or tap into professional writers
                        </p>
                    </div>
                </div>
            </motion.div>
            {/*job matching*/}
            {
                !user &&
                <div className="rounded-md flex flex-col justify-center items-center my-12 p-14 space-y-4 bg-[url('https://i.ibb.co/hch8Kbm/ix-GTl1715763309.png')]">
                    <h1 className="text-center text-3xl font-bold">Try job matching today</h1>
                    <Link to='/register'>
                        <button className="px-5 py-4 text-lg font-medium text-white bg-[#2557a7] rounded-md hover:bg-[#0d2d5e]">Setup your profile now</button>
                    </Link>
                </div>
            }
        </div>
    );
};

export default Home;