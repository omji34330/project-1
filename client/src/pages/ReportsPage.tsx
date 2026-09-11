import React, { useEffect, useState } from 'react';
import { fetchSustainabilityData } from '../lib/api';

const ReportsPage: React.FC = () => {
    const [data, setData] = useState({
        totalEnergyGenerated: 0,
        co2Saved: 0,
        renewableContribution: 0,
        gridEfficiency: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const response = await fetchSustainabilityData();
                setData(response);
            } catch (err) {
                setError('Failed to fetch data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    const handleExportReport = () => {
        // Logic for exporting the report
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Sustainability Reports</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="font-semibold">Total Energy Generated</h2>
                    <p>{data.totalEnergyGenerated} kWh</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="font-semibold">CO₂ Saved</h2>
                    <p>{data.co2Saved} kg</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="font-semibold">Renewable Contribution</h2>
                    <p>{data.renewableContribution} %</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="font-semibold">Grid Efficiency</h2>
                    <p>{data.gridEfficiency} %</p>
                </div>
            </div>
            <button
                onClick={handleExportReport}
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
            >
                Export Report
            </button>
        </div>
    );
};

export default ReportsPage;