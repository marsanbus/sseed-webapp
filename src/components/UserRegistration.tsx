import { useState, useEffect } from 'react';
import { diseases, treatments } from '../data/medical';
import { cancerDeMamaQuestions } from '../data/diseaseQuestions/cancerDeMama'; // Import specific questions
import { diabetesMellitusTipo2Questions } from '../data/diseaseQuestions/diabetesMellitusTipo2'; // Import specific questions
import MedicalAuthorization from './MedicalAuthorization';
import PhysicalProfileQuestions from './PhysicalProfileQuestions';
import { User } from '../types/user';

interface UserRegistrationProps {
  onRegister: (userData: Omit<User, 'id'>) => void;
  onClose: () => void;
  initialData?: User | null;
}

const UserRegistration: React.FC<UserRegistrationProps> = ({ onRegister, onClose, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      ...formData,
      id: crypto.randomUUID(),
    };
    onRegister(newUser);
  };

  const handleReset = () => {
    setFormData({
      name: '',
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

  const getSpecificQuestions = () => {
    switch (selectedDisease) {
      case 'Cáncer de mama':
        return cancerDeMamaQuestions;
      case 'Diabetes mellitus tipo 2':
        return diabetesMellitusTipo2Questions;
      // Add cases for other diseases
      default:
        return [];
    }
  };

  const renderFollowUpQuestions = (followUpQuestions: any[], parentIndex: number) => {
    return followUpQuestions.map((followUpQuestion, followUpIndex) => (
      <div key={`${parentIndex}_${followUpIndex}`} className="mb-4 ml-4 mt-2">
        <label className="block text-[#dabf94] mb-2">{followUpQuestion.question}</label>
        {followUpQuestion.type === 'boolean' ? (
          <div className="flex items-center mb-2 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                id={`followUpAnswer_${parentIndex}_${followUpIndex}_yes`}
                name={`followUpAnswer_${parentIndex}_${followUpIndex}`}
                value="yes"
                checked={formData.specificAnswers[followUpQuestion.question] === 'yes'}
                onChange={(e) => handleSpecificAnswerChange(followUpQuestion.question, e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-[#a1a48f]">Sí</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                id={`followUpAnswer_${parentIndex}_${followUpIndex}_no`}
                name={`followUpAnswer_${parentIndex}_${followUpIndex}`}
                value="no"
                checked={formData.specificAnswers[followUpQuestion.question] === 'no'}
                onChange={(e) => handleSpecificAnswerChange(followUpQuestion.question, e.target.value)}
                className="form-radio"
              />
              <span className="ml-2 text-[#a1a48f]">No</span>
            </label>
          </div>
        ) : followUpQuestion.type === 'selection' ? (
          <select
            name={`followUpAnswer_${parentIndex}_${followUpIndex}`}
            value={formData.specificAnswers[followUpQuestion.question] || ''}
            onChange={(e) => handleSpecificAnswerChange(followUpQuestion.question, e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
          >
            <option value="">Selecciona una opción</option>
            {followUpQuestion.options.map((option: string, optionIndex: number) => (
              <option key={optionIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : followUpQuestion.type === 'multiple' ? (
          followUpQuestion.options.map((option: string, optionIndex: number) => (
            <div key={optionIndex} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`followUpAnswer_${parentIndex}_${followUpIndex}_${optionIndex}`}
                name={`followUpAnswer_${parentIndex}_${followUpIndex}`}
                value={option}
                checked={(formData.specificAnswers[followUpQuestion.question] || []).includes(option)}
                onChange={(e) => handleMultipleAnswerChange(followUpQuestion.question, e.target.value)}
                className="mr-2"
              />
              <label htmlFor={`followUpAnswer_${parentIndex}_${followUpIndex}_${optionIndex}`} className="text-[#3f3222]">
                {option}
              </label>
            </div>
          ))
        ) : (
          <input
            type="text"
            name={`followUpAnswer_${parentIndex}_${followUpIndex}`}
            value={formData.specificAnswers[followUpQuestion.question] || ''}
            onChange={(e) => handleSpecificAnswerChange(followUpQuestion.question, e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
          />
        )}
      </div>
    ));
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="mb-4">
        <label className="block text-[#dabf94] mb-2">Nombre y Apellidos</label>
        <input
          type="text"
          name="name"
          value={formData.name}
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
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-[#3f3222] mb-6">Autorización médica</h2>
        <MedicalAuthorization />
      </div>
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
      {selectedDisease && getSpecificQuestions().length > 0 && (
        <div className="mb-4">
          <label className="block text-[#dabf94] mb-2">Preguntas Específicas</label>
          {getSpecificQuestions().map((questionObj, index) => (
            <div key={index} className="mb-4">
              <label className="block text-[#dabf94] mb-2">{questionObj.question}</label>
              {questionObj.type === 'boolean' ? (
                <div className="flex items-center mb-2 space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      id={`specificAnswer_${index}_yes`}
                      name={`specificAnswer_${index}`}
                      value="yes"
                      checked={formData.specificAnswers[questionObj.question] === 'yes'}
                      onChange={(e) => handleSpecificAnswerChange(questionObj.question, e.target.value)}
                      className="form-radio"
                    />
                    <span className="ml-2 text-[#a1a48f]">Sí</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      id={`specificAnswer_${index}_no`}
                      name={`specificAnswer_${index}`}
                      value="no"
                      checked={formData.specificAnswers[questionObj.question] === 'no'}
                      onChange={(e) => handleSpecificAnswerChange(questionObj.question, e.target.value)}
                      className="form-radio"
                    />
                    <span className="ml-2 text-[#a1a48f]">No</span>
                  </label>
                </div>
              ) : questionObj.type === 'multiple' ? (
                questionObj.options.map((option: string, optionIndex: number) => (
                  <div key={optionIndex} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`specificAnswer_${index}_${optionIndex}`}
                      name={`specificAnswer_${index}`}
                      value={option}
                      checked={(formData.specificAnswers[questionObj.question] || []).includes(option)}
                      onChange={(e) => handleMultipleAnswerChange(questionObj.question, e.target.value)}
                      className="mr-2"
                    />
                    <label htmlFor={`specificAnswer_${index}_${optionIndex}`} className="text-[#3f3222]">
                      {option}
                    </label>
                  </div>
                ))
              ) : (
                <input
                  type="text"
                  name={`specificAnswer_${index}`}
                  value={formData.specificAnswers[questionObj.question] || ''}
                  onChange={(e) => handleSpecificAnswerChange(questionObj.question, e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
                />
              )}
              {questionObj.followUp && formData.specificAnswers[questionObj.question] === 'yes' && (
                <div className="ml-4 mt-2">
                  {renderFollowUpQuestions(questionObj.followUp.yes, index)}
                </div>
              )}
              {questionObj.followUp && formData.specificAnswers[questionObj.question] === 'no' && (
                <div className="ml-4 mt-2">
                  {renderFollowUpQuestions(questionObj.followUp.no, index)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
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
      <div className="border-t pt-6">
        <PhysicalProfileQuestions
          answers={physicalProfileAnswers}
          onAnswerChange={(index, value) => {
            setPhysicalProfileAnswers(prev => ({ ...prev, [index]: value }));
          }}
          onSubmit={handleSubmit}
        />
      </div>
      <button type="submit" className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors">
        Registrar
      </button>
      <button type="reset" onClick={handleReset} className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors ml-2">Limpiar</button>
      <button type="button" onClick={onClose} className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors ml-2">Volver</button>
    </form>
  );
};

export default UserRegistration;