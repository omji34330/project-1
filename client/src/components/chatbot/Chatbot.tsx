import React, { useState } from 'react';
import ChatWindow from './ChatWindow';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="fixed bottom-4 right-4">
            <button
                onClick={toggleChat}
                className="bg-green-500 text-white p-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
                Chat
            </button>
            {isOpen && <ChatWindow onClose={toggleChat} />}
        </div>
    );
};

export default Chatbot;