import React, { useState, useEffect } from 'react';
import { Pencil, Trash } from 'lucide-react';
import male from '../assets/male.png';
import { User } from '../types/user';
import Evaluacion from './Evaluacion';
import EntrenamientoModal from './EntrenamientoModal';
import EditUserModal from './EditUserModal'; // Nuevo componente para el modal de edición

interface RegisteredUsersProps {
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
}

const RegisteredUsers: React.FC<RegisteredUsersProps> = ({ onEditUser, onDeleteUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [activeScreen, setActiveScreen] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEntrenamientoModalOpen, setIsEntrenamientoModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Estado para controlar el modal de edición

  // Obtener los usuarios desde la base de datos
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Error al obtener los usuarios');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true); // Abrir el modal de edición
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setUsers(users.filter((user) => user.id !== userId)); // Actualiza el estado local
          console.log('Usuario eliminado:', userId);
        } else {
          console.error('Error al eliminar el usuario');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    }
  };

  const handleEvaluate = (user: User) => {
    setSelectedUser(user);
    setActiveScreen('evaluacion');
  };

  const handleTrain = (user: User) => {
    setSelectedUser(user);
    setIsEntrenamientoModalOpen(true);
  };

  const handleUpdateUser = async (updatedUser: User) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
        setIsEditModalOpen(false); // Cerrar el modal después de la actualización
      } else {
        console.error('Error al actualizar el usuario');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  if (activeScreen === 'evaluacion' && selectedUser) {
    return <Evaluacion />;
  }

  if (activeScreen === 'entrenamiento' && selectedUser) {
    return <EntrenamientoModal onClose={() => setActiveScreen(null)} user={selectedUser} />;
  }

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#3f3222]">Usuarios Registrados</h2>
      </div>
      <div className="space-y-2">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow-lg p-4 flex justify-between items-center">
            <div className="flex items-center gap-4 text-[#3f3222] w-full">
              <img src={male} alt="Foto del usuario" className="w-10 h-10 rounded-full" />
              <div className="flex-1 flex items-center gap-4 overflow-hidden">
                <div className="w-2/5 truncate border-r pr-4">
                  <span className="font-semibold truncate">{user.nombre} {user.apellidos}</span>
                </div>
                <div className="w-2/5 truncate border-r pr-4">
                  <span className="text-[#a1a48f] truncate">📝 {user.disease}</span>
                </div>
                <div className="w-1/5 truncate">
                  <span className="text-[#a1a48f] truncate">🎓 {user.assignedProfessional}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEvaluate(user)}
                  className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
                >
                  Evaluar
                </button>
                <button
                  onClick={() => handleTrain(user)}
                  className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
                >
                  Planificación
                </button>
                <button
                  onClick={() => handleEditUser(user)}
                  className="text-[#5a6b47] hover:text-opacity-80 transition-colors"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Renderizar el modal de edición si isEditModalOpen es true */}
      {isEditModalOpen && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onUpdate={handleUpdateUser}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      {/* Renderizar el modal de entrenamiento si isEntrenamientoModalOpen es true */}
      {isEntrenamientoModalOpen && selectedUser && (
        <EntrenamientoModal onClose={() => setIsEntrenamientoModalOpen(false)} user={selectedUser} />
      )}
    </div>
  );
};

export default RegisteredUsers;