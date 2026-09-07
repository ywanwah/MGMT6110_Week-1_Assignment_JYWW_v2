import React from 'react';
import { ALTERNATIVE_CLIENTS } from '../../data/mockData';
import { ClientProfile } from '../../types';

interface ClientSwitcherModalProps {
  currentClientId: string;
  isOpen: boolean;
  onClose: () => void;
  onSelectClient: (client: ClientProfile) => void;
}

export const ClientSwitcherModal: React.FC<ClientSwitcherModalProps> = ({
  currentClientId,
  isOpen,
  onClose,
  onSelectClient,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-xl bg-dbs-card border border-dbs-border p-5 shadow-2xl space-y-4 text-white">
        <div className="flex items-center justify-between pb-2 border-b border-dbs-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-dbs-card-sub flex items-center justify-center text-dbs-red">
              <span className="material-symbols-outlined text-[20px]">groups</span>
            </div>
            <div>
              <h3 className="text-[14px] font-bold font-display">Select Ultra-High-Net-Worth Book</h3>
              <p className="text-[11px] text-dbs-text-muted">Private Client Relationship Manager Desk</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-dbs-text-muted hover:text-white p-1 rounded-md transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="space-y-2">
          {ALTERNATIVE_CLIENTS.map((client) => {
            const isSelected = client.id === currentClientId;
            return (
              <button
                key={client.id}
                type="button"
                onClick={() => {
                  onSelectClient(client);
                  onClose();
                }}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-dbs-card-sub border-dbs-red ring-1 ring-dbs-red/40'
                    : 'bg-dbs-card-lowest/80 border-dbs-border/70 hover:border-dbs-border-light hover:bg-dbs-card-sub/60'
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <img
                    src={client.avatarUrl}
                    alt={client.name}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-dbs-border shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center space-x-1.5">
                      <h4 className="text-[13px] font-bold text-white truncate font-display">
                        {client.name}
                      </h4>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-dbs-green"></span>
                      )}
                    </div>
                    <p className="text-[10.5px] text-dbs-text-muted truncate">
                      {client.role}
                    </p>
                    <span className="text-[9.5px] text-dbs-red font-mono">{client.tier}</span>
                  </div>
                </div>

                <div className="text-right shrink-0 ml-2">
                  <span className="text-[13px] font-bold text-white font-mono block">
                    {client.balance.trvFormatted}
                  </span>
                  <span className="text-[9.5px] text-dbs-green font-medium block">
                    {client.balance.yoyChange}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-1 flex items-center justify-between text-[11px] text-dbs-text-dim border-t border-dbs-border">
          <span>Active Book AUM: $62.45M SGD</span>
          <button
            type="button"
            onClick={onClose}
            className="text-dbs-text-muted hover:text-white transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
