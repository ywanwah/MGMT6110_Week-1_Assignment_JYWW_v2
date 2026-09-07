import React, { useState } from 'react';
import { ClientProfile, AdvisoryYearPlan } from '../types';
import { FIVE_YEAR_ADVISORY_ROADMAP } from '../data/mockData';

interface FiveYearAdvisoryViewProps {
  client: ClientProfile;
  onShowToast: (msg: string) => void;
  onOpenRefiModal: () => void;
}

export const FiveYearAdvisoryView: React.FC<FiveYearAdvisoryViewProps> = ({
  client,
  onShowToast,
  onOpenRefiModal,
}) => {
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const [growthRate, setGrowthRate] = useState<number>(8.5);
  const [displacedWallet, setDisplacedWallet] = useState<number>(7.5);
  const [lombardRoll, setLombardRoll] = useState<number>(1.5);

  const activePlan: AdvisoryYearPlan =
    FIVE_YEAR_ADVISORY_ROADMAP.find((p) => p.year === selectedYear) ||
    FIVE_YEAR_ADVISORY_ROADMAP[0];

  // Dynamic 5-year TRV projection model
  const projectedYear5TRV = (
    client.balance.trvUSD * Math.pow(1 + growthRate / 100, 5) +
    displacedWallet * 1000000 +
    lombardRoll * 1000000 * 0.4
  ) / 1000000;

  const totalProjectedFeeUplift = Math.round(
    projectedYear5TRV * 1000000 * 0.0095
  );

  return (
    <div className="flex flex-col w-full px-3 sm:px-4 max-w-7xl mx-auto space-y-3.5 pt-2 pb-6">
      {/* Title & Sovereign Advisory Banner */}
      <section className="relative overflow-hidden rounded-xl bg-dbs-card border border-dbs-border p-4 shadow-xl">
        <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-dbs-red/10 blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-dbs-red animate-pulse"></span>
              <span className="text-[11px] font-bold text-dbs-red uppercase tracking-wider bg-dbs-red-light px-2 py-0.5 rounded border border-dbs-red/20">
                Institutional Wealth Masterplan
              </span>
            </div>
            <span className="text-[11px] text-dbs-text-dim font-mono">
              CIF: {client.cif} • 2024–2029
            </span>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-display">
              5-Year Client Advisory Blueprint
            </h1>
            <p className="text-[12px] text-dbs-text-muted mt-1 leading-relaxed">
              Strategic capital migration, rival wallet displacement, and cross-border trust structuring for{' '}
              <span className="text-white font-semibold">{client.name}</span>.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="p-2.5 rounded-lg bg-dbs-card-sub border border-dbs-border/70">
              <span className="text-[9.5px] font-semibold text-dbs-text-muted uppercase block">
                Current TRV
              </span>
              <span className="text-[15px] font-bold text-white font-display mt-0.5 block">
                {client.balance.trvFormatted}
              </span>
              <span className="text-[9.5px] text-dbs-text-dim">Baseline Base</span>
            </div>
            <div className="p-2.5 rounded-lg bg-dbs-card-sub border border-dbs-border/70">
              <span className="text-[9.5px] font-semibold text-dbs-text-muted uppercase block">
                Target 5-Yr TRV
              </span>
              <span className="text-[15px] font-bold text-dbs-green font-display mt-0.5 block">
                ${projectedYear5TRV.toFixed(1)}M
              </span>
              <span className="text-[9.5px] text-dbs-green">
                +{((projectedYear5TRV / 14.85 - 1) * 100).toFixed(0)}% Expansion
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-dbs-card-sub border border-dbs-border/70">
              <span className="text-[9.5px] font-semibold text-dbs-text-muted uppercase block">
                Cumulative Fee Alpha
              </span>
              <span className="text-[15px] font-bold text-dbs-gold font-display mt-0.5 block">
                +${(totalProjectedFeeUplift / 1000).toFixed(0)}k/yr
              </span>
              <span className="text-[9.5px] text-dbs-gold">Net RM Uplift</span>
            </div>
          </div>
        </div>
      </section>

      {/* Year Horizon Selector Tabs */}
      <section className="space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <span className="text-[11px] font-bold text-dbs-text-muted uppercase tracking-wider">
            Execution Timeline (Year-by-Year)
          </span>
          <span className="text-[10px] text-dbs-text-dim">Click a phase to inspect actions</span>
        </div>

        <div className="grid grid-cols-5 gap-1.5">
          {FIVE_YEAR_ADVISORY_ROADMAP.map((plan) => {
            const isSelected = selectedYear === plan.year;
            return (
              <button
                key={plan.year}
                type="button"
                onClick={() => {
                  setSelectedYear(plan.year);
                  onShowToast(`Viewing Year ${plan.year}: ${plan.headline}`);
                }}
                className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-dbs-card-sub border-dbs-red shadow-lg ring-1 ring-dbs-red/40'
                    : 'bg-dbs-card border-dbs-border/80 text-dbs-text-dim hover:text-white hover:border-dbs-border-light'
                }`}
              >
                <span
                  className={`text-[10px] font-bold block ${
                    isSelected ? 'text-dbs-red' : 'text-dbs-text-muted'
                  }`}
                >
                  Year {plan.year}
                </span>
                <span className="text-[12px] font-bold text-white font-mono block mt-0.5">
                  {plan.projectedTrv.split(' ')[0]}
                </span>
                <span
                  className={`inline-block px-1 py-0.2 rounded text-[8.5px] mt-1 font-semibold ${
                    plan.status === 'active'
                      ? 'bg-dbs-green-bg text-dbs-green'
                      : plan.status === 'scheduled'
                      ? 'bg-dbs-gold-bg text-dbs-gold'
                      : 'bg-dbs-card-lowest text-dbs-text-dim'
                  }`}
                >
                  {plan.status.toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Selected Year Detailed Blueprint Card */}
      <section className="rounded-xl bg-dbs-card border border-dbs-border p-4 shadow-lg space-y-3.5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded bg-dbs-red-light text-dbs-red text-[10px] font-bold border border-dbs-red/20">
                Phase {activePlan.year}
              </span>
              <span className="text-[11px] text-dbs-text-muted font-medium">
                {activePlan.timeframe}
              </span>
            </div>
            <h2 className="text-base font-bold text-white font-display mt-1">
              {activePlan.headline}
            </h2>
          </div>
          <div className="text-right shrink-0">
            <span className="text-[10px] text-dbs-text-dim uppercase block">Projected TRV</span>
            <span className="text-base font-bold text-white font-mono">
              {activePlan.projectedTrv}
            </span>
            <span className="text-[10px] text-dbs-green font-medium block">
              {activePlan.incrementalRevenue}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-dbs-card-sub border border-dbs-border/70 text-[11.5px] leading-relaxed">
          <span className="text-[10px] font-bold uppercase text-dbs-gold tracking-wider block mb-1">
            Strategic Objective
          </span>
          <p className="text-white">{activePlan.coreInitiative}</p>
        </div>

        {/* Action Deliverables */}
        <div className="space-y-2">
          <span className="text-[10.5px] font-semibold text-dbs-text-muted uppercase tracking-wider block">
            Tactical RM Deliverables & Milestones
          </span>
          <div className="space-y-1.5 text-[11px]">
            {activePlan.actions.map((act, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-dbs-card-lowest/90 border border-dbs-border/50 flex items-start space-x-2"
              >
                <span className="material-symbols-outlined text-dbs-green text-[16px] shrink-0 mt-0.5">
                  check_circle
                </span>
                <span className="text-dbs-text-muted leading-relaxed">{act}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Solutions */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10.5px] font-semibold text-dbs-text-muted uppercase tracking-wider block">
            Syndicated Products to Deploy
          </span>
          <div className="flex flex-wrap gap-1.5">
            {activePlan.productsRecommended.map((prod, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-dbs-card-sub border border-dbs-border text-white text-[11px] font-medium"
              >
                {prod}
              </span>
            ))}
          </div>
        </div>

        {activePlan.year === 1 && (
          <div className="pt-2 border-t border-dbs-border">
            <button
              onClick={onOpenRefiModal}
              className="w-full py-2 px-3 rounded-lg bg-dbs-gold hover:bg-amber-600 text-black font-bold text-[12px] flex items-center justify-center gap-1.5 shadow-md shadow-dbs-gold/20 transition-all cursor-pointer active:scale-95"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">real_estate_agent</span>
              <span>Launch Year 1 Tribeca Refinance & Lombard Package</span>
            </button>
          </div>
        )}
      </section>

      {/* Interactive Scenario Simulation Engine */}
      <section className="rounded-xl bg-dbs-card border border-dbs-border p-4 shadow-lg space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-md bg-dbs-blue/10 flex items-center justify-center text-dbs-blue">
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </div>
            <div>
              <h3 className="text-[13.5px] font-bold text-white font-display">
                Interactive Wealth Trajectory Modeler
              </h3>
              <p className="text-[10.5px] text-dbs-text-muted">
                Simulate portfolio growth, competitor capture, and Lombard leverage
              </p>
            </div>
          </div>
          <span className="text-[10px] text-dbs-green font-mono bg-dbs-green-bg px-2 py-0.5 rounded border border-dbs-green/20">
            Real-Time Engine
          </span>
        </div>

        {/* Sliders */}
        <div className="space-y-3 text-[11px]">
          <div className="space-y-1">
            <div className="flex justify-between font-medium">
              <span className="text-dbs-text-muted">Annual Discretionary Alpha Growth:</span>
              <span className="text-white font-mono font-bold">{growthRate.toFixed(1)}% p.a.</span>
            </div>
            <input
              type="range"
              min="4.0"
              max="15.0"
              step="0.5"
              value={growthRate}
              onChange={(e) => setGrowthRate(parseFloat(e.target.value))}
              className="w-full accent-dbs-red cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between font-medium">
              <span className="text-dbs-text-muted">Rival Wallet Captured (from $11.8M):</span>
              <span className="text-dbs-green font-mono font-bold">${displacedWallet.toFixed(1)}M</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="11.8"
              step="0.5"
              value={displacedWallet}
              onChange={(e) => setDisplacedWallet(parseFloat(e.target.value))}
              className="w-full accent-dbs-green cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between font-medium">
              <span className="text-dbs-text-muted">Lombard Standby Facility Mobilized:</span>
              <span className="text-dbs-gold font-mono font-bold">${lombardRoll.toFixed(1)}M</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3.0"
              step="0.25"
              value={lombardRoll}
              onChange={(e) => setLombardRoll(parseFloat(e.target.value))}
              className="w-full accent-dbs-gold cursor-pointer"
            />
          </div>
        </div>

        {/* Projection Results Bar */}
        <div className="p-3 rounded-lg bg-dbs-card-lowest border border-dbs-border/70 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-dbs-text-dim block uppercase">
              Simulated Year 5 TRV
            </span>
            <span className="text-lg font-bold text-white font-mono">
              ${projectedYear5TRV.toFixed(2)}M USD
            </span>
            <span className="text-[10px] text-dbs-text-muted">
              ~ SGD {(projectedYear5TRV * 1.36).toFixed(1)}M
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-dbs-text-dim block uppercase">
              Projected Annual RM Fee
            </span>
            <span className="text-lg font-bold text-dbs-green font-mono">
              +${(totalProjectedFeeUplift / 1000).toFixed(0)}k/yr
            </span>
            <span className="text-[10px] text-dbs-green">ROA: 128 bps</span>
          </div>
        </div>
      </section>

      {/* Cross-Border Structuring Topology */}
      <section className="rounded-xl bg-dbs-card border border-dbs-border p-4 shadow-lg space-y-3">
        <h3 className="text-[13.5px] font-bold text-white font-display">
          Multi-Jurisdiction Wealth Architecture
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
          <div className="p-2.5 rounded-lg bg-dbs-card-sub border border-dbs-border/70 space-y-1">
            <div className="flex items-center space-x-1.5 text-dbs-red font-bold text-[10.5px]">
              <span className="material-symbols-outlined text-[15px]">flag</span>
              <span>Singapore Hub</span>
            </div>
            <p className="text-dbs-text-muted leading-relaxed">
              Section 13O VCC Family Office tax incentive, multi-currency treasury cash pool, and global discretionary booking.
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-dbs-card-sub border border-dbs-border/70 space-y-1">
            <div className="flex items-center space-x-1.5 text-dbs-blue font-bold text-[10.5px]">
              <span className="material-symbols-outlined text-[15px]">apartment</span>
              <span>New York / Delaware</span>
            </div>
            <p className="text-dbs-text-muted leading-relaxed">
              Tribeca real estate lien collateral, pre-IPO tech founder equity holding vehicle, and Insignia card executive desk.
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-dbs-card-sub border border-dbs-border/70 space-y-1">
            <div className="flex items-center space-x-1.5 text-dbs-green font-bold text-[10.5px]">
              <span className="material-symbols-outlined text-[15px]">shield</span>
              <span>Zurich Fiduciary</span>
            </div>
            <p className="text-dbs-text-muted leading-relaxed">
              Sterling Family Revocable Trust, Universal Life cash surrender buffer, and CHF currency safe haven deposits.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
