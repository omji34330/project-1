import React from 'react';

interface BatteryWidgetProps {
    batteryStatus: number; // Battery percentage
    chargingEstimate: number; // Estimated charging time in minutes
}

const BatteryWidget: React.FC<BatteryWidgetProps> = ({ batteryStatus, chargingEstimate }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-green-600 dark:text-green-400">Battery Status</h2>
            <div className="mt-2">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400">{batteryStatus}%</div>
                <p className="text-gray-600 dark:text-gray-300">Estimated Charging Time: {chargingEstimate} minutes</p>
            </div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-4">
                <div
                    className="bg-green-600 h-4 rounded-full"
                    style={{ width: `${batteryStatus}%` }}
                />
            </div>
        </div>
    );
};

export default BatteryWidget;