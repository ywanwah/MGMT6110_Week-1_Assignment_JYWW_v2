import React, { useState } from 'react';
import { ClientProfile } from '../../types';

interface CallNoteModalProps {
  client: ClientProfile;
  isOpen: boolean;
  onClose: () => void;
  onSaveNote: (note: string, category: string) => void;
}

export const CallNoteModal: React.FC<CallNoteModalProps> = ({
  client,
  isOpen,
  onClose,
  onSaveNote,
}) => {
  const [channel, setChannel] = useState<'Call' | 'In-Person' | 'Zoom' | 'Secure Comms'>('Call');
  const [category, setCategory] = useState<string>('Lending & Margin');
  const [noteContent, setNoteContent] = useState<string>(
    'Client discussed Tribeca mortgage refinance timing. Expressed interest in rolling $1.5M unpledged liquidity into high-yield structured green tranche. Counter-pitch against Morgan Stanley secondary facility requested by end of week.'
  );

  if (!isOpen) return null;

  const handleSave = () => {
    if (!noteContent.trim()) return;
    onSaveNote(noteContent, `${channel} - ${category}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-xl bg-dbs-card border border-dbs-border p-5 shadow-2xl space-y-4 text-white">
        <div className="flex items-center justify-between pb-2 border-b border-dbs-border">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-dbs-red-light flex items-center justify-center text-dbs-red">
              <span className="material-symbols-outlined text-[18px]">edit_note</span>
            </div>
            <div>
              <h3 className="text-[14px] font-bold font-display">Log RM Interaction Note</h3>
              <p className="text-[11px] text-dbs-text-muted">
                {client.name} • {client.cif}
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

        {/* Interaction Channel Pills */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-dbs-text-muted uppercase tracking-wider">
            Touchpoint Channel
          </label>
          <div className="flex flex-wrap gap-1.5">
            {(['Call', 'In-Person', 'Zoom', 'Secure Comms'] as const).map((ch) => (
              <button
                key={ch}
                type="button"
                onClick={() => setChannel(ch)}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                  channel === ch
                    ? 'bg-dbs-red text-white shadow-sm'
                    : 'bg-dbs-card-sub text-dbs-text-muted hover:text-white border border-dbs-border'
                }`}
              >
                {ch}
              </button>
            ))}
          </div>
        </div>

        {/* Category Selection */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-dbs-text-muted uppercase tracking-wider">
            Advisory Topic
          </label>
          <div className="flex flex-wrap gap-1.5">
            {[
              'Lending & Margin',
              'Competitor Displacement',
              'Mortgage Refi',
              'Wealth Mandate',
              'KYC / Periodic Review',
            ].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-2.5 py-1 rounded-md text-[10.5px] font-medium transition-all ${
                  category === cat
                    ? 'bg-dbs-card-sub text-white border border-dbs-red'
                    : 'bg-dbs-card-lowest text-dbs-text-dim border border-dbs-border hover:text-dbs-text-muted'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Note Area */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-dbs-text-muted uppercase tracking-wider flex justify-between">
            <span>Confidential Audit Note</span>
            <span className="text-dbs-green text-[10px] font-mono">DBS Vault Encrypted</span>
          </label>
          <textarea
            rows={4}
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            className="w-full bg-dbs-card-lowest border border-dbs-border rounded-lg p-3 text-[12px] text-white leading-relaxed focus:outline-none focus:border-dbs-red transition-colors"
            placeholder="Record discussion outcomes, client sentiment, and follow-up deliverables..."
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-dbs-border">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg text-[12px] font-medium text-dbs-text-muted hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-1.5 rounded-lg bg-dbs-red hover:bg-dbs-red-hover text-white text-[12px] font-semibold flex items-center gap-1.5 shadow-md shadow-dbs-red/20 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">save</span>
            Commit to CRM Audit Log
          </button>
        </div>
      </div>
    </div>
  );
};
