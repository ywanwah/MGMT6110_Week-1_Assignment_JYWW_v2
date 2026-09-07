import React, { useState } from 'react';
import { ClientProfile, CompetitorThreat } from '../types';
import { RESEARCH_INSIGHTS } from '../data/mockData';

interface InsightsViewProps {
  client: ClientProfile;
  onShowToast: (msg: string) => void;
  onOpenCounterPitch?: (comp: CompetitorThreat) => void;
}

export const InsightsView: React.FC<InsightsViewProps> = ({
  client,
  onShowToast,
  onOpenCounterPitch,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCompetitorId, setExpandedCompetitorId] = useState<string | null>(
    client.competitors[0]?.id || null
  );

  const tags = ['All', 'Rates & SOFR', 'Equities & Tech', 'FX & Currency', 'Structured Notes'];

  const filteredInsights = RESEARCH_INSIGHTS.filter((item) => {
    const matchesTag = selectedTag === 'All' || item.category === selectedTag;
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  const top3Competitors = client.competitors.slice(0, 3);
  const totalRivalWallet = top3Competitors.reduce((acc, curr) => {
    const num = parseFloat(curr.estWallet.replace('$', '').replace('M', '')) || 0;
    return acc + num;
  }, 0);

  return (
    <div className="flex flex-col w-full px-3 sm:px-4 max-w-7xl mx-auto space-y-4 pt-2 pb-6">
      {/* Top Banner */}
      <section className="relative overflow-hidden rounded-xl bg-dbs-card border border-dbs-border p-4 shadow-xl">
        <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-dbs-blue/10 blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-dbs-blue text-[18px]">
                analytics
              </span>
              <span className="text-[11px] font-bold text-dbs-blue uppercase tracking-wider bg-dbs-blue/10 px-2 py-0.5 rounded border border-dbs-blue/20">
                AI Chief Investment Office (CIO) & Intelligence
              </span>
            </div>
            <span className="text-[11px] text-dbs-text-dim font-mono">
              Live Institutional Feeds
            </span>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-display">
              Market Intelligence & Strategic Advisory
            </h1>
            <p className="text-[12px] text-dbs-text-muted mt-1 leading-relaxed">
              Competitive wallet radar, rival bank pitches under consideration, and tactical research matching{' '}
              <span className="text-white font-semibold">{client.name}&apos;s</span> portfolio posture.
            </p>
          </div>

          {/* Live Market Rates Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <div className="p-2 rounded bg-dbs-card-sub border border-dbs-border/60">
              <span className="text-[9.5px] text-dbs-text-dim block">1M Term SOFR</span>
              <span className="text-[13px] font-bold text-white font-mono block">4.88%</span>
              <span className="text-[9px] text-dbs-green">-4 bps (Easing cycle)</span>
            </div>
            <div className="p-2 rounded bg-dbs-card-sub border border-dbs-border/60">
              <span className="text-[9.5px] text-dbs-text-dim block">USD / SGD Spot</span>
              <span className="text-[13px] font-bold text-white font-mono block">1.3045</span>
              <span className="text-[9px] text-dbs-text-dim">+0.12% 24H</span>
            </div>
            <div className="p-2 rounded bg-dbs-card-sub border border-dbs-border/60">
              <span className="text-[9.5px] text-dbs-text-dim block">USD / CHF Basis</span>
              <span className="text-[13px] font-bold text-white font-mono block">0.8462</span>
              <span className="text-[9px] text-dbs-gold">CHF Safe Haven bid</span>
            </div>
            <div className="p-2 rounded bg-dbs-card-sub border border-dbs-border/60">
              <span className="text-[9.5px] text-dbs-text-dim block">US 10-Yr Treasury</span>
              <span className="text-[13px] font-bold text-white font-mono block">3.72%</span>
              <span className="text-[9px] text-dbs-green">Bull steepening</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOP 3 COMPETITORS UNDER ACTIVE CONSIDERATION */}
      <section className="rounded-xl bg-dbs-card border border-dbs-border p-4 shadow-lg space-y-3.5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-dbs-red/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-md bg-dbs-red-light flex items-center justify-center text-dbs-red border border-dbs-red/20">
              <span className="material-symbols-outlined text-[17px]">radar</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-[14px] font-bold text-white font-display">
                  Top 3 Competitors Under Active Consideration
                </h2>
                <span className="text-[10px] font-bold text-dbs-red bg-dbs-red-light px-2 py-0.2 rounded border border-dbs-red/20 uppercase tracking-wider">
                  Rival Radar
                </span>
              </div>
              <p className="text-[11px] text-dbs-text-muted">
                External bank proposals, active pitches, and defensive displacement strategies for {client.name}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <div className="px-2.5 py-1 rounded-lg bg-dbs-card-lowest border border-dbs-border text-right">
              <span className="text-[9px] text-dbs-text-dim block uppercase">Rival Wallet at Risk</span>
              <span className="text-[13px] font-bold text-white font-mono">
                ${totalRivalWallet.toFixed(2)}M <span className="text-[10px] text-dbs-red font-normal">(44.3%)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Competitor Cards List */}
        <div className="space-y-2.5">
          {top3Competitors.map((comp) => {
            const isExpanded = expandedCompetitorId === comp.id;
            return (
              <div
                key={comp.id}
                className="rounded-lg bg-dbs-card-sub border border-dbs-border overflow-hidden transition-all duration-200 hover:border-dbs-border-light"
              >
                {/* Collapsed Header Bar */}
                <div
                  onClick={() => setExpandedCompetitorId(isExpanded ? null : comp.id)}
                  className="p-3 flex items-center justify-between cursor-pointer select-none bg-dbs-card-sub/90 hover:bg-dbs-card-lowest/80 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-dbs-card-lowest border border-dbs-border flex items-center justify-center text-[11px] font-bold text-dbs-gold font-mono shrink-0">
                      #{comp.rank}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[13px] font-bold text-white">{comp.institution}</span>
                        <span
                          className={`text-[9.5px] font-bold px-2 py-0.2 rounded border ${
                            comp.threatLevel === 'High Threat'
                              ? 'bg-dbs-red-light text-dbs-red border-dbs-red/30'
                              : comp.threatLevel === 'Active RFP'
                              ? 'bg-dbs-gold-bg text-dbs-gold border-dbs-gold/30'
                              : 'bg-purple-950/40 text-purple-400 border-purple-800/40'
                          }`}
                        >
                          {comp.threatLevel}
                        </span>
                      </div>
                      <p className="text-[11px] text-dbs-text-muted mt-0.5 line-clamp-1">
                        Considering: <span className="text-dbs-text-dim">{comp.detailNote}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    <div className="text-right">
                      <span className="text-[12.5px] font-bold text-white font-mono block">
                        {comp.estWallet}
                      </span>
                      <span className="text-[9.5px] text-dbs-text-dim">
                        {comp.walletShare} of wallet
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-dbs-text-dim text-[18px]">
                      {isExpanded ? 'expand_less' : 'expand_more'}
                    </span>
                  </div>
                </div>

                {/* Expanded Details Pane */}
                {isExpanded && (
                  <div className="p-3.5 border-t border-dbs-border/70 bg-dbs-card-lowest/90 space-y-3">
                    {/* Head-to-Head Comparison Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {/* Competitor Pitch / What Client is Considering */}
                      <div className="p-2.5 rounded-lg bg-dbs-card-sub border border-red-900/30 space-y-1.5">
                        <div className="flex items-center space-x-1.5 text-dbs-red font-bold text-[10.5px] uppercase tracking-wider">
                          <span className="material-symbols-outlined text-[15px]">campaign</span>
                          <span>What Customer is Considering ({comp.institution.split(' ')[0]})</span>
                        </div>
                        <p className="text-[11.5px] text-white leading-relaxed font-medium">
                          {comp.pitch}
                        </p>
                        <div className="pt-1 text-[10px] text-dbs-text-dim border-t border-dbs-border/40">
                          <strong>Customer Motivation:</strong>{' '}
                          {comp.rank === 1
                            ? 'Client exploring founder stock liquidity before pre-IPO blackout.'
                            : comp.rank === 2
                            ? 'Seeking dedicated Silicon Valley venture debt and tech equity mandate.'
                            : 'Client holds CHF balance and desires short-term high coupon yield.'}
                        </div>
                      </div>

                      {/* AI / MBAI Counter Strategy & Winning Angle */}
                      <div className="p-2.5 rounded-lg bg-dbs-card-sub border border-green-900/40 space-y-1.5">
                        <div className="flex items-center space-x-1.5 text-dbs-green font-bold text-[10.5px] uppercase tracking-wider">
                          <span className="material-symbols-outlined text-[15px]">verified_user</span>
                          <span>AI Treasures Advantage & Counter-Offer</span>
                        </div>
                        <p className="text-[11.5px] text-white leading-relaxed font-medium">
                          {comp.counter}
                        </p>
                        <div className="pt-1 text-[10px] text-dbs-green border-t border-dbs-border/40">
                          <strong>Decisive Edge:</strong>{' '}
                          {comp.rank === 1
                            ? '+15% higher LTV (55% vs 40%), no equity dilution or restrictive warrants.'
                            : comp.rank === 2
                            ? 'Singapore Section 13O VCC 0% capital gains tax + 20 bps fee concession.'
                            : 'Capital-protected 9.8% coupon without dual-currency knock-in currency loss.'}
                        </div>
                      </div>
                    </div>

                    {/* Action Bar for Competitor */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <div className="flex items-center space-x-2 text-[10.5px] text-dbs-text-dim font-mono">
                        <span>Capture Opportunity:</span>
                        <span className="text-dbs-green font-bold font-mono">
                          +${comp.rank === 1 ? '69,600' : comp.rank === 2 ? '42,000' : '29,400'}/yr RM Gross Revenue
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            onShowToast(`Client intelligence note logged for ${comp.institution}`);
                          }}
                          className="py-1.5 px-3 rounded-lg bg-dbs-card-sub hover:bg-dbs-border text-dbs-text-muted hover:text-white text-[11px] font-medium transition-colors cursor-pointer"
                        >
                          Log Update
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (onOpenCounterPitch) {
                              onOpenCounterPitch(comp);
                            } else {
                              onShowToast(`Generated counter-pitch deck against ${comp.institution}`);
                            }
                          }}
                          className="py-1.5 px-3 rounded-lg bg-dbs-red hover:bg-dbs-red-hover text-white text-[11px] font-bold flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[15px]">swords</span>
                          <span>Launch 1-Click Counter Pitch</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Displacement Quick Callout */}
        <div className="p-2.5 rounded-lg bg-dbs-card-lowest/90 border border-dbs-border/70 flex items-center justify-between text-[11px]">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-dbs-gold text-[16px]">
              monetization_on
            </span>
            <span className="text-dbs-text-muted">
              Consolidating these 3 accounts captures{' '}
              <strong className="text-white">${totalRivalWallet.toFixed(2)}M in new AUM</strong>
            </span>
          </div>
          <span className="text-dbs-green font-bold font-mono">
            +$141,000/yr Net Fee Expansion
          </span>
        </div>
      </section>

      {/* Filter and Search Bar for Research */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <span className="material-symbols-outlined text-dbs-blue text-[17px]">
              article
            </span>
            <h3 className="text-[13.5px] font-bold text-white font-display">
              CIO Research & Macro Bulletins
            </h3>
          </div>
          <span className="text-[10.5px] text-dbs-text-dim">
            Showing {filteredInsights.length} matching reports
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between">
          {/* Category Chips */}
          <div className="flex space-x-1.5 overflow-x-auto pb-0.5 no-scrollbar">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold shrink-0 transition-colors cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-dbs-red text-white shadow-sm'
                    : 'bg-dbs-card border border-dbs-border text-dbs-text-muted hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[200px]">
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-[16px] text-dbs-text-dim">
              search
            </span>
            <input
              type="text"
              placeholder="Search CIO notes, SOFR, notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dbs-card border border-dbs-border rounded-lg pl-8 pr-3 py-1.5 text-[11.5px] text-white focus:outline-none focus:border-dbs-red"
            />
          </div>
        </div>
      </section>

      {/* Insights Cards List */}
      <section className="space-y-3">
        {filteredInsights.map((insight) => (
          <article
            key={insight.id}
            className="rounded-xl bg-dbs-card border border-dbs-border p-4 shadow-md space-y-2.5 hover:border-dbs-border-light transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.2 rounded text-[9.5px] font-bold bg-dbs-card-sub text-dbs-blue border border-dbs-border">
                    {insight.category}
                  </span>
                  <span className="text-[10px] text-dbs-text-dim">• {insight.published}</span>
                  <span className="text-[10px] text-dbs-text-dim">• {insight.readTime}</span>
                </div>
                <h3 className="text-[14px] font-bold text-white font-display">
                  {insight.title}
                </h3>
              </div>
              <span className="material-symbols-outlined text-dbs-text-dim text-[18px]">
                bookmark_border
              </span>
            </div>

            <p className="text-[11.5px] text-dbs-text-muted leading-relaxed">
              {insight.summary}
            </p>

            {/* Client Context Relevance Callout */}
            <div className="p-2 rounded-lg bg-dbs-card-lowest/90 border border-dbs-border/60 flex items-start space-x-2 text-[10.5px]">
              <span className="material-symbols-outlined text-dbs-gold text-[15px] shrink-0 mt-0.5">
                crisis_alert
              </span>
              <span className="text-white font-medium">
                <strong className="text-dbs-gold uppercase tracking-wider text-[9.5px] mr-1">
                  Client Fit:
                </strong>
                {insight.clientRelevance}
              </span>
            </div>

            {/* Tags & Action Bar */}
            <div className="flex items-center justify-between pt-1 border-t border-dbs-border/50 text-[11px]">
              <div className="flex flex-wrap gap-1">
                {insight.tags.map((t, idx) => (
                  <span key={idx} className="text-[10px] text-dbs-text-dim font-mono">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onShowToast(`Read brief: ${insight.title}`)}
                  className="py-1 px-2.5 rounded bg-dbs-card-sub hover:bg-dbs-border text-white text-[10.5px] font-medium transition-colors cursor-pointer"
                >
                  Full Report
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast(`Sent CIO brief to ${client.name} via Digibank`)}
                  className="py-1 px-2.5 rounded bg-dbs-red-light hover:bg-dbs-red hover:text-white text-dbs-red text-[10.5px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[13px]">send</span>
                  <span>Send to Client</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};
