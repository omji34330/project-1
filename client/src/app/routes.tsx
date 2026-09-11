import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import PredictionPage from '../pages/PredictionPage';
import ReportsPage from '../pages/ReportsPage';
import TeamPage from '../pages/TeamPage';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/prediction" element={<PredictionPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/team" element={<TeamPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;