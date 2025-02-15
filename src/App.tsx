import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Users, MessageCircle, UserSquare2, CopyPlus, Power } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Trainers from './components/Trainers';
import UserRegistration from './components/UserRegistration';
import RegisteredUsers from './components/RegisteredUsers';
import InstitutionRegistration from './components/InstitutionRegistration';
import Evaluacion from './components/Evaluacion';
import Entrenamiento from './components/EntrenamientoModal';
import { User } from './types/user';
import logo from './assets/Logotipo_Vertical_Transparente.png';

function App() {
  const [activeTab, setActiveTab] = useState('register');
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<{ nombre: string; apellidos: string; role: string } | null>(null);

  const getMenuItems = () => {
    const baseMenuItems = [
      { id: 'register', label: 'Registro de Usuario', icon: CopyPlus },
      { id: 'registered-users', label: 'Usuarios Registrados', icon: UserSquare2 },
      { id: 'forum', label: 'Foro', icon: MessageCircle },
      { id: 'close-session', label: 'Cerrar Sesión', icon: Power },
    ];

    if (authenticatedUser?.role === 'admin') {
      return [{ id: 'trainers', label: 'Profesionales', icon: Users }, ...baseMenuItems];
    }

    return baseMenuItems;
  };

  const handleRegisterUser = (userData: Omit<User, 'id'>) => {
    if (editingUser) {
      const updatedUser = { ...userData, id: editingUser.id };
      setUsers(users.map(user => user.id === editingUser.id ? updatedUser : user));
      setEditingUser(null);
    } else {
      const newUser = { ...userData, id: crypto.randomUUID() };
      setUsers([...users, newUser]);
    }
    setActiveTab('registered-users');
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setActiveTab('register');
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleLogin = async (correo: string, password: string) => {
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
        setIsAuthenticated(true);
        setAuthenticatedUser({
          nombre: data.user.nombre,
          apellidos: data.user.apellidos,
          role: data.user.role,
        });
        setActiveTab('registered-users');
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error de red. Inténtalo de nuevo más tarde.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthenticatedUser(null);
    setActiveTab('register');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'trainers':
        return <Trainers />;
      case 'register':
        return <UserRegistration onRegister={handleRegisterUser} initialData={editingUser} />;
      case 'registered-users':
        return <RegisteredUsers users={users} onEditUser={handleEditUser} onDeleteUser={handleDeleteUser} />;
      default:
        return <div>Foro</div>;
    }
  };

  useEffect(() => {
    if (activeTab === 'close-session') {
      handleLogout();
    }
  }, [activeTab]);

  if (!isAuthenticated) {
    return <InstitutionRegistration onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-[#f5f5f0]">
        <Sidebar menuItems={getMenuItems()} activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 ml-64 p-8">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center">
              <img src={logo} alt="SSEED Logo" className="h-8 w-8 mr-3" />
              <h1 className="text-3xl font-bold text-[#3f3222]">SSEED</h1>
            </div>
            {authenticatedUser && (
              <div className="flex items-center">
                <span className="text-[#3f3222] font-semibold">
                  {authenticatedUser.nombre} {authenticatedUser.apellidos}
                </span>
              </div>
            )}
          </div>
          {renderContent()}
        </main>
      </div>
    </Router>
  );
}

export default App;