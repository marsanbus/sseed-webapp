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
        <div className="max-w-4xl mx-auto">
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
                <div key={trainer.id} className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-semibold text-[#3f3222]">{trainer.nombre} {trainer.apellidos}</h3>
                        <p className="text-[#a1a48f]">{trainer.correo}</p>
                    </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-[#dabf94]">Fecha de Nacimiento</p>
                        <p className="text-[#3f3222]">{new Date(trainer.fechaNacimiento).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <p className="text-[#dabf94]">Titulación</p>
                        <p className="text-[#3f3222]">{trainer.titulacion.join(', ')}</p>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
};

export default Trainers;