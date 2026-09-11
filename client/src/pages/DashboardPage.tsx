import React, { useEffect, useState } from 'react';
import KPIGrid from '../components/dashboard/KPIGrid';
import BatteryWidget from '../components/dashboard/BatteryWidget';
import AreaChart from '../components/charts/AreaChart';
import DonutChart from '../components/charts/DonutChart';
import TrendChart from '../components/charts/TrendChart';
import LoadingSkeleton from '../components/dashboard/LoadingSkeleton';
import useLiveData from '../hooks/useLiveData';

const DashboardPage: React.FC = () => {
    const { data, loading, error } = useLiveData();

    if (loading) {
        return <LoadingSkeleton />;
    }

    if (error) {
        return <div>Error fetching data. Please try again.</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <KPIGrid data={data.kpi} />
            <BatteryWidget data={data.battery} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AreaChart data={data.trend} />
                <DonutChart data={data.energyMix} />
            </div>
            <TrendChart data={data.weeklyTrend} />
        </div>
    );
};

export default DashboardPage;