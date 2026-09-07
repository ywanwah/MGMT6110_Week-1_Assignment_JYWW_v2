import React, { useState } from 'react';
import { ClientProfile } from '../../types';

interface RefinanceModalProps {
  client: ClientProfile;
  isOpen: boolean;
  onClose: () => void;
  onSubmitProposal: () => void;
}

export const RefinanceModal: React.FC<RefinanceModalProps> = ({
  client,
  isOpen,
  onClose,
  onSubmitProposal,
}) => {
  const [loanAmount, setLoanAmount] = useState<number>(3250000);
  const [targetSpread, setTargetSpread] = useState<number>(1.10);
  const [hedgeOption, setHedgeOption] = useState<string>('3Y SOFR Cap Collar (4.15%)');
  const [rollAmount, setRollAmount] = useState<number>(1500000);

  if (!isOpen) return null;

  const currentAnnualInterest = (loanAmount * 0.0545); // Current baseline
  const proposedAnnualInterest = (loanAmount * (0.0435 + targetSpread / 100));
  const estimatedSavings = Math.max(0, currentAnnualInterest - proposedAnnualInterest);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-xl bg-dbs-card border border-dbs-border p-5 shadow-2xl space-y-4 text-white">
        <div className="flex items-center justify-between pb-2 border-b border-dbs-border">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-dbs-gold-bg flex items-center justify-center text-dbs-gold">
              <span className="material-symbols-outlined text-[18px]">real_estate_agent</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[14px] font-bold font-display">Tribeca Mortgage Refinance & Lombard Roll</h3>
                <span className="px-1.5 py-0.2 rounded bg-dbs-gold-bg text-dbs-gold text-[9px] font-bold">
                  In 6 Months
                </span>
              </div>
              <p className="text-[11px] text-dbs-text-muted">
                {client.name} • 30Y Custom Super-Jumbo
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

        {/* Refi Structuring Inputs */}
        <div className="space-y-3 text-[11.5px]">
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-2.5 rounded-lg bg-dbs-card-lowest border border-dbs-border/60">
              <span className="text-[10px] text-dbs-text-dim block uppercase">Refinance Facility</span>
              <span className="text-base font-bold text-white font-mono mt-0.5">
                ${loanAmount.toLocaleString()}
              </span>
              <span className="text-[9.5px] text-dbs-text-muted">1st Charge Lien Collateral</span>
            </div>
            <div className="p-2.5 rounded-lg bg-dbs-card-lowest border border-dbs-border/60">
              <span className="text-[10px] text-dbs-text-dim block uppercase">Estimated Client Savings</span>
              <span className="text-base font-bold text-dbs-green font-mono mt-0.5">
                +${Math.round(estimatedSavings).toLocaleString()}/yr
              </span>
              <span className="text-[9.5px] text-dbs-green">+140 bps RM Revenue Uplift</span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10.5px] font-semibold text-dbs-text-muted uppercase tracking-wider flex justify-between">
              <span>Proposed Loan Margin over SOFR: {targetSpread.toFixed(2)}%</span>
              <span className="text-dbs-gold font-mono">Benchmark: 1.10%</span>
            </label>
            <input
              type="range"
              min="0.80"
              max="1.60"
              step="0.05"
              value={targetSpread}
              onChange={(e) => setTargetSpread(parseFloat(e.target.value))}
              className="w-full accent-dbs-gold cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10.5px] font-semibold text-dbs-text-muted uppercase tracking-wider">
              Cash Roll into Syndicated Lombard Pool
            </label>
            <div className="flex gap-2 items-center">
              <button
                type="button"
                onClick={() => setRollAmount(1000000)}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                  rollAmount === 1000000
                    ? 'bg-dbs-gold text-black font-bold'
                    : 'bg-dbs-card-sub text-dbs-text-muted border border-dbs-border'
                }`}
              >
                $1.00M
              </button>
              <button
                type="button"
                onClick={() => setRollAmount(1500000)}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                  rollAmount === 1500000
                    ? 'bg-dbs-gold text-black font-bold'
                    : 'bg-dbs-card-sub text-dbs-text-muted border border-dbs-border'
                }`}
              >
                $1.50M (Rec.)
              </button>
              <button
                type="button"
                onClick={() => setRollAmount(2180000)}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                  rollAmount === 2180000
                    ? 'bg-dbs-gold text-black font-bold'
                    : 'bg-dbs-card-sub text-dbs-text-muted border border-dbs-border'
                }`}
              >
                $2.18M (Full)
              </button>
            </div>
            <p className="text-[10px] text-dbs-text-dim mt-0.5">
              Rolls unpledged cash from 4.85% deposit into MBAI Structured Green tranche yielding 9.8% target.
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-[10.5px] font-semibold text-dbs-text-muted uppercase tracking-wider">
              Interest Rate Collar Hedging Strategy
            </label>
            <select
              value={hedgeOption}
              onChange={(e) => setHedgeOption(e.target.value)}
              className="w-full bg-dbs-card-lowest border border-dbs-border rounded-lg p-2 text-[11.5px] text-white focus:border-dbs-gold focus:outline-none"
            >
              <option value="3Y SOFR Cap Collar (4.15%)">3Y SOFR Cap Collar (Ceiling 4.15%)</option>
              <option value="5Y Fixed-to-Floating Swaption">5Y Fixed-to-Floating Swaption</option>
              <option value="Unhedged Floating Spread (Max Flexibility)">Unhedged Floating Spread (Max Flexibility)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-dbs-border">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-dbs-text-muted hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSubmitProposal();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-dbs-gold hover:bg-amber-600 text-black text-[12px] font-bold flex items-center gap-1.5 shadow-md shadow-dbs-gold/20 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">file_download_done</span>
            Submit Term Sheet for Credit Committee
          </button>
        </div>
      </div>
    </div>
  );
};
