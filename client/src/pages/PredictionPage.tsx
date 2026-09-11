import React, { useEffect, useState } from 'react';
import { fetchPredictionData } from '../lib/api';
import AreaChart from '../components/charts/AreaChart';
import DonutChart from '../components/charts/DonutChart';
import LoadingSkeleton from '../components/dashboard/LoadingSkeleton';

const PredictionPage: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await fetchPredictionData();
                setData(result);
            } catch (err) {
                setError('Failed to fetch prediction data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 60000); // Refresh every 60 seconds

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <LoadingSkeleton />;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">24-Hour Renewable Energy Prediction</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="font-semibold">Expected Solar Output</h2>
                    <AreaChart data={data.solarOutput} />
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="font-semibold">Wind Potential</h2>
                    <AreaChart data={data.windPotential} />
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="font-semibold">Battery Charging Estimate</h2>
                    <DonutChart data={data.batteryEstimate} />
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="font-semibold">Carbon Reduction Score</h2>
                    <div>{data.carbonReductionScore}</div>
                </div>
            </div>
        </div>
    );
};

export default PredictionPage;