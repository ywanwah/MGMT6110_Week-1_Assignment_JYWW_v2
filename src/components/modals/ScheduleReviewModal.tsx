import React, { useState } from 'react';
import { ClientProfile } from '../../types';

interface ScheduleReviewModalProps {
  client: ClientProfile;
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (date: string, location: string, agenda: string) => void;
}

export const ScheduleReviewModal: React.FC<ScheduleReviewModalProps> = ({
  client,
  isOpen,
  onClose,
  onSchedule,
}) => {
  const [selectedDate, setSelectedDate] = useState('2024-10-15');
  const [selectedTime, setSelectedTime] = useState('14:30');
  const [location, setLocation] = useState('Marina Bay Financial Centre, AI Tower 3 - Private Suite');
  const [agenda, setAgenda] = useState('Annual TRV Review, Mortgage Rollover & Lombard Margin Facility Expansion');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSchedule(`${selectedDate} at ${selectedTime}`, location, agenda);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-xl bg-dbs-card border border-dbs-border p-5 shadow-2xl space-y-4 text-white">
        <div className="flex items-center justify-between pb-2 border-b border-dbs-border">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-dbs-green-bg flex items-center justify-center text-dbs-green">
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            </div>
            <div>
              <h3 className="text-[14px] font-bold font-display">Schedule Client Portfolio Review</h3>
              <p className="text-[11px] text-dbs-text-muted">
                {client.name} • {client.role}
              </p>
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

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <label className="text-[10.5px] font-semibold text-dbs-text-muted uppercase tracking-wider">
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-dbs-card-lowest border border-dbs-border rounded-lg p-2 text-[12px] text-white focus:border-dbs-green focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10.5px] font-semibold text-dbs-text-muted uppercase tracking-wider">
                Time (SGT / Local)
              </label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full bg-dbs-card-lowest border border-dbs-border rounded-lg p-2 text-[12px] text-white focus:border-dbs-green focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10.5px] font-semibold text-dbs-text-muted uppercase tracking-wider">
              Meeting Location / Channel
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-dbs-card-lowest border border-dbs-border rounded-lg p-2 text-[12px] text-white focus:border-dbs-green focus:outline-none"
            >
              <option value="Marina Bay Financial Centre, AI Tower 3 - Private Suite">
                Marina Bay Financial Centre, AI Tower 3 - Private Suite
              </option>
              <option value="Client Tribeca Penthouse Residence, New York">
                Client Tribeca Penthouse Residence, New York
              </option>
              <option value="AI Digibank Encrypted Executive Video Room">
                AI Digibank Encrypted Executive Video Room
              </option>
              <option value="Singapore Island Country Club (SICC) Dining Lounge">
                Singapore Island Country Club (SICC) Dining Lounge
              </option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10.5px] font-semibold text-dbs-text-muted uppercase tracking-wider">
              Advisory Focus & Agenda
            </label>
            <textarea
              rows={3}
              value={agenda}
              onChange={(e) => setAgenda(e.target.value)}
              className="w-full bg-dbs-card-lowest border border-dbs-border rounded-lg p-2.5 text-[11.5px] text-white leading-relaxed focus:border-dbs-green focus:outline-none"
            />
          </div>

          <div className="p-2.5 rounded-lg bg-dbs-card-sub border border-dbs-border/70 flex items-center justify-between text-[11px]">
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-dbs-blue text-[16px]">sync</span>
              <span className="text-dbs-text-muted">Auto-sync with Outlook & Digibank</span>
            </div>
            <span className="text-dbs-green font-medium">Enabled</span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-dbs-border">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg text-[12px] font-medium text-dbs-text-muted hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-dbs-green hover:bg-emerald-600 text-white text-[12px] font-semibold flex items-center gap-1.5 shadow-md shadow-dbs-green/20 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">send</span>
              Dispatch Calendar Invite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
