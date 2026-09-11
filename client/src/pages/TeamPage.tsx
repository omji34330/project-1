declare const require: any;
const React = require('react');
import TeamCard from '../components/team/TeamCard';

type TeamMember = {
    name: string;
    role: string;
};

const teamMembers: TeamMember[] = [
    { name: 'Om Ji Gupta', role: 'Full Stack & AI Developer' },
    { name: 'Member 2', role: 'Product & Research Lead' },
    { name: 'Member 3', role: 'Team Leader' },
    { name: 'Member 4', role: 'Team Member' },
    { name: 'Member 5', role: 'Team Member' },
    { name: 'Member 6', role: 'Team Member' },
];

const TeamPage = () => {
    return React.createElement(
        'div',
        { className: 'flex flex-col items-center justify-center p-6' },
        React.createElement('h1', { className: 'text-3xl font-bold mb-6' }, 'Meet Our Team'),
        React.createElement(
            'div',
            { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' },
            ...teamMembers.map((member, index) =>
                React.createElement(TeamCard, {
                    key: index,
                    name: member.name,
                    role: member.role,
                })
            )
        )
    );
};

export default TeamPage;