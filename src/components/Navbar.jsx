import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { Search } from "lucide-react";
import { LogOut } from 'lucide-react';


const Navbar = () => {
    const [username, setUsername] = useState(null);
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchUsername, setSearchUsername] = useState("")

    const navigate = useNavigate();
    const location = useLocation();

    const path = location.pathname;

    useEffect(() => {
        const storedUser = localStorage.getItem("username");
        setUsername(storedUser);
    }, [location.pathname])

    const handleLogout = () => {
        localStorage.removeItem("username");
        setUsername(null);
        toast.success("Logged out successfully");
        setTimeout(() => {
            navigate("/");
        }, 400);
    };

    const handleSearch = (e) => {
        e.preventDefault();

        if (!searchUsername.trim()) return;

        navigate(`/profile/${searchUsername}`)
        setSearchUsername("")
        setSearchOpen(false)
    }


    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 ">
            <nav className="backdrop-blur-md bg-gradient-to-r from-white/10 via-white/5 to-white/10 border-gray-100/20 border rounded-full shadow-[0_8px_30px_rgba(112,100,240,0.25)] ">
                <div className="px-6 py-4 flex items-center justify-between">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-2xl lg:text-[26px] font-extrabold tracking-tighter "
                    >
                        art<span className="text-green-400">Gallery.</span>
                    </Link>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">

                        {/* Search feature (for everyone) */}
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setSearchOpen(prev => !prev)}
                                className="p-2 rounded-full hover:bg-white/10 transition duration-200"
                                title="Search users by username"
                            >
                                <Search size={18} className="text-white" />
                            </button>

                            {searchOpen && (
                                <form
                                    onSubmit={handleSearch}
                                    className={`flex items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md
                                    transition-all duration-300 overflow-hidden
                                    ${searchOpen ? "w-19 md:w-45 px-3" : ""}`}
                                >
                                    <input
                                        type="text"
                                        value={searchUsername}
                                        onChange={(e) => setSearchUsername(e.target.value)}
                                        placeholder="Search username..."
                                        className={`bg-transparent text-sm text-white outline-none transition-all duration-700
                                        ${searchOpen ? "w-full ml-2 opacity-90 py-2" : "w-0 opacity-0"}`}
                                    />
                                </form>
                            )}
                        </div>

                        {/* Auth buttons */}
                        {!username ? (
                            <>
                                <Link
                                    to="/login"
                                    className="text-sm font-medium text-gray-200 px-4 py-2 hover:text-white transition duration-300"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/signup"
                                    className="text-sm font-bold px-5 py-2 rounded-full bg-white text-black hover:bg-gray-200 shadow-[0_4px_14px_0_rgba(255,255,255,0.39)] transition-all duration-300"
                                >
                                    Sign up
                                </Link>
                            </>
                        ) : (
                            <>
                                {path !== '/dashboard' && <Link
                                    to="/dashboard"
                                    className="text-sm px-4 py-2 rounded-full border border-white/40 text-white hover:bg-white hover:text-black transition duration-300"
                                >
                                    Dashboard
                                </ Link>}
                                <button
                                    onClick={handleLogout}
                                    className="text-sm px-4 py-2 rounded-full border border-white/40 text-white hover:bg-white hover:text-black transition duration-300 cursor-pointer"
                                >
                                    {/* Text → visible on md+ screens */}
                                    <span className="hidden md:inline text-sm font-medium">
                                        Logout
                                    </span>

                                    {/* Icon → visible on small screens */}
                                    <span className="md:hidden">
                                        <LogOut size={15} />
                                    </span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
