import React from 'react';

const TypingIndicator: React.FC = () => {
    return (
        <div className="flex items-center">
            <div className="animate-pulse flex space-x-2">
                <div className="h-2.5 w-2.5 rounded-full bg-gray-300"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-gray-300"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-gray-300"></div>
            </div>
            <span className="ml-2 text-gray-500">AI is typing...</span>
        </div>
    );
};

export default TypingIndicator;