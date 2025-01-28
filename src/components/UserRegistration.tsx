import React, { useState, useEffect } from 'react';
// import { Upload } from 'lucide-react';
import { diseases, treatments, sideEffects } from '../data/medical';
import MedicalAuthorization from './MedicalAuthorization';
import PhysicalProfileQuestions from './PhysicalProfileQuestions';
import { User } from '../types/user';

// Define the props for the UserRegistration component
interface UserRegistrationProps {
  onRegister: (userData: Omit<User, 'id'>) => void;
  initialData?: User | null;
}

// User registration component
const UserRegistration: React.FC<UserRegistrationProps> = ({ onRegister, initialData }) => {
  // State variables for form data
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    weight: '',
    height: '',
    email: '',
    medicalAuthorization: false,
    selectedDisease: '',
    selectedSpecificDisease: '',
    diagnosisDate: '',
    hasTreatment: false,
    treatmentStartDate: '',
    selectedTreatments: [] as string[],
    selectedSideEffects: [] as string[],
  });

  const [physicalProfileAnswers, setPhysicalProfileAnswers] = useState<Record<number, boolean>>({});

  // Effect to initialize form data if initialData is provided
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        birthDate: initialData.birthDate,
        weight: initialData.weight.toString(),
        height: initialData.height.toString(),
        email: initialData.email,
        medicalAuthorization: initialData.medicalAuthorization,
        selectedDisease: initialData.disease?.general || '',
        selectedSpecificDisease: initialData.disease?.specific || '',
        diagnosisDate: initialData.disease?.diagnosisDate || '',
        hasTreatment: initialData.disease?.hasTreatment || false,
        treatmentStartDate: initialData.disease?.treatmentStartDate || '',
        selectedTreatments: initialData.disease?.treatments || [],
        selectedSideEffects: initialData.disease?.sideEffects || [],
      });
      setPhysicalProfileAnswers(initialData.physicalProfile);
    }
  }, [initialData]);

  // Handle form submission
  const handleSubmit = () => {
    const userData: Omit<User, 'id'> = {
      name: formData.name,
      birthDate: formData.birthDate,
      weight: Number(formData.weight),
      height: Number(formData.height),
      email: formData.email,
      medicalAuthorization: formData.medicalAuthorization,
      physicalProfile: physicalProfileAnswers,
    };

    if (formData.selectedDisease && formData.selectedSpecificDisease) {
      userData.disease = {
        general: formData.selectedDisease,
        specific: formData.selectedSpecificDisease,
        diagnosisDate: formData.diagnosisDate,
        hasTreatment: formData.hasTreatment,
        treatmentStartDate: formData.treatmentStartDate,
        treatments: formData.selectedTreatments,
        sideEffects: formData.selectedSideEffects,
      };
    }

    onRegister(userData);
  };

  // Handle input changes
  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#3f3222] mb-6">Datos Generales</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[#dabf94] mb-2">Nombre y Apellidos</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
            />
          </div>
          <div>
            <label className="block text-[#dabf94] mb-2">Fecha de nacimiento</label>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => handleInputChange('birthDate', e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
            />
          </div>
          <div>
            <label className="block text-[#dabf94] mb-2">Peso aprox (kg)</label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => handleInputChange('weight', e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
            />
          </div>
          <div>
            <label className="block text-[#dabf94] mb-2">Talla aprox (cm)</label>
            <input
              type="number"
              value={formData.height}
              onChange={(e) => handleInputChange('height', e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
            />
          </div>
          <div>
            <label className="block text-[#dabf94] mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#3f3222] mb-6">Autorización médica</h2>
        <MedicalAuthorization />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#3f3222] mb-6">Patologías</h2>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-[#dabf94] mb-2">Patología General</label>
            <select
              value={formData.selectedDisease}
              onChange={(e) => handleInputChange('selectedDisease', e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
            >
              <option value="">Selecciona una patología</option>
              {Object.keys(diseases).map((disease) => (
                <option key={disease} value={disease}>
                  {disease}
                </option>
              ))}
            </select>
          </div>

          {formData.selectedDisease && (
            <div>
              <label className="block text-[#dabf94] mb-2">Patología Específica</label>
              <select
                value={formData.selectedSpecificDisease}
                onChange={(e) => handleInputChange('selectedSpecificDisease', e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
              >
                <option value="">Selecciona una patología específica</option>
                {diseases[formData.selectedDisease].map((disease) => (
                  <option key={disease} value={disease}>
                    {disease}
                  </option>
                ))}
              </select>
            </div>
          )}

          {formData.selectedSpecificDisease && (
            <>
              <div>
                <label className="block text-[#dabf94] mb-2">Fecha de Diagnóstico</label>
                <input
                  type="date"
                  value={formData.diagnosisDate}
                  onChange={(e) => handleInputChange('diagnosisDate', e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
                />
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-bold text-[#3f3222] mb-4">Tratamiento</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#dabf94] mb-2">
                      ¿Recibes o has recibido tratamiento para esta patología?
                    </label>
                    <div className="space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="treatment"
                          checked={formData.hasTreatment}
                          onChange={() => handleInputChange('hasTreatment', true)}
                          className="form-radio"
                        />
                        <span className="ml-2 text-[#a1a48f]">Sí</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="treatment"
                          checked={!formData.hasTreatment}
                          onChange={() => handleInputChange('hasTreatment', false)}
                          className="form-radio"
                        />
                        <span className="ml-2 text-[#a1a48f]">No</span>
                      </label>
                    </div>
                  </div>

                  {formData.hasTreatment && (
                    <>
                      <div>
                        <label className="block text-[#dabf94] mb-2">
                          ¿Cuándo comenzaste con el tratamiento?
                        </label>
                        <input
                          type="month"
                          value={formData.treatmentStartDate}
                          onChange={(e) => handleInputChange('treatmentStartDate', e.target.value)}
                          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b47]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#dabf94] mb-2">¿Qué tratamiento recibes?</label>
                        <div className="space-y-2">
                          {treatments[formData.selectedSpecificDisease]?.map((treatment) => (
                            <label key={treatment} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={formData.selectedTreatments.includes(treatment)}
                                onChange={(e) => {
                                  const newTreatments = e.target.checked
                                    ? [...formData.selectedTreatments, treatment]
                                    : formData.selectedTreatments.filter((t) => t !== treatment);
                                  handleInputChange('selectedTreatments', newTreatments);
                                }}
                                className="form-checkbox"
                              />
                              <span className="ml-2 text-[#a1a48f]">{treatment}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-bold text-[#3f3222] mb-4">Efectos Secundarios</h3>
                <div>
                  <label className="block text-[#dabf94] mb-2">
                    Indica qué efectos secundarios tienes derivados de la enfermedad o del tratamiento
                  </label>
                  <div className="space-y-2">
                    {sideEffects[formData.selectedSpecificDisease]?.map((effect) => (
                      <label key={effect} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.selectedSideEffects.includes(effect)}
                          onChange={(e) => {
                            const newEffects = e.target.checked
                              ? [...formData.selectedSideEffects, effect]
                              : formData.selectedSideEffects.filter((se) => se !== effect);
                            handleInputChange('selectedSideEffects', newEffects);
                          }}
                          className="form-checkbox"
                        />
                        <span className="ml-2 text-[#a1a48f]">{effect}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
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
    </div>
  );
};

export default UserRegistration;