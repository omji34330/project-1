import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatbotWidget from '../chatbot/ChatbotWidget';

export default function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-emerald-50 bg-grid-glow dark:bg-night-900">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
