import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white dark:bg-gray-800 text-center p-4">
            <div className="container mx-auto">
                <p className="text-gray-600 dark:text-gray-300">
                    &copy; {new Date().getFullYear()} EcoGrid AI. All rights reserved.
                </p>
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="#!" className="text-green-500 hover:underline">Privacy Policy</a>
                    <a href="#!" className="text-green-500 hover:underline">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;