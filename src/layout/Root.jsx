import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Root = () => {
    return (
        <div>
            <div className="w-[90%] md:w-[90%] lg:w-[80%] mx-auto max-w-[1440px] font-lato">
                <Navbar></Navbar>
                <div className="min-h-[calc(100vh-306px)]">
                    <Outlet></Outlet>
                </div>
            </div>
            <div className="bg-[url('https://i.imghippo.com/files/bjIsR1715741214.png')] text-white bg-cover bg-no-repeat">
            <Footer></Footer>
            </div>
        </div>
    );
};

export default Root;