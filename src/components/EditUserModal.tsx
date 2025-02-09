import React, { useState } from 'react';
import { User } from '../types/user';

interface EditUserModalProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
  onClose: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, onUpdate, onClose }) => {
  const [formData, setFormData] = useState<User>(user);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-[#3f3222] mb-6">Editar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#3f3222] mb-2">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#3f3222] mb-2">Apellidos</label>
            <input
              type="text"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#3f3222] mb-2">Correo</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#3f3222] mb-2">Enfermedad</label>
            <input
              type="text"
              name="disease"
              value={formData.disease}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#3f3222] mb-2">Profesional Asignado</label>
            <select
              name="assignedProfessional"
              value={formData.assignedProfessional}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
            >
              <option value="Marcos">Marcos</option>
              <option value="Paula">Paula</option>
              <option value="Sergio">Sergio</option>
              <option value="Iker">Iker</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
            >
              Modificar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;