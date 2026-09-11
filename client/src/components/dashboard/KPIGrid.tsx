import React from 'react';

interface KPIProps {
  temperature: number;
  windSpeed: number;
  cloudCover: number;
  humidity: number;
  pressure: number;
}

const KPIGrid: React.FC<KPIProps> = ({ temperature, windSpeed, cloudCover, humidity, pressure }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center">
        <h2 className="text-xl font-bold">Temperature (°C)</h2>
        <p className="text-2xl">{temperature.toFixed(1)}°C</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center">
        <h2 className="text-xl font-bold">Wind Speed (km/h)</h2>
        <p className="text-2xl">{windSpeed.toFixed(1)} km/h</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center">
        <h2 className="text-xl font-bold">Cloud Cover (%)</h2>
        <p className="text-2xl">{cloudCover.toFixed(1)}%</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center">
        <h2 className="text-xl font-bold">Humidity (%)</h2>
        <p className="text-2xl">{humidity.toFixed(1)}%</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center">
        <h2 className="text-xl font-bold">Pressure (hPa)</h2>
        <p className="text-2xl">{pressure.toFixed(1)} hPa</p>
      </div>
    </div>
  );
};

export default KPIGrid;