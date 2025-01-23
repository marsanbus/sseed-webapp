import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarProps {
  menuItems: MenuItem[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems, activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <nav>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center p-3 mb-2 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-[#5a6b47] text-white'
                    : 'text-[#a1a48f] hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span className="font-arial">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;