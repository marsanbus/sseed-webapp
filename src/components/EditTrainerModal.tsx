import React, { useState } from 'react';
import Trainer  from './Trainers'; // Asegúrate de tener esta interfaz definida

interface EditTrainerModalProps {
  trainer: Trainer;
  onUpdate: (updatedTrainer: Trainer) => void;
  onClose: () => void;
}

const EditTrainerModal: React.FC<EditTrainerModalProps> = ({ trainer, onUpdate, onClose }) => {
  const [formData, setFormData] = useState<Trainer>(trainer);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const newTitulacion = checked
        ? [...prev.titulacion, value]
        : prev.titulacion.filter((t) => t !== value);
      return { ...prev, titulacion: newTitulacion };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-[#3f3222] mb-6">Editar Profesional</h2>
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
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#3f3222] mb-2">Fecha de Nacimiento</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#3f3222] mb-2">Titulación</label>
            <div className="space-y-2">
              {['Fisioterapeuta', 'CAFD', 'TSEAS', 'Médico', 'TAF', 'Otros'].map((titulo) => (
                <label key={titulo} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={titulo}
                    checked={formData.titulacion.includes(titulo)}
                    onChange={handleCheckboxChange}
                    className="form-checkbox"
                  />
                  <span className="ml-2 text-[#3f3222]">{titulo}</span>
                </label>
              ))}
            </div>
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
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTrainerModal;