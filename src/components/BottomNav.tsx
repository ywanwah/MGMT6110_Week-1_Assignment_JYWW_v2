import React from 'react';
import { NavigationTab } from '../types';

interface BottomNavProps {
  activeTab: NavigationTab;
  onChangeTab: (tab: NavigationTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  const tabs: Array<{ id: NavigationTab; label: string; icon: string }> = [
    { id: 'client360', label: 'Client 360', icon: 'account_circle' },
    { id: 'advisory', label: '5-Yr Advisory', icon: 'trending_up' },
    { id: 'revenue', label: 'RM Revenue', icon: 'monetization_on' },
    { id: 'insights', label: 'Insights', icon: 'analytics' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-[#0B111E]/95 backdrop-blur-xl border-t border-dbs-border">
      <div className="max-w-7xl mx-auto flex justify-around items-center h-15 px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] w-full h-full cursor-pointer transition-colors relative ${
                isActive
                  ? "text-dbs-red font-semibold after:content-[''] after:absolute after:top-0 after:w-8 after:h-0.5 after:bg-dbs-red after:shadow-[0_0_8px_rgba(225,25,0,0.8)] after:rounded-full"
                  : 'text-dbs-text-muted hover:text-white font-medium'
              }`}
              type="button"
              id={`tab-${tab.id}`}
            >
              <span className="material-symbols-outlined text-[20px] mb-0.5">
                {tab.icon}
              </span>
              <span className="text-[10px] tracking-tight truncate max-w-[85px]">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
