import React, { useState } from 'react';
import { Leaf, Users, Calendar, Home, MessageCircle, FileCheck, UserSquare2 } from 'lucide-react';
import Sidebar from './components/Sidebar';
import UserRegistration from './components/UserRegistration';
import RegisteredUsers from './components/RegisteredUsers';
import { User } from './types/user';

function App() {
  const [activeTab, setActiveTab] = useState('register');
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const menuItems = [
    { id: 'register', label: 'Dar de alta a un usuario', icon: Users },
    { id: 'registered-users', label: 'Usuarios Registrados', icon: UserSquare2 },
    { id: 'planning', label: 'Planificaciones', icon: Calendar },
    { id: 'home-training', label: 'Entrena en casa', icon: Home },
    { id: 'evaluate', label: 'Evaluar', icon: FileCheck },
    { id: 'forum', label: 'Foro', icon: MessageCircle },
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

  return (
    <div className="flex min-h-screen bg-[#f5f5f0]">
      <Sidebar menuItems={menuItems} activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8">
        <div className="mb-8 flex items-center">
          <Leaf className="h-8 w-8 text-[#5a6b47] mr-3" />
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