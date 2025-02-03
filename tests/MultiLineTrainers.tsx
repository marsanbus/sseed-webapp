import React, { useState } from 'react';
import TrainerForm from './TrainerForm';
import { Pencil, Trash } from 'lucide-react'; // Import Trash icon

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
    const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null);

    // Handle adding a new trainer
    const handleAddTrainer = (trainer: Trainer) => {
        if (editingTrainer) {
            // Update existing trainer
            setTrainers(trainers.map(t => t.id === trainer.id ? trainer : t));
            setEditingTrainer(null);
        } else {
            // Add new trainer
            setTrainers([...trainers, trainer]);
        }
        setShowForm(false);
    };

    // Handle closing the form
    const handleCloseForm = () => {
        setShowForm(false);
        setEditingTrainer(null);
    };

    // Handle editing a trainer
    const handleEditTrainer = (trainer: Trainer) => {
        setEditingTrainer(trainer);
        setShowForm(true);
    };

    // Handle delete confirmation
    const handleDeleteTrainer = (trainerId: string) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este entrenador?')) {
            setTrainers(trainers.filter(trainer => trainer.id !== trainerId)); // Remove the trainer
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#3f3222]">Entrenadores</h2>
                <button onClick={() => setShowForm(!showForm)} className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors">
                    {editingTrainer ? 'Editar Entrenador' : 'Añadir Entrenador'}
                </button>
            </div>
            {showForm && <TrainerForm onAddTrainer={handleAddTrainer} onClose={handleCloseForm} initialData={editingTrainer} />}
            <div className="space-y-4">
                {trainers.map((trainer) => (
                    <div key={trainer.id} className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-semibold text-[#3f3222]">{trainer.nombre} {trainer.apellidos}</h3>
                                <p className="text-[#a1a48f]">{trainer.correo}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEditTrainer(trainer)}
                                    className="text-[#5a6b47] hover:text-opacity-80 transition-colors"
                                >
                                    <Pencil className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handleDeleteTrainer(trainer.id)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <Trash className="h-5 w-5" />
                                </button>
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