import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
        setMenuOpen(false);
    };

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="text-xl font-bold text-blue-600">MyApp</Link>

                {/* Desktop Menu */}
                <div className="hidden sm:flex items-center gap-4">
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

                {/* Mobile Hamburger */}
                <button
                    className="sm:hidden flex flex-col gap-1.5 p-1"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="sm:hidden border-t border-gray-100 px-4 py-3 flex flex-col gap-3 bg-white">
                    {user ? (
                        <>
                            <span className="text-gray-500 text-sm">Hi, {user.username}</span>
                            <Link to="/students" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-blue-600 font-medium">Students</Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition text-left"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
                            <Link to="/register" onClick={() => setMenuOpen(false)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition text-center">Register</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
