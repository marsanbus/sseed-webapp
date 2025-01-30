import React, { useState } from 'react';

interface TrainerFormProps {
    onAddTrainer: (trainer: Trainer) => void;
    onClose: () => void;
}

interface Trainer {
    id: string;
    nombre: string;
    apellidos: string;
    correo: string;
    fechaNacimiento: string;
    titulacion: string[];
}

// Define the structure of the form data
interface FormData {
    nombre: string;
    apellidos: string;
    correo: string;
    fechaNacimiento: string;
    titulacion: string[];
}

// Trainer form component
const TrainerForm: React.FC<TrainerFormProps> = ({ onAddTrainer, onClose }) => {
    const [formData, setFormData] = useState<FormData>({
        nombre: '',
        apellidos: '',
        correo: '',
        fechaNacimiento: '',
        titulacion: [],
    });

    const [errors, setErrors] = useState({
        nombre: '',
        apellidos: '',
        correo: '',
        fechaNacimiento: '',
    });

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Validation logic
        if (name === 'nombre' || name === 'apellidos' || name === 'correo') {
            if (value.length > 50) {
                setErrors((prev) => ({ ...prev, [name]: 'No puede tener más de 50 caracteres' }));
            } else {
                setErrors((prev) => ({ ...prev, [name]: '' }));
            }
        }

        if (name === 'fechaNacimiento') {
            const selectedDate = new Date(value);
            const today = new Date();
            const minDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
            if (selectedDate > minDate) {
                setErrors((prev) => ({ ...prev, fechaNacimiento: 'Debe ser mayor de 16 años' }));
            } else {
                setErrors((prev) => ({ ...prev, fechaNacimiento: '' }));
            }
        }
    };

    // Handle checkbox changes for 'Titulación'
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData((prev) => {
        const newTitulacion = checked
            ? [...prev.titulacion, value]
            : prev.titulacion.filter((t) => t !== value);
        return { ...prev, titulacion: newTitulacion };
        });
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!errors.nombre && !errors.apellidos && !errors.correo && !errors.fechaNacimiento) {
            const newTrainer: Trainer = {
                id: crypto.randomUUID(),
                ...formData,
            };
            onAddTrainer(newTrainer);
            onClose();
        }
    };

    // Handle form reset
    const handleReset = () => {
        setFormData({
        nombre: '',
        apellidos: '',
        correo: '',
        fechaNacimiento: '',
        titulacion: [],
        });
        setErrors({
            nombre: '',
            apellidos: '',
            correo: '',
            fechaNacimiento: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} onReset={handleReset} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-4">
                <label className="block text-[#dabf94] mb-2">Nombre</label>
                <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
                />
                {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
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
                {errors.apellidos && <p className="text-red-500 text-sm">{errors.apellidos}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-[#dabf94] mb-2">Correo</label>
                <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
                />
                {errors.correo && <p className="text-red-500 text-sm">{errors.correo}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-[#dabf94] mb-2">Fecha de Nacimiento</label>
                <input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"/>
                {errors.fechaNacimiento && <p className="text-red-500 text-sm">{errors.fechaNacimiento}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-[#dabf94] mb-2">Titulación</label>
                <div className="space-y-2">
                <label className="inline-flex items-center">
                    <input
                    type="checkbox"
                    value="Fisioterapeuta"
                    checked={formData.titulacion.includes('Fisioterapeuta')}
                    onChange={handleCheckboxChange}
                    className="form-checkbox"
                    />
                    <span className="ml-2 text-[#3f3222]">Fisioterapeuta</span>
                </label>
                <label className="inline-flex items-center">
                    <input
                    type="checkbox"
                    value="CAFD"
                    checked={formData.titulacion.includes('CAFD')}
                    onChange={handleCheckboxChange}
                    className="form-checkbox"
                    />
                    <span className="ml-2 text-[#3f3222]">CAFD (Ciencias de la Actividad Física del Deporte)</span>
                </label>
                <label className="inline-flex items-center">
                    <input
                    type="checkbox"
                    value="TSEAS"
                    checked={formData.titulacion.includes('TSEAS')}
                    onChange={handleCheckboxChange}
                    className="form-checkbox"
                    />
                    <span className="ml-2 text-[#3f3222]">TSEAS (Técnico Superior en Enseñanza y Animación Sociodeportiva)</span>
                </label>
                <label className="inline-flex items-center">
                    <input
                    type="checkbox"
                    value="Médico"
                    checked={formData.titulacion.includes('Médico')}
                    onChange={handleCheckboxChange}
                    className="form-checkbox"
                    />
                    <span className="ml-2 text-[#3f3222]">Médico</span>
                </label>
                <label className="inline-flex items-center">
                    <input
                    type="checkbox"
                    value="TAF"
                    checked={formData.titulacion.includes('TAF')}
                    onChange={handleCheckboxChange}
                    className="form-checkbox"
                    />
                    <span className="ml-2 text-[#3f3222]">TAF (Técnico Superior de Acondicionamiento Físico)</span>
                </label>
                <label className="inline-flex items-center">
                    <input
                    type="checkbox"
                    value="Otros"
                    checked={formData.titulacion.includes('Otros')}
                    onChange={handleCheckboxChange}
                    className="form-checkbox"
                    />
                    <span className="ml-2 text-[#3f3222]">Otros</span>
                </label>
                </div>
            </div>
            <button type="submit" className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors">
                Añadir
            </button>
            <button type="reset" onClick={handleReset} className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors ml-2">
                Limpiar
            </button>
            <button type="button" onClick={onClose} className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors ml-2">
                Volver
            </button>
        </form>
    );
};

export default TrainerForm;