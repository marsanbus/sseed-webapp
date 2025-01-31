import React, { useState, useEffect } from 'react';
import { Users, MessageCircle, UserSquare2, CopyPlus, Power } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Trainers from './components/Trainers';
import UserRegistration from './components/UserRegistration';
import RegisteredUsers from './components/RegisteredUsers';
import InstitutionRegistration from './components/InstitutionRegistration';
import { User } from './types/user';
import logo from './assets/Logotipo_Vertical_Transparente.png';

function App() {
  // State variables
  const [activeTab, setActiveTab] = useState('register');
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Menu items for the sidebar
  const menuItems = [
    { id: 'trainers', label: 'Entrenadores', icon: Users },
    { id: 'register', label: 'Registro de Usuario', icon: CopyPlus },
    { id: 'registered-users', label: 'Usuarios Registrados', icon: UserSquare2 },
    { id: 'forum', label: 'Foro', icon: MessageCircle },
    { id: 'close-session', label: 'Cerrar Sesión', icon: Power },
  ];

  // Handle user registration or update
  const handleRegisterUser = (userData: Omit<User, 'id'>) => {
    if (editingUser) {
      // Update existing user
      const updatedUser = { ...userData, id: editingUser.id };
      setUsers(users.map(user => user.id === editingUser.id ? updatedUser : user));
      setEditingUser(null); // Clear the editing state
    } else {
      // Add new user
      const newUser = { ...userData, id: crypto.randomUUID() };
      setUsers([...users, newUser]);
    }
    setActiveTab('registered-users'); // Navigate to the registered users tab
  };

  // Handle user editing
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setActiveTab('register'); // Navigate to the registration tab to edit the user
  };

  // Handle user deletion
  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId)); // Remove the user
  };

  // Handle login
  const handleLogin = (username: string, password: string) => {
    // Add your authentication logic here
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
      setActiveTab('registered-users');
    } else {
      alert('Invalid credentials');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
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
      // Add cases for other tabs
      default:
        return <div>Foro</div>;
    }
  };

  // Effect to handle logout when the active tab is 'close-session'
  useEffect(() => {
    if (activeTab === 'close-session') {
      handleLogout();
    }
  }, [activeTab]);

  // Render the login page if not authenticated
  if (!isAuthenticated) {
    return <InstitutionRegistration onLogin={handleLogin} />;
  }

  // Render the main application
  return (
    <div className="flex min-h-screen bg-[#f5f5f0]">
      <Sidebar menuItems={menuItems} activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8 flex items-center justify-start">
          <div className="flex items-center">
            <img src={logo} alt="SSEED Logo" className="h-8 w-8 mr-3" />
            <h1 className="text-3xl font-bold text-[#3f3222]">SSEED</h1>
          </div>
        </div>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;