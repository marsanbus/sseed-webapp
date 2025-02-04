import { useState, useEffect } from 'react';
import { diseases, treatments } from '../data/medical';
import { cancerDeMamaQuestions } from '../data/diseaseQuestions/cancerDeMama'; // Import specific questions
import { diabetesMellitusTipo2Questions } from '../data/diseaseQuestions/diabetesMellitusTipo2'; // Import specific questions
import MedicalAuthorization from './MedicalAuthorization';
import PhysicalProfileQuestions from './PhysicalProfileQuestions';
import { User } from '../types/user';

interface UserRegistrationProps {
  onRegister: (userData: Omit<User, 'id'>) => void;
  initialData?: User | null;
}

const UserRegistration: React.FC<UserRegistrationProps> = ({ onRegister, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    weight: '',
    height: '',
    disease: '',
    treatment: '',
    specificAnswers: {},
  });

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
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id={`followUpAnswer_${parentIndex}_${followUpIndex}_yes`}
              name={`followUpAnswer_${parentIndex}_${followUpIndex}`}
              value="yes"
              checked={formData.specificAnswers[followUpQuestion.question] === 'yes'}
              onChange={(e) => handleSpecificAnswerChange(followUpQuestion.question, e.target.value)}
              className="mr-2"
            />
            <label htmlFor={`followUpAnswer_${parentIndex}_${followUpIndex}_yes`} className="text-[#3f3222]">
              Sí
            </label>
            <input
              type="radio"
              id={`followUpAnswer_${parentIndex}_${followUpIndex}_no`}
              name={`followUpAnswer_${parentIndex}_${followUpIndex}`}
              value="no"
              checked={formData.specificAnswers[followUpQuestion.question] === 'no'}
              onChange={(e) => handleSpecificAnswerChange(followUpQuestion.question, e.target.value)}
              className="mr-2"
            />
            <label htmlFor={`followUpAnswer_${parentIndex}_${followUpIndex}_no`} className="text-[#3f3222]">
              No
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
        {followUpQuestion.followUp && formData.specificAnswers[followUpQuestion.question] === 'yes' && (
          <div className="ml-4 mt-2">
            {renderFollowUpQuestions(followUpQuestion.followUp.yes, `${parentIndex}_${followUpIndex}`)}
          </div>
        )}
        {followUpQuestion.followUp && formData.specificAnswers[followUpQuestion.question] === 'no' && (
          <div className="ml-4 mt-2">
            {renderFollowUpQuestions(followUpQuestion.followUp.no, `${parentIndex}_${followUpIndex}`)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="mb-4">
        <label className="block text-[#dabf94] mb-2">Nombre</label>
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
        <label className="block text-[#dabf94] mb-2">Peso</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
        />
      </div>
      <div className="mb-4">
        <label className="block text-[#dabf94] mb-2">Altura</label>
        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
        />
      </div>
      <div className="mb-4">
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

      {selectedDisease && treatments[selectedDisease] && (
        <div className="mb-4">
          <label className="block text-[#dabf94] mb-2">Tratamientos</label>
          <select
            name="treatment"
            value={formData.treatment || ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
          >
            <option value="">Selecciona un tratamiento</option>
            {treatments[selectedDisease].map((treatment) => (
              <option key={treatment} value={treatment}>
                {treatment}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedDisease && getSpecificQuestions().length > 0 && (
        <div className="mb-4">
          <label className="block text-[#dabf94] mb-2">Preguntas Específicas</label>
          {getSpecificQuestions().map((questionObj, index) => (
            <div key={index} className="mb-4">
              <label className="block text-[#dabf94] mb-2">{questionObj.question}</label>
              {questionObj.type === 'boolean' ? (
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={`specificAnswer_${index}_yes`}
                    name={`specificAnswer_${index}`}
                    value="yes"
                    checked={formData.specificAnswers[questionObj.question] === 'yes'}
                    onChange={(e) => handleSpecificAnswerChange(questionObj.question, e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor={`specificAnswer_${index}_yes`} className="text-[#3f3222]">
                    Sí
                  </label>
                  <input
                    type="radio"
                    id={`specificAnswer_${index}_no`}
                    name={`specificAnswer_${index}`}
                    value="no"
                    checked={formData.specificAnswers[questionObj.question] === 'no'}
                    onChange={(e) => handleSpecificAnswerChange(questionObj.question, e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor={`specificAnswer_${index}_no`} className="text-[#3f3222]">
                    No
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

      <button type="submit" className="bg-[#5a6b47] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors">
        Registrar
      </button>
    </form>
  );
};

export default UserRegistration;