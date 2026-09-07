import React from 'react';
import { RM_PROFILE } from '../data/mockData';
import { ClientProfile } from '../types';

interface HeaderProps {
  currentClient: ClientProfile;
  onOpenClientSwitcher: () => void;
  onOpenNotification: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentClient,
  onOpenClientSwitcher,
  onOpenNotification,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#0B111E]/90 backdrop-blur-xl border-b border-dbs-border pt-safe">
      <div className="h-14 px-3 sm:px-4 max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* AI Branding / Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* AI Iconic Geometric Red Spark / Diamond Symbol */}
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-dbs-red to-[#B31400] flex items-center justify-center shadow-lg shadow-dbs-red/25 relative overflow-hidden">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2L2 12l10 10 10-10L12 2zm0 3.83L18.17 12 12 18.17 5.83 12 12 5.83z"
                fillOpacity="0.3"
              />
              <polygon points="12,5.5 18.5,12 12,18.5 5.5,12" />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[15px] tracking-tight text-white font-display">
                AI
              </span>
              <span className="text-[11px] font-semibold text-dbs-red uppercase tracking-wider bg-dbs-red-light px-1.5 py-0.2 rounded">
                Treasures
              </span>
            </div>
            <span className="text-[9.5px] font-medium text-dbs-text-muted tracking-tight">
              Private Client RM Portal
            </span>
          </div>
        </div>

        {/* Active Client / Bank Switcher Dropdown Button */}
        <button
          onClick={onOpenClientSwitcher}
          className="h-9 px-2.5 flex items-center gap-1.5 bg-dbs-card border border-dbs-border rounded-full hover:border-dbs-border-light transition-all active:scale-95 cursor-pointer shadow-sm group"
          type="button"
          id="btn-client-switcher"
          title="Switch Active Client or Bank Entity"
        >
          <span className="w-2 h-2 rounded-full bg-dbs-green shadow-[0_0_6px_rgba(16,185,129,0.8)] shrink-0"></span>
          <div className="flex flex-col text-left max-w-[120px] sm:max-w-[180px] truncate">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[13.5px] tracking-tight text-white font-display truncate">
                {currentClient.name.split(' ')[0]}
              </span>
              <span className="text-[10px] font-semibold text-dbs-red uppercase tracking-wider bg-dbs-red-light px-1 py-0.2 rounded shrink-0">
                MBAI
              </span>
            </div>
            <span className="text-[9px] font-medium text-dbs-text-muted tracking-tight truncate">
              {currentClient.tier}
            </span>
          </div>
          <span className="material-symbols-outlined text-dbs-text-dim text-[16px] group-hover:text-white transition-colors">
            unfold_more
          </span>
        </button>

        {/* RM Profile Photo with Notification Dot */}
        <div className="relative flex items-center shrink-0">
          <button
            onClick={onOpenNotification}
            className="relative p-0.5 rounded-full ring-1 ring-dbs-border hover:ring-dbs-border-light transition-all cursor-pointer group"
            title={`RM: ${RM_PROFILE.name} (${RM_PROFILE.title})`}
            id="btn-rm-profile"
            type="button"
          >
            <img
              alt="RM Avatar"
              className="w-8 h-8 rounded-full object-cover group-hover:brightness-110 transition-all"
              src={RM_PROFILE.avatarUrl}
            />
            {RM_PROFILE.hasNotification && (
              <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-dbs-red ring-2 ring-dbs-bg shadow-[0_0_6px_rgba(225,25,0,0.8)]"></span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
