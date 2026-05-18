import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="text-center max-w-lg w-full">
                <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-4">
                    Welcome to <span className="text-blue-600">MyApp</span>
                </h1>
                <p className="text-gray-500 text-sm sm:text-base mb-8">
                    Manage your students easily. Login or register to get started.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        to="/login"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition text-sm sm:text-base"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-medium transition text-sm sm:text-base"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
