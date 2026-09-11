import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-500 to-emerald-500 text-white">
            <section className="text-center">
                <div className="animate-pulse">
                    <img src="/path/to/renewable-energy-animation.gif" alt="Renewable Energy Animation" className="mx-auto mb-4" />
                </div>
                <h1 className="text-4xl font-bold mb-4">Powering a Greener Tomorrow with AI</h1>
                <div className="flex justify-center space-x-4">
                    <Link to="/dashboard" className="bg-white text-green-500 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-200 transition">
                        View Dashboard
                    </Link>
                    <Link to="/prediction" className="bg-white text-green-500 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-200 transition">
                        AI Prediction
                    </Link>
                </div>
            </section>
            <section className="mt-10 max-w-4xl">
                <h2 className="text-2xl font-semibold mb-4">Features</h2>
                <p className="mb-4">Discover how EcoGrid AI can help you harness renewable energy efficiently.</p>
                <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
                <p className="mb-4">Our AI algorithms analyze weather patterns to optimize energy generation.</p>
                <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
                <p className="mb-4">Reduce carbon footprint and save on energy costs with our smart solutions.</p>
                <h2 className="text-2xl font-semibold mb-4">Contact</h2>
                <p className="mb-4">Get in touch with us for more information on our services.</p>
            </section>
        </div>
    );
};

export default HomePage;