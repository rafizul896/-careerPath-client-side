import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { IoClose } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { useEffect, useState } from "react";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [open, setOpen] = useState(false);
    const localTheme = localStorage.getItem('theme')
    const [theme, setTheme] = useState(localTheme ? localTheme : 'light');

    useEffect(() => {
        localStorage.setItem('theme', theme)
        document.querySelector('html').setAttribute('data-theme', theme);
    }, [theme])

    const handleToggle = e => {
        console.log(e.target.checkbox)
        if (e.target.checked) {
            setTheme('dark')
        }
        else {
            setTheme('light')
        }
    }

    const links = <>
        <NavLink to="/" className={({ isActive }) => isActive ? "text-[#14a55f] text-base" : "text-base"}>Home</NavLink>
        <NavLink to="/allJobs" className={({ isActive }) => isActive ? "text-[#14a55f] text-base" : "text-base"}>All Jobs</NavLink>
        <NavLink to="/" className={({ isActive }) => isActive ? "text-[#14a55f] text-base" : "text-base"}>Blogs</NavLink>
    </>
    const handleLogOut = () => {
        logOut()
    }
    return (
        <div className='navbar bg-base-100 shadow-sm px-0'>
            <div className='flex-1'>
                <div className="dropdow">
                    <div onClick={() => setOpen(!open)} className="lg:hidden text-2xl md:text-3xl">
                        {
                            open ? <IoClose /> : <FiMenu />
                        }
                    </div>
                    <ul className={`${open ? 'block' : 'hidden'} absolute menu menu-md dropdown-content mt-3 z-[5] p-2 shadow bg-base-300 rounded-box w-[200px] flex gap-3 py-5  text-center items-center justify-center`}>
                        {links}
                    </ul>
                </div>
                <div className='flex gap-2 lg:gap-0 items-center'>
                    <img className='w-auto h-7' src='' alt='' />
                    <Link to="/" className='font-bold'>SoloSphere</Link>
                </div>
            </div>
            <div className='flex-none flex items-center gap-1 md:gap-0'>
                <ul className='menu menu-horizontal items-center px-2'>
                    <div className="hidden lg:flex gap-5 pr-4">
                        {links}
                    </div>
                    {
                        !user && (
                            <Link to='/login'>Login</Link>
                        )
                    }

                </ul>
                <label className="cursor-pointer grid place-items-center md:px-2 lg:px-4">
                    <input onClick={handleToggle} type="checkbox" value="synthwave" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
                    <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                    <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </label>
                {
                    user &&

                    <div className='dropdown dropdown-end z-50'>
                        <div
                            tabIndex={0}
                            role='button'
                            className='btn btn-ghost btn-circle avatar'
                        >
                            <div className='w-10 rounded-full' title=''>
                                <img
                                    referrerPolicy='no-referrer'
                                    alt='User Profile Photo'
                                    src={user.photoURL}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
                        >
                            <li>
                                <Link className='justify-between'>Add A Job</Link>
                            </li>
                            <li>
                                <Link>My Jobs</Link>
                            </li>
                            <li>
                                <Link>Applied Jobs</Link>
                            </li>
                            <li>
                                <Link>User Profile</Link>
                            </li>
                            <li className='mt-2'>
                                <button onClick={handleLogOut} className='bg-gray-200 block text-center'>Logout</button>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar;