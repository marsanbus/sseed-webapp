import React from 'react';
import { Pencil } from 'lucide-react';
import { User } from '../types/user';

interface RegisteredUsersProps {
    users: User[];
    onEditUser: (user: User) => void;
}

const RegisteredUsers: React.FC<RegisteredUsersProps> = ({ users, onEditUser }) => {
    return (
        <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#3f3222] mb-6">Usuarios Registrados</h2>
        <div className="space-y-4">
            {users.map((user) => (
            <div key={user.id} className="bg-white rounded-lg shadow-lg p-4 flex justify-between items-center">
                <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#3f3222]">{user.name}</h3>
                <p className="text-[#a1a48f]">{user.email}</p>
                <p className="text-[#a1a48f]">{user.disease?.general}</p>
                </div>
                <div className="flex items-center space-x-4">
                <button className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors">Evaluar</button>
                <button className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors">Planificar Entrenamiento</button>
                <button onClick={() => onEditUser(user)}className="text-[#5a6b47] hover:text-opacity-80 transition-colors"><Pencil className="h-5 w-5" /></button>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
};

export default RegisteredUsers;