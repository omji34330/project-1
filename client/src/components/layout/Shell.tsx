import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
};

export default Shell;