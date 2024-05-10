import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Root = () => {
    return (
        <div className="w-[90%] md:w-[90%] lg:w-[80%] mx-auto max-w-[1440px]">
            <Navbar></Navbar>
            <div className="min-h-[calc(100vh-306px)]">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;