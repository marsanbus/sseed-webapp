import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { Pencil, Trash } from 'lucide-react';
import male from '../assets/male.png';
import { User } from '../types/user';

interface RegisteredUsersProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
}

const RegisteredUsers: React.FC<RegisteredUsersProps> = ({ users, onEditUser, onDeleteUser }) => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleEditUser = (user: User) => {
    onEditUser(user); // Pass the user to be edited
    navigate('/registro-usuario'); // Navigate to the user registration page
  };

  const handleDelete = (userId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      onDeleteUser(userId);
    }
  };

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#3f3222]">Usuarios Registrados</h2>
      </div>
      <div className="space-y-2">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow-lg p-4 flex justify-between items-center">
            <div className="flex items-center gap-4 text-[#3f3222]">
              <img src={male} alt="Foto del usuario" className="w-10 h-10 rounded-full" />
              <span className="font-semibold">{user.name}</span>
              <span className="text-[#a1a48f]">{user.disease}</span>
              <span className="text-[#a1a48f]">{user.assignedProfessional}</span>
            </div>
            <div className="flex space-x-2">
              <button className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors">
                Evaluar
              </button>
              <button className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors">
                Entrenamiento
              </button>
              <button
                onClick={() => handleEditUser(user)}
                className="text-[#5a6b47] hover:text-opacity-80 transition-colors"
              >
                <Pencil className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisteredUsers;