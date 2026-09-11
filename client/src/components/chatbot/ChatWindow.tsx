import React, { useEffect, useState } from 'react';
import TypingIndicator from './typing';

const ChatWindow: React.FC = () => {
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'User', text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch('http://localhost:8000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();
            const aiMessage = { sender: 'AI', text: data.reply };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage = { sender: 'AI', text: 'Sorry, I could not process your request.' };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-0 right-0 m-4 w-80 bg-white rounded-lg shadow-lg p-4 glassmorphism">
            <div className="h-64 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`my-2 ${msg.sender === 'User' ? 'text-right' : 'text-left'}`}>
                        <strong>{msg.sender}:</strong> {msg.text}
                    </div>
                ))}
                {isTyping && <TypingIndicator />}
            </div>
            <div className="flex mt-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow border rounded-lg p-2"
                    placeholder="Type a message..."
                />
                <button onClick={handleSendMessage} className="ml-2 bg-green-500 text-white rounded-lg px-4">
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;