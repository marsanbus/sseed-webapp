import React from 'react';

interface UserFormFieldsProps {
  formData: {
    nombre: string;
    apellidos: string;
    birthDate: string;
    weight: string;
    height: string;
    email: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const UserFormFields: React.FC<UserFormFieldsProps> = ({ formData, handleInputChange }) => {
  return (
    <>
      <div className="mb-4">
        <label className="block text-[#dabf94] mb-2">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
        />
      </div>
      <div className="mb-4">
        <label className="block text-[#dabf94] mb-2">Apellidos</label>
        <input
          type="text"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
        />
      </div>
      <div className="mb-4">
        <label className="block text-[#dabf94] mb-2">Fecha de Nacimiento</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
        />
      </div>
      <div className="mb-4">
        <label className="block text-[#dabf94] mb-2">Peso aprox (kg)</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
        />
      </div>
      <div className="mb-4">
        <label className="block text-[#dabf94] mb-2">Talla aprox (cm)</label>
        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
        />
      </div>
      <div className="mb-4">
        <label className="block text-[#dabf94] mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
        />
      </div>
    </>
  );
};

export default UserFormFields;