import { ScaleLoader } from "react-spinners";

const Loader = () => {
    return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <ScaleLoader size={100} color="#14a55f" />
        </div>
    );
};

export default Loader;