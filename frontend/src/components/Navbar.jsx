import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
            <Link to="/" className="text-xl font-bold text-blue-600">MyApp</Link>
            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <Link to="/students" className="text-gray-600 hover:text-blue-600 font-medium">Students</Link>
                        <span className="text-gray-500 text-sm">Hi, {user.username}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
                        <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
