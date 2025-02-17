import React, { useState } from 'react';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

const InstitutionRegistration: React.FC<LoginProps> = ({ onLogin }) => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/trainers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, password }),
      });

      const data = await response.json();

      if (data.success) {
        onLogin(correo, password); // Llama a la función onLogin con las credenciales correctas
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setError('Error de red. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className="login-container bg-cover bg-center min-h-screen flex items-center justify-center" style={{ backgroundImage: 'url(/path/to/your/background-image.jpg)' }}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-[#3f3222]">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="correo" className="block text-sm font-medium text-[#3f3222]">Correo:</label>
            <input
              type="email"
              id="correo"
              autoFocus
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5a6b47] focus:border-[#5a6b47] sm:text-sm"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-[#3f3222]">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5a6b47] focus:border-[#5a6b47] sm:text-sm"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button type="submit" className="w-full bg-[#5a6b47] text-white py-2 px-4 rounded-lg hover:bg-opacity-80 transition-colors">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default InstitutionRegistration;