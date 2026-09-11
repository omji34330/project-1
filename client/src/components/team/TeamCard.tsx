import React from 'react';

interface TeamMember {
    name: string;
    role: string;
    image: string;
}

const TeamCard: React.FC<TeamMember> = ({ name, role, image }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center">
            <img src={image} alt={name} className="w-24 h-24 rounded-full mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
            <p className="text-gray-600 dark:text-gray-400">{role}</p>
        </div>
    );
};

export default TeamCard;