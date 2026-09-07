import React, { useState } from 'react';
import { CompetitorThreat, ClientProfile } from '../../types';

interface CounterPitchModalProps {
  competitor: CompetitorThreat | null;
  client: ClientProfile;
  isOpen: boolean;
  onClose: () => void;
  onDispatchDeck: (target: string) => void;
}

export const CounterPitchModal: React.FC<CounterPitchModalProps> = ({
  competitor,
  client,
  isOpen,
  onClose,
  onDispatchDeck,
}) => {
  const [recipient, setRecipient] = useState<string>(client.name);
  const [deckType, setDeckType] = useState<'Executive 1-Pager' | 'Deep-Dive Structuring'>('Executive 1-Pager');

  if (!isOpen || !competitor) return null;

  const handleDispatch = () => {
    onDispatchDeck(competitor.institution);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl bg-dbs-card border border-dbs-border p-5 shadow-2xl space-y-4 text-white">
        <div className="flex items-center justify-between pb-2 border-b border-dbs-border">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-dbs-red-light flex items-center justify-center text-dbs-red">
              <span className="material-symbols-outlined text-[18px]">swords</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[14px] font-bold font-display">
                  Counter-Pitch Deck Generator
                </h3>
                <span className="px-1.5 py-0.2 rounded bg-dbs-red-light text-dbs-red text-[9.5px] font-bold border border-dbs-red/20">
                  Target: {competitor.institution}
                </span>
              </div>
              <p className="text-[11px] text-dbs-text-muted">
                AI MBAI Private Client Displacement Strategy • Prepared for {client.name}
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

        {/* Competitor Intel Summary */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-lg bg-dbs-card-lowest border border-dbs-border/60">
            <span className="text-[9.5px] text-dbs-text-dim block">Target Wallet Capture</span>
            <span className="text-[15px] font-bold text-white font-display mt-0.5">
              {competitor.estWallet}
            </span>
            <span className="text-[10px] text-dbs-red block">{competitor.walletShare} of liquid wallet</span>
          </div>
          <div className="p-2.5 rounded-lg bg-dbs-card-lowest border border-dbs-border/60">
            <span className="text-[9.5px] text-dbs-text-dim block">MBAI Advantage Wedge</span>
            <span className="text-[15px] font-bold text-dbs-green font-display mt-0.5">
              {competitor.advantageRate || 'Lower Spread & Zero Custody'}
            </span>
            <span className="text-[10px] text-dbs-green block">+$42,000/yr net client savings</span>
          </div>
        </div>

        {/* Head-to-Head Comparative Matrix */}
        <div className="rounded-lg bg-dbs-card-sub border border-dbs-border/70 overflow-hidden text-[11px]">
          <div className="bg-dbs-card-lowest/90 px-3 py-2 border-b border-dbs-border flex justify-between font-bold">
            <span className="text-dbs-text-muted">Feature Dimension</span>
            <span className="text-dbs-text-dim text-center w-36">Competitor ({competitor.institution.split(' ')[0]})</span>
            <span className="text-dbs-green text-right w-40">MBAI / AI Treasures</span>
          </div>

          <div className="divide-y divide-dbs-border/40">
            <div className="px-3 py-2 flex justify-between items-center">
              <span className="text-dbs-text-muted">Borrowing Rate (Lombard)</span>
              <span className="text-dbs-text-dim text-center w-36 font-mono">SOFR + 1.65%</span>
              <span className="text-dbs-green font-bold text-right w-40 font-mono">SOFR + 1.10% (55 bps lower)</span>
            </div>
            <div className="px-3 py-2 flex justify-between items-center">
              <span className="text-dbs-text-muted">Custody & Admin Fee</span>
              <span className="text-dbs-text-dim text-center w-36 font-mono">15 bps p.a.</span>
              <span className="text-dbs-green font-bold text-right w-40 font-mono">0 bps (Full Waiver)</span>
            </div>
            <div className="px-3 py-2 flex justify-between items-center">
              <span className="text-dbs-text-muted">Pre-IPO Secondary Access</span>
              <span className="text-dbs-text-dim text-center w-36">Limited US syndicate</span>
              <span className="text-dbs-green font-bold text-right w-40">Dual Asian/US Block Cross</span>
            </div>
            <div className="px-3 py-2 flex justify-between items-center">
              <span className="text-dbs-text-muted">Multi-Asset Pledge Collateral</span>
              <span className="text-dbs-text-dim text-center w-36">US Assets Only</span>
              <span className="text-dbs-green font-bold text-right w-40">Tribeca + SGP + FX Equities</span>
            </div>
          </div>
        </div>

        {/* Narrative Talking Points */}
        <div className="p-3 rounded-lg bg-dbs-card-lowest border border-dbs-border/60 text-[11px] space-y-2">
          <div className="flex items-center space-x-1.5 text-dbs-gold font-bold uppercase tracking-wider text-[10px]">
            <span className="material-symbols-outlined text-[14px]">psychology</span>
            <span>Recommended RM Delivery Script</span>
          </div>
          <p className="text-dbs-text-muted leading-relaxed">
            &ldquo;Alexander, by consolidating your facility with MBAI rather than {competitor.institution}, you preserve unified collateral flexibility across your Tribeca property and your Asian holdings, saving approximately 55 bps in annual borrowing drag while avoiding a 15 bps custody friction on your secondary proceeds.&rdquo;
          </p>
        </div>

        {/* Deck Configuration */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-dbs-border">
          <div className="flex items-center gap-1.5">
            {(['Executive 1-Pager', 'Deep-Dive Structuring'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setDeckType(t)}
                className={`px-2.5 py-1 rounded text-[10.5px] font-semibold transition-colors ${
                  deckType === t
                    ? 'bg-dbs-card-sub text-white border border-dbs-red'
                    : 'text-dbs-text-dim hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-dbs-text-muted hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDispatch}
              className="px-4 py-1.5 rounded-lg bg-dbs-red hover:bg-dbs-red-hover text-white text-[12px] font-semibold flex items-center gap-1.5 shadow-md shadow-dbs-red/25 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">send</span>
              Generate & Send Proposal Deck
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
