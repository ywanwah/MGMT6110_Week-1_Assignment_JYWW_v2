import React, { useState } from 'react';
import { ClientProfile } from '../types';
import { RM_REVENUE_METRICS } from '../data/mockData';

interface RmRevenueViewProps {
  client: ClientProfile;
  onShowToast: (msg: string) => void;
}

export const RmRevenueView: React.FC<RmRevenueViewProps> = ({ client, onShowToast }) => {
  const [msCaptured, setMsCaptured] = useState(true);
  const [jpmCaptured, setJpmCaptured] = useState(false);
  const [jbCaptured, setJbCaptured] = useState(false);

  const baselineRevenue = 184200;
  const msUplift = msCaptured ? 69600 : 0;
  const jpmUplift = jpmCaptured ? 42000 : 0;
  const jbUplift = jbCaptured ? 29400 : 0;
  const totalProjectedRev = baselineRevenue + msUplift + jpmUplift + jbUplift;

  return (
    <div className="flex flex-col w-full px-3 sm:px-4 max-w-7xl mx-auto space-y-3.5 pt-2 pb-6">
      {/* Top Banner */}
      <section className="relative overflow-hidden rounded-xl bg-dbs-card border border-dbs-border p-4 shadow-xl">
        <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-dbs-green-bg blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-dbs-green shadow-[0_0_6px_rgba(16,185,129,0.8)]"></span>
              <span className="text-[11px] font-bold text-dbs-green uppercase tracking-wider bg-dbs-green-bg px-2 py-0.5 rounded border border-dbs-green/20">
                RM P&L & Fee Attribution
              </span>
            </div>
            <span className="text-[11px] text-dbs-text-dim font-mono">
              FYTD Performance • {client.name}
            </span>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-display">
              Relationship Revenue & Fee Analytics
            </h1>
            <p className="text-[12px] text-dbs-text-muted mt-1 leading-relaxed">
              Comprehensive margin spread, management fee attribution, and rival displacement upside for CIF {client.cif}.
            </p>
          </div>

          {/* Key KPI Metrics */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="p-2.5 rounded-lg bg-dbs-card-sub border border-dbs-border/70">
              <span className="text-[9.5px] font-semibold text-dbs-text-muted uppercase block">
                Annual Gross Fee
              </span>
              <span className="text-[15px] font-bold text-white font-display mt-0.5 block">
                {RM_REVENUE_METRICS.annualGrossFee}
              </span>
              <span className="text-[9.5px] text-dbs-green">{RM_REVENUE_METRICS.runRateYoY}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-dbs-card-sub border border-dbs-border/70">
              <span className="text-[9.5px] font-semibold text-dbs-text-muted uppercase block">
                Portfolio ROA
              </span>
              <span className="text-[15px] font-bold text-dbs-green font-display mt-0.5 block">
                {RM_REVENUE_METRICS.returnOnAssetsBps}
              </span>
              <span className="text-[9.5px] text-dbs-text-dim">Above 110 bps target</span>
            </div>
            <div className="p-2.5 rounded-lg bg-dbs-card-sub border border-dbs-border/70">
              <span className="text-[9.5px] font-semibold text-dbs-text-muted uppercase block">
                Pipeline Uplift
              </span>
              <span className="text-[15px] font-bold text-dbs-gold font-display mt-0.5 block">
                {RM_REVENUE_METRICS.pipelineOpportunity}
              </span>
              <span className="text-[9.5px] text-dbs-gold">From Rival Capture</span>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Stream Breakdown Card */}
      <section className="rounded-xl bg-dbs-card border border-dbs-border p-4 shadow-lg space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-dbs-gold text-[18px]">
              pie_chart
            </span>
            <h2 className="text-[13.5px] font-bold text-white font-display">
              Revenue Stream Breakdown
            </h2>
          </div>
          <span className="text-[11px] text-dbs-text-dim">100% Attributed</span>
        </div>

        <div className="space-y-3">
          {RM_REVENUE_METRICS.categories.map((cat, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between items-baseline text-[11.5px]">
                <span className="text-white font-medium flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color }}
                  ></span>
                  {cat.name}
                </span>
                <div className="text-right">
                  <span className="text-white font-mono font-bold">{cat.amount}</span>
                  <span className="text-[10px] text-dbs-text-dim ml-1.5">({cat.pct}%)</span>
                </div>
              </div>
              <div className="w-full bg-dbs-card-lowest h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-300"
                  style={{ width: `${cat.pct}%`, backgroundColor: cat.color }}
                ></div>
              </div>
              <p className="text-[10px] text-dbs-text-muted">{cat.basis}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rival Wallet Displacement Revenue Simulator */}
      <section className="rounded-xl bg-dbs-card border border-dbs-border p-4 shadow-lg space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-dbs-red text-[18px]">
              trending_up
            </span>
            <div>
              <h2 className="text-[13.5px] font-bold text-white font-display">
                Displacement Revenue Simulator
              </h2>
              <p className="text-[10.5px] text-dbs-text-muted">
                Calculate RM commission & gross fee gain upon capturing competitor balances
              </p>
            </div>
          </div>
        </div>

        {/* Toggle Cards */}
        <div className="space-y-2">
          <div
            onClick={() => {
              setMsCaptured(!msCaptured);
              onShowToast(msCaptured ? 'Removed Morgan Stanley from simulation' : 'Added Morgan Stanley capture (+$69.6k)');
            }}
            className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
              msCaptured
                ? 'bg-dbs-card-sub border-dbs-green ring-1 ring-dbs-green/30'
                : 'bg-dbs-card-lowest border-dbs-border/60 opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <span
                className={`material-symbols-outlined text-[20px] ${
                  msCaptured ? 'text-dbs-green' : 'text-dbs-text-dim'
                }`}
              >
                {msCaptured ? 'check_box' : 'check_box_outline_blank'}
              </span>
              <div>
                <span className="text-[12.5px] font-bold text-white block">
                  Displace Morgan Stanley Private Wealth ($5.80M)
                </span>
                <span className="text-[10px] text-dbs-text-muted">
                  Roll into MBAI Lombard + Founder Pre-IPO bridge
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[13px] font-bold text-dbs-green font-mono">+$69,600/yr</span>
              <span className="text-[9.5px] text-dbs-text-dim block">+120 bps ROA</span>
            </div>
          </div>

          <div
            onClick={() => {
              setJpmCaptured(!jpmCaptured);
              onShowToast(jpmCaptured ? 'Removed J.P. Morgan from simulation' : 'Added J.P. Morgan capture (+$42.0k)');
            }}
            className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
              jpmCaptured
                ? 'bg-dbs-card-sub border-dbs-green ring-1 ring-dbs-green/30'
                : 'bg-dbs-card-lowest border-dbs-border/60 opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <span
                className={`material-symbols-outlined text-[20px] ${
                  jpmCaptured ? 'text-dbs-green' : 'text-dbs-text-dim'
                }`}
              >
                {jpmCaptured ? 'check_box' : 'check_box_outline_blank'}
              </span>
              <div>
                <span className="text-[12.5px] font-bold text-white block">
                  Displace J.P. Morgan Private Bank ($3.50M)
                </span>
                <span className="text-[10px] text-dbs-text-muted">
                  Consolidate venture debt & Singapore VCC Family Office
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[13px] font-bold text-dbs-green font-mono">+$42,000/yr</span>
              <span className="text-[9.5px] text-dbs-text-dim block">+120 bps ROA</span>
            </div>
          </div>

          <div
            onClick={() => {
              setJbCaptured(!jbCaptured);
              onShowToast(jbCaptured ? 'Removed Julius Baer from simulation' : 'Added Julius Baer capture (+$29.4k)');
            }}
            className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
              jbCaptured
                ? 'bg-dbs-card-sub border-dbs-green ring-1 ring-dbs-green/30'
                : 'bg-dbs-card-lowest border-dbs-border/60 opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <span
                className={`material-symbols-outlined text-[20px] ${
                  jbCaptured ? 'text-dbs-green' : 'text-dbs-text-dim'
                }`}
              >
                {jbCaptured ? 'check_box' : 'check_box_outline_blank'}
              </span>
              <div>
                <span className="text-[12.5px] font-bold text-white block">
                  Displace Julius Baer ($2.45M)
                </span>
                <span className="text-[10px] text-dbs-text-muted">
                  Deploy MBAI 9.8% Enhanced Coupon Note + Swiss Franc forward
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[13px] font-bold text-dbs-green font-mono">+$29,400/yr</span>
              <span className="text-[9.5px] text-dbs-text-dim block">+120 bps ROA</span>
            </div>
          </div>
        </div>

        {/* Projected Revenue Outcome */}
        <div className="p-3 rounded-lg bg-dbs-card-lowest border border-dbs-border/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-dbs-text-dim uppercase block">
              Simulated Total RM Revenue
            </span>
            <span className="text-xl font-bold text-white font-mono">
              ${totalProjectedRev.toLocaleString()} USD / yr
            </span>
            <span className="text-[10px] text-dbs-green">
              +${(totalProjectedRev - baselineRevenue).toLocaleString()} Incremental Alpha
            </span>
          </div>
          <button
            type="button"
            onClick={() => onShowToast('RM Business Case saved to Branch Directorate')}
            className="py-1.5 px-3 rounded-lg bg-dbs-red hover:bg-dbs-red-hover text-white text-[11px] font-bold transition-all active:scale-95 cursor-pointer"
          >
            Save P&L Case
          </button>
        </div>
      </section>

      {/* Active Concessions & Fee Exceptions */}
      <section className="rounded-xl bg-dbs-card border border-dbs-border p-4 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[13.5px] font-bold text-white font-display">
            Active Fee Concessions & Waivers
          </h3>
          <button
            onClick={() => onShowToast('Opened Fee Waiver exception workflow')}
            className="text-[11px] text-dbs-red font-semibold hover:underline cursor-pointer"
            type="button"
          >
            + Request Concession
          </button>
        </div>

        <div className="space-y-2">
          {RM_REVENUE_METRICS.feeConcessions.map((con, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg bg-dbs-card-sub border border-dbs-border/60 text-[11px] space-y-1"
            >
              <div className="flex justify-between items-start">
                <span className="text-white font-bold">{con.facility}</span>
                <span className="text-[10px] text-dbs-gold font-mono">{con.expiryDate}</span>
              </div>
              <div className="flex justify-between text-dbs-text-muted text-[10.5px]">
                <span>Standard: <span className="line-through">{con.standardRate}</span></span>
                <span className="text-dbs-green font-medium">Approved: {con.approvedRate}</span>
              </div>
              <span className="text-[10px] text-dbs-text-dim block">{con.revenueImpact}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
