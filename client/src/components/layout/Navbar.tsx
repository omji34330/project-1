import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-green-600">
                    EcoGrid AI
                </div>
                <div className="space-x-4">
                    <Link to="/" className="text-gray-800 dark:text-white hover:text-green-600">Home</Link>
                    <Link to="/dashboard" className="text-gray-800 dark:text-white hover:text-green-600">Dashboard</Link>
                    <Link to="/prediction" className="text-gray-800 dark:text-white hover:text-green-600">AI Prediction</Link>
                    <Link to="/reports" className="text-gray-800 dark:text-white hover:text-green-600">Reports</Link>
                    <Link to="/team" className="text-gray-800 dark:text-white hover:text-green-600">Team</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;