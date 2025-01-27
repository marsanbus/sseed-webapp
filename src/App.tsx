import React, { useState, useEffect } from 'react';
import { Users, MessageCircle, UserSquare2, CopyPlus, Power } from 'lucide-react';
import Sidebar from './components/Sidebar';
import UserRegistration from './components/UserRegistration';
import RegisteredUsers from './components/RegisteredUsers';
import InstitutionRegistration from './components/InstitutionRegistration';
import { User } from './types/user';
import logo from './assets/Logotipo_Vertical_Transparente.png';

function App() {
  const [activeTab, setActiveTab] = useState('register');
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const menuItems = [
    { id: 'trainers', label: 'Entrenadores', icon: Users },
    { id: 'register', label: 'Registro de Usuario', icon: CopyPlus },
    { id: 'registered-users', label: 'Usuarios Registrados', icon: UserSquare2 },
    { id: 'forum', label: 'Foro', icon: MessageCircle },
    { id: 'close-session', label: 'Cerrar Sesión', icon: Power },
  ];

  const handleRegisterUser = (userData: Omit<User, 'id'>) => {
    const newUser = {
      ...userData,
      id: crypto.randomUUID(),
    };
    setUsers([...users, newUser]);
    setActiveTab('registered-users');
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setActiveTab('register');
  };

  const handleLogin = (username: string, password: string) => {
    // Add your authentication logic here
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
      setActiveTab('registered-users');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('register');
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
    <div className="flex min-h-screen bg-[#f5f5f0]">
      <Sidebar menuItems={menuItems} activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8">
        <div className="mb-8 flex items-center">
          <img src={logo} alt="SSEED Logo" className="h-8 w-8 mr-3" />
          <h1 className="text-3xl font-bold text-[#3f3222]">SSEED</h1>
        </div>
        {activeTab === 'register' && (
          <UserRegistration 
            onRegister={handleRegisterUser}
            initialData={editingUser}
          />
        )}
        {activeTab === 'registered-users' && (
          <RegisteredUsers 
            users={users}
            onEditUser={handleEditUser}
          />
        )}
      </main>
    </div>
  );
}

export default App;