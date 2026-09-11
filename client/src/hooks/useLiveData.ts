import { useEffect, useState } from 'react';

const API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=26.4499&longitude=80.3319&hourly=temperature_2m,wind_speed_10m,cloud_cover,relative_humidity_2m,surface_pressure';

export const useLiveData = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 60000); // Auto-refresh every 60 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return { data, loading, error };
};