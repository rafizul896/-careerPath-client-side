import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";
import PropTypes from 'prop-types';


const PrivetRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return <Loader></Loader>
    }
    if (user) {
        return children;
    }
    return <Navigate state={location.pathname} to="/login"></Navigate>
};

PrivetRoute.propTypes = {
    children: PropTypes.node
}

export default PrivetRoute;