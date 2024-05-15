import { Helmet } from "react-helmet";
import useAuth from "../../hooks/useAuth";
import { IoMailOutline } from "react-icons/io5";

const MyProfile = () => {
    const {user} = useAuth();
    const {displayName,email,photoURL} = user;
    return (
        <div className="flex justify-center items-center mt-10 mb-16">
             <Helmet>
                <title>Profile | CareerPath</title>
            </Helmet>
            <div className="space-y-4 flex flex-col items-center justify-center shadow-xl p-14 border rounded-lg">
                <div className="w-[200px] h-[200px]">
                    <img className="h-full w-full object-cover rounded-full" src={photoURL} alt="" />
                </div>
                <h3 className="text-xl font-semibold">{displayName}</h3>
                <p className="flex items-center gap-1"><IoMailOutline /> {email}</p>
            </div>
        </div>
    );
};

export default MyProfile;