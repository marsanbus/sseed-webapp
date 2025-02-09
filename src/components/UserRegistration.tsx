import { useState, useEffect } from 'react';
import { diseases } from '../data/medical';
import MedicalAuthorization from './MedicalAuthorization';
import PhysicalProfileQuestions from './PhysicalProfileQuestions';
import { User } from '../types/user';
import UserFormFields from './UserFormFields';
import DiseaseQuestions from './DiseaseQuestions';

interface UserRegistrationProps {
  onRegister: (userData: Omit<User, 'id'>) => void;
  onClose: () => void;
  initialData?: User | null;
}

const UserRegistration: React.FC<UserRegistrationProps> = ({ onRegister, onClose, initialData }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    birthDate: '',
    weight: '',
    height: '',
    email: '',
    disease: '',
    treatment: '',
    specificAnswers: {},
    assignedProfessional: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const [physicalProfileAnswers, setPhysicalProfileAnswers] = useState({});
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'disease') {
      setSelectedDisease(value);
    }
  };

  const handleSpecificAnswerChange = (question: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      specificAnswers: {
        ...prev.specificAnswers,
        [question]: value,
      },
    }));
  };

  const handleMultipleAnswerChange = (question: string, value: string) => {
    setFormData((prev) => {
      const currentAnswers = prev.specificAnswers[question] || [];
      const newAnswers = currentAnswers.includes(value)
        ? currentAnswers.filter((answer: string) => answer !== value)
        : [...currentAnswers, value];
      return {
        ...prev,
        specificAnswers: {
          ...prev.specificAnswers,
          [question]: newAnswers,
        },
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const newUser = {
      nombre: formData.nombre,
      apellidos: formData.apellidos,
      birthDate: formData.birthDate,
      weight: formData.weight,
      height: formData.height,
      email: formData.email,
      disease: formData.disease,
      treatment: formData.treatment,
      specificAnswers: formData.specificAnswers,
      assignedProfessional: formData.assignedProfessional,
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Usuario registrado con ID:', data.id);
        onRegister(newUser); // Llama a la función onRegister para manejar el registro en el frontend
        onClose(); // Cierra el formulario después de registrar al usuario
      } else {
        console.error('Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const handleReset = () => {
    setFormData({
      nombre: '',
      apellidos: '',
      birthDate: '',
      weight: '',
      height: '',
      email: '',
      disease: '',
      treatment: '',
      specificAnswers: {},
      assignedProfessional: '',
    });
    setPhysicalProfileAnswers({});
    setSelectedDisease(null);
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
      {/* Campos del formulario */}
      <UserFormFields formData={formData} handleInputChange={handleInputChange} />

      {/* Autorización médica */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-[#3f3222] mb-6">Autorización médica</h2>
        <MedicalAuthorization />
      </div>

      {/* Selección de patología */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-[#3f3222] mb-6">Patologías</h2>
        <label className="block text-[#dabf94] mb-2">Patología Específica</label>
        <select
          name="disease"
          value={formData.disease}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
        >
          <option value="">Selecciona una patología</option>
          {Object.keys(diseases).map((category) => (
            <optgroup key={category} label={category}>
              {diseases[category].map((disease) => (
                <option key={disease} value={disease}>
                  {disease}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {/* Preguntas específicas de la enfermedad */}
      {selectedDisease && (
        <DiseaseQuestions
          selectedDisease={selectedDisease}
          formData={formData}
          handleSpecificAnswerChange={handleSpecificAnswerChange}
          handleMultipleAnswerChange={handleMultipleAnswerChange}
        />
      )}

      {/* Asignar profesional */}
      <div className="border-t pt-6">
        <h2 className="text-2xl font-bold text-[#3f3222] mb-6">Asignar Profesional</h2>
        <select
          name="assignedProfessional"
          value={formData.assignedProfessional}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
        >
          <option value="">Selecciona un Profesional</option>
          <option value="Marcos">Marcos</option>
          <option value="Paula">Paula</option>
          <option value="Sergio">Sergio</option>
          <option value="Iker">Iker</option>
        </select>
      </div>

      {/* Preguntas del perfil físico */}
      <div className="border-t pt-6">
        <PhysicalProfileQuestions
          answers={physicalProfileAnswers}
          onAnswerChange={(index, value) => {
            setPhysicalProfileAnswers((prev) => ({ ...prev, [index]: value }));
          }}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Botones de acción */}
      <button type="submit" className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors">
        Registrar
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

export default UserRegistration;