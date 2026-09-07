import React from 'react';
import { ClientProfile } from '../../types';

interface ExportDossierModalProps {
  client: ClientProfile;
  isOpen: boolean;
  onClose: () => void;
  onExport: () => void;
}

export const ExportDossierModal: React.FC<ExportDossierModalProps> = ({
  client,
  isOpen,
  onClose,
  onExport,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl bg-dbs-card border border-dbs-border p-5 shadow-2xl space-y-4 text-white">
        <div className="flex items-center justify-between pb-2 border-b border-dbs-border">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-dbs-gold-bg flex items-center justify-center text-dbs-gold">
              <span className="material-symbols-outlined text-[18px]">description</span>
            </div>
            <div>
              <h3 className="text-[14px] font-bold font-display">Executive Relationship Dossier</h3>
              <p className="text-[11px] text-dbs-text-muted">
                AI Treasures Private Client • Confidential
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

        {/* Dossier Document Preview Canvas */}
        <div className="rounded-lg bg-dbs-card-lowest border border-dbs-border/80 p-4 space-y-3.5 text-[11.5px] font-mono">
          <div className="flex justify-between items-start border-b border-dbs-border/60 pb-3 font-sans">
            <div>
              <span className="text-[10px] uppercase font-bold text-dbs-red tracking-wider">
                AI Private Client Division
              </span>
              <h4 className="text-base font-bold text-white mt-0.5">{client.name}</h4>
              <span className="text-[11px] text-dbs-text-muted">{client.role} • CIF: {client.cif}</span>
            </div>
            <div className="text-right">
              <span className="px-2 py-0.5 rounded bg-dbs-green-bg text-dbs-green text-[10px] font-bold border border-dbs-green/20">
                Audit Verified
              </span>
              <span className="text-[10px] text-dbs-text-dim block mt-1">Generated: Today</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-sans">
            <div className="p-2 rounded bg-dbs-card-sub border border-dbs-border/40">
              <span className="text-[9.5px] text-dbs-text-dim block">Total Relationship (TRV)</span>
              <span className="text-[13px] font-bold text-white">{client.balance.trvFormatted}</span>
            </div>
            <div className="p-2 rounded bg-dbs-card-sub border border-dbs-border/40">
              <span className="text-[9.5px] text-dbs-text-dim block">Net Bank Position</span>
              <span className="text-[13px] font-bold text-dbs-green">{client.balance.netBankPosition}</span>
            </div>
            <div className="p-2 rounded bg-dbs-card-sub border border-dbs-border/40">
              <span className="text-[9.5px] text-dbs-text-dim block">Credit Drawn</span>
              <span className="text-[13px] font-bold text-dbs-gold">{client.credit.drawnAmount}</span>
            </div>
            <div className="p-2 rounded bg-dbs-card-sub border border-dbs-border/40">
              <span className="text-[9.5px] text-dbs-text-dim block">Weighted LTV</span>
              <span className="text-[13px] font-bold text-dbs-green">{client.credit.collateral.weightedLtv}</span>
            </div>
          </div>

          <div className="space-y-1 font-sans">
            <span className="text-[10px] font-bold text-dbs-text-muted uppercase tracking-wider">
              Asset Allocation & Balance Sheet
            </span>
            <div className="p-2.5 rounded bg-dbs-card-sub text-[11px] space-y-1">
              <div className="flex justify-between text-dbs-text-muted">
                <span>Wealth Management AUM:</span>
                <span className="text-white font-medium">{client.balance.wealthAum} ({client.balance.allocation.wealth}%)</span>
              </div>
              <div className="flex justify-between text-dbs-text-muted">
                <span>Cash & Multi-Currency Deposits:</span>
                <span className="text-white font-medium">{client.balance.allocation.deposits}% (Liquid unpledged: {client.balance.allocation.liquidUnpledged})</span>
              </div>
              <div className="flex justify-between text-dbs-text-muted">
                <span>Real Estate Lien Collateral:</span>
                <span className="text-white font-medium">$5,200,000 Market (Eligible: $3,900,000)</span>
              </div>
              <div className="flex justify-between text-dbs-text-muted">
                <span>Universal Life Fiduciary Policy:</span>
                <span className="text-white font-medium">$10,000,000 Face (Surrender: $1,440,000)</span>
              </div>
            </div>
          </div>

          <div className="space-y-1 font-sans">
            <span className="text-[10px] font-bold text-dbs-text-muted uppercase tracking-wider">
              Compliance & Credit Clearance
            </span>
            <div className="p-2 rounded bg-dbs-card-sub text-[10.5px] text-dbs-text-muted leading-relaxed">
              Account compliant under Monetary Authority of Singapore (MAS) and global cross-border banking guidelines. Zero margin breaches in past 24 months. Revaluation certified by Credit Risk Committee.
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-dbs-border">
          <span className="text-[11px] text-dbs-text-dim">Format: Executive PDF / Dossier Link</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-dbs-text-muted hover:text-white transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={onExport}
              className="px-4 py-1.5 rounded-lg bg-dbs-gold hover:bg-amber-600 text-black text-[12px] font-bold flex items-center gap-1.5 shadow-md shadow-dbs-gold/20 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              Download Dossier Package
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
