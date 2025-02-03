import React from 'react';
import { Pencil, Trash } from 'lucide-react'; // Import Trash icon
import { User } from '../types/user';

interface RegisteredUsersProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: string) => void; // Add onDeleteUser prop
}

const RegisteredUsers: React.FC<RegisteredUsersProps> = ({ users, onEditUser, onDeleteUser }) => {
  // Handle delete confirmation
  const handleDelete = (userId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      onDeleteUser(userId); // Call the onDeleteUser function
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-[#3f3222] mb-6">Usuarios Registrados</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-[#3f3222]">{user.name}</h3>
                <p className="text-[#a1a48f]">{user.email}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEditUser(user)}
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
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[#dabf94]">Fecha de nacimiento</p>
                <p className="text-[#3f3222]">{new Date(user.birthDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-[#dabf94]">Peso</p>
                <p className="text-[#3f3222]">{user.weight} kg</p>
              </div>
              <div>
                <p className="text-[#dabf94]">Altura</p>
                <p className="text-[#3f3222]">{user.height} cm</p>
              </div>
              <div>
                <p className="text-[#dabf94]">Autorización médica</p>
                <p className="text-[#3f3222]">{user.medicalAuthorization ? 'Sí' : 'No'}</p>
              </div>
            </div>
            {user.disease && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-semibold text-[#3f3222] mb-2">Patología</h4>
                <p className="text-[#a1a48f]">{user.disease.general} - {user.disease.specific}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisteredUsers;