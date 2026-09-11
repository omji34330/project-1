import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AIPrediction from './pages/AIPrediction';
import Reports from './pages/Reports';
import Team from './pages/Team';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/prediction" element={<AIPrediction />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/team" element={<Team />} />
      </Route>
    </Routes>
  );
}
