import React, { useState } from 'react';
import TrainerForm from './TrainerForm';

// Define the structure of a Trainer
interface Trainer {
  id: string;
  nombre: string;
  apellidos: string;
  correo: string;
  fechaNacimiento: string;
  titulacion: string[];
}

// Trainers component
const Trainers: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Handle adding a new trainer
  const handleAddTrainer = (trainer: Trainer) => {
    setTrainers([...trainers, trainer]);
    setShowForm(false);
  };

  // Handle closing the form
  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#3f3222]">Entrenadores</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
        >
          Añadir
        </button>
      </div>
      {showForm && <TrainerForm onAddTrainer={handleAddTrainer} onClose={handleCloseForm} />}
      <div className="space-y-4">
        {trainers.map((trainer) => (
          <div key={trainer.id} className="bg-white rounded-lg shadow-lg p-4 flex justify-between items-center">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-[#3f3222]">{trainer.nombre} {trainer.apellidos}</h3>
            </div>
            <div className="flex-1">
              <p className="text-[#dabf94]">Fecha de Nacimiento: <span className="text-[#3f3222]">{new Date(trainer.fechaNacimiento).toLocaleDateString()}</span></p>
            </div>
            <div className="flex-1">
              <p className="text-[#dabf94]">Correo: <span className="text-[#3f3222]">{trainer.correo}</span></p>
            </div>
            <div className="flex-1">
              <p className="text-[#dabf94]">Titulación: <span className="text-[#3f3222]">{trainer.titulacion.join(', ')}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trainers;