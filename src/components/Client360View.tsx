import React, { useState } from 'react';
import { ClientProfile, CoreProduct, CompetitorThreat, ProductCategory } from '../types';

interface Client360ViewProps {
  client: ClientProfile;
  onOpenCallNote: () => void;
  onOpenScheduleReview: () => void;
  onOpenExportDossier: () => void;
  onOpenCounterPitch: (competitor: CompetitorThreat) => void;
  onOpenRefiProposal: () => void;
  onNavigateToAdvisory: () => void;
  onShowToast: (msg: string) => void;
}

interface NoteItem {
  id: string;
  author: string;
  role: string;
  category: 'Client Comment' | 'Meeting Note' | 'Credit Instruction' | 'Advisory Strategy';
  date: string;
  text: string;
  isPinned?: boolean;
  comments: Array<{
    id: string;
    author: string;
    text: string;
    date: string;
  }>;
}

export const Client360View: React.FC<Client360ViewProps> = ({
  client,
  onOpenCallNote,
  onOpenScheduleReview,
  onOpenExportDossier,
  onOpenCounterPitch,
  onOpenRefiProposal,
  onNavigateToAdvisory,
  onShowToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [expandedProducts, setExpandedProducts] = useState<Record<string, boolean>>({
    'product-1': false,
  });

  // Relationship Notes and Comments State
  const [notes, setNotes] = useState<NoteItem[]>([
    {
      id: 'note-1',
      author: 'Jo Yeong',
      role: 'Senior Private Banker (RM)',
      category: 'Client Comment',
      date: 'Today, 10:45 AM',
      isPinned: true,
      text: 'Alexander stated during breakfast at Marina Bay that Morgan Stanley offered a $5.8M pre-IPO liquidity facility against his Series C equity. He specifically requested our counter-offer with a Lombard facility backed by his Tribeca penthouse before his Friday board review.',
      comments: [
        {
          id: 'comm-1',
          author: 'APAC Credit Desk',
          text: 'Super-prime spread confirmed at SOFR + 1.10%. Ready to syndicate upon formal confirmation.',
          date: 'Today, 11:20 AM',
        },
      ],
    },
    {
      id: 'note-2',
      author: 'Jo Yeong',
      role: 'Senior Private Banker (RM)',
      category: 'Meeting Note',
      date: 'Sep 4, 2024',
      isPinned: false,
      text: 'Annual TRV review conducted with Alexander and tax counsel. Client agreed to park $3.5M unhedged USD cash reserves into the AI 9.8% Enhanced Coupon Note post-FOMC announcement.',
      comments: [],
    },
    {
      id: 'note-3',
      author: 'Credit Risk Directorate',
      role: 'Senior Risk Underwriter',
      category: 'Credit Instruction',
      date: 'Aug 28, 2024',
      isPinned: false,
      text: 'Collateral evaluation refreshed on 155 Franklin St Tribeca Penthouse. Eligible value established at $3.90M (35% haircut). Weighted LTV sits comfortably at 47.9% vs. 65% trigger.',
      comments: [],
    },
  ]);

  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState<'Client Comment' | 'Meeting Note' | 'Credit Instruction' | 'Advisory Strategy'>('Client Comment');
  const [newNoteIsPinned, setNewNoteIsPinned] = useState(false);
  const [noteFilter, setNoteFilter] = useState<string>('All');
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const newEntry: NoteItem = {
      id: `note-${Date.now()}`,
      author: 'Jo Yeong',
      role: 'Senior Private Banker (RM)',
      category: newNoteCategory,
      date: 'Just now',
      isPinned: newNoteIsPinned,
      text: newNoteText.trim(),
      comments: [],
    };

    setNotes((prev) => [newEntry, ...prev]);
    setNewNoteText('');
    setNewNoteIsPinned(false);
    onShowToast(`Note added: "${newNoteCategory}" saved`);
  };

  const handleAddComment = (noteId: string) => {
    if (!replyText.trim()) return;

    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === noteId) {
          return {
            ...n,
            comments: [
              ...n.comments,
              {
                id: `comm-${Date.now()}`,
                author: 'Jo Yeong (RM)',
                text: replyText.trim(),
                date: 'Just now',
              },
            ],
          };
        }
        return n;
      })
    );

    setReplyText('');
    setActiveReplyId(null);
    onShowToast('Comment posted to note thread');
  };

  const togglePinNote = (noteId: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, isPinned: !n.isPinned } : n))
    );
    onShowToast('Note pin status updated');
  };

  const filteredNotes = notes.filter((n) => {
    if (noteFilter === 'All') return true;
    return n.category === noteFilter;
  });

  const toggleProductAccordion = (id: string) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredProducts = client.products.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="flex flex-col w-full px-3 sm:px-4 max-w-7xl mx-auto space-y-3.5 pt-2">
      {/* 1. Client Identity Card (DBS Treasures Signature Card) */}
      <section className="relative overflow-hidden rounded-xl bg-dbs-card border border-dbs-border p-4 shadow-xl">
        {/* Subtle DBS Crimson Aura Accent */}
        <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-dbs-red/10 blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="relative shrink-0">
                <img
                  alt={client.name}
                  className="w-[52px] h-[52px] rounded-full object-cover ring-2 ring-dbs-red/40 shadow-md"
                  src={client.avatarUrl}
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-dbs-green ring-2 ring-dbs-card shadow-[0_0_6px_rgba(16,185,129,0.9)]"></span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-1.5">
                  <h1 className="text-base font-bold text-white truncate font-display">
                    {client.name}
                  </h1>
                  <span
                    className="material-symbols-outlined text-dbs-blue text-[17px]"
                    title="AI Digibank Verified"
                  >
                    verified
                  </span>
                </div>
                <p className="text-[12px] text-dbs-text-muted truncate">
                  Age {client.age} • {client.role}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] font-mono font-medium text-dbs-text-dim">
                    CIF: {client.cif}
                  </span>
                  <span className="text-dbs-text-dim">•</span>
                  <span className="text-[10px] text-dbs-red font-medium">
                    {client.tier}
                  </span>
                </div>
              </div>
            </div>

            {/* KYC Status Badge */}
            <div className="flex flex-col items-end shrink-0">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-dbs-green-bg text-dbs-green text-[10.5px] font-semibold border border-dbs-green/20">
                <span className="w-1.5 h-1.5 rounded-full bg-dbs-green mr-1"></span>
                KYC Clean
              </span>
              <span className="text-[10px] text-dbs-text-dim mt-1">
                {client.kycReviewIn}
              </span>
            </div>
          </div>

          {/* DBS Internal Rating & Telemetry Strip */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="rounded-lg bg-dbs-card-sub border border-dbs-border/70 p-2">
              <div className="flex items-center justify-between">
                <span className="text-[9.5px] font-semibold text-dbs-text-muted uppercase tracking-wider">
                  Internal Rating
                </span>
                <span className="material-symbols-outlined text-dbs-blue text-[14px]">
                  shield
                </span>
              </div>
              <div className="text-[13px] font-bold text-white mt-0.5">
                {client.internalRating.code}
              </div>
              <span className="text-[9.5px] text-dbs-green block">
                {client.internalRating.description} • {client.internalRating.pd}
              </span>
            </div>

            <div className="rounded-lg bg-dbs-card-sub border border-dbs-border/70 p-2">
              <div className="flex items-center justify-between">
                <span className="text-[9.5px] font-semibold text-dbs-text-muted uppercase tracking-wider">
                  Risk Profile
                </span>
                <span className="material-symbols-outlined text-dbs-gold text-[14px]">
                  speed
                </span>
              </div>
              <div className="text-[13px] font-bold text-white mt-0.5">
                {client.riskProfile.label}
              </div>
              <span className="text-[9.5px] text-dbs-gold block">
                Score: {client.riskProfile.score} / {client.riskProfile.maxScore}
              </span>
            </div>

            <div className="rounded-lg bg-dbs-card-sub border border-dbs-border/70 p-2">
              <div className="flex items-center justify-between">
                <span className="text-[9.5px] font-semibold text-dbs-text-muted uppercase tracking-wider">
                  Liquidity Tier
                </span>
                <span className="material-symbols-outlined text-dbs-green text-[14px]">
                  water_drop
                </span>
              </div>
              <div className="text-[13px] font-bold text-white mt-0.5">
                {client.liquidityTier.tier}
              </div>
              <span className="text-[9.5px] text-dbs-green block">
                Liquid: {client.liquidityTier.liquidAmountSGD}
              </span>
            </div>
          </div>

          {/* RM Operational Action Chips */}
          <div className="flex items-center gap-2 pt-0.5 overflow-x-auto no-scrollbar">
            <button
              onClick={onOpenCallNote}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dbs-card-sub hover:bg-dbs-border text-white text-[11.5px] font-medium border border-dbs-border shrink-0 transition-all active:scale-95 cursor-pointer"
              id="btn-log-note"
              type="button"
            >
              <span className="material-symbols-outlined text-[15px] text-dbs-red">
                edit_note
              </span>
              <span>RM Call Note</span>
            </button>
            <button
              onClick={onOpenScheduleReview}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dbs-card-sub hover:bg-dbs-border text-white text-[11.5px] font-medium border border-dbs-border shrink-0 transition-all active:scale-95 cursor-pointer"
              id="btn-schedule-review"
              type="button"
            >
              <span className="material-symbols-outlined text-[15px] text-dbs-green">
                calendar_month
              </span>
              <span>Schedule Review</span>
            </button>
            <button
              onClick={onOpenExportDossier}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dbs-card-sub hover:bg-dbs-border text-white text-[11.5px] font-medium border border-dbs-border shrink-0 transition-all active:scale-95 cursor-pointer"
              id="btn-export-dossier"
              type="button"
            >
              <span className="material-symbols-outlined text-[15px] text-dbs-gold">
                description
              </span>
              <span>Export Dossier</span>
            </button>
            <a
              href="#relationship-notes"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dbs-card-sub hover:bg-dbs-border text-white text-[11.5px] font-medium border border-dbs-border shrink-0 transition-all active:scale-95 cursor-pointer"
              id="btn-scroll-notes"
            >
              <span className="material-symbols-outlined text-[15px] text-dbs-blue">
                sticky_note_2
              </span>
              <span>Notes & Comments ({notes.length})</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. DBS Client 360° Portfolio Overview (Total Relationship Balance) */}
      <section className="rounded-xl bg-dbs-card border border-dbs-border p-4 shadow-lg flex flex-col space-y-3.5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10.5px] font-bold text-dbs-text-muted uppercase tracking-wider">
                Total Relationship Balance (TRV)
              </span>
              <span className="text-[9.5px] text-dbs-red font-semibold bg-dbs-red-light px-1.5 py-0.2 rounded">
                SGD / USD Eq.
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight">
                {client.balance.trvFormatted}
              </span>
              <span className="text-[11px] text-dbs-text-muted font-medium">
                {client.balance.trvSGD}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="inline-flex items-center text-dbs-green text-[11px] font-semibold">
                <span className="material-symbols-outlined text-[14px]">arrow_upward</span>{' '}
                {client.balance.yoyChange}
              </span>
              <span className="text-[10px] text-dbs-text-dim">
                • {client.balance.performanceNote}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-semibold text-dbs-text-dim uppercase tracking-wider">
              Net Bank Position
            </span>
            <p className="text-base font-bold text-dbs-green mt-0.5">
              {client.balance.netBankPosition}
            </p>
            <span className="text-[10px] text-dbs-text-dim">
              {client.balance.netBankPositionStatus}
            </span>
          </div>
        </div>

        {/* Metric Splits: DBS AUM vs Liabilities */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-dbs-card-sub border border-dbs-border/60 rounded-lg p-2.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] text-dbs-text-muted flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-dbs-red"></span> MBAI Wealth AUM
              </span>
              <span className="text-[10px] text-dbs-green font-medium">
                {client.balance.wealthAumChange}
              </span>
            </div>
            <p className="text-lg font-bold text-white font-display">
              {client.balance.wealthAum}
            </p>
            <span className="text-[10px] text-dbs-text-dim">
              Active Discretionary & Funds
            </span>
          </div>
          <div className="bg-dbs-card-sub border border-dbs-border/60 rounded-lg p-2.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] text-dbs-text-muted flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-dbs-gold"></span>
                Total Facilities
              </span>
              <span className="text-[10px] text-dbs-text-muted font-medium">
                {client.balance.facilitiesBenchmark}
              </span>
            </div>
            <p className="text-lg font-bold text-white font-display">
              {client.balance.totalFacilities}
            </p>
            <span className="text-[10px] text-dbs-text-dim">
              Tribeca Lien & Lombard
            </span>
          </div>
        </div>

        {/* Segmented Capital Allocation Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between items-center text-[11px]">
            <span className="font-semibold text-dbs-text-muted uppercase tracking-wider text-[10px]">
              Asset Allocation Split
            </span>
            <span className="text-dbs-blue font-medium text-[11px]">
              Liquid Unpledged: {client.balance.allocation.liquidUnpledged}
            </span>
          </div>

          <div className="w-full h-2.5 bg-dbs-card-lowest rounded-full overflow-hidden flex border border-dbs-border/40">
            <div
              className="h-full bg-dbs-red transition-all"
              style={{ width: `${client.balance.allocation.wealth}%` }}
              title={`Wealth Management ${client.balance.allocation.wealth}%`}
            ></div>
            <div
              className="h-full bg-dbs-green transition-all"
              style={{ width: `${client.balance.allocation.deposits}%` }}
              title={`Deposits ${client.balance.allocation.deposits}%`}
            ></div>
            <div
              className="h-full bg-dbs-gold transition-all"
              style={{ width: `${client.balance.allocation.mortgage}%` }}
              title={`Mortgage/RE ${client.balance.allocation.mortgage}%`}
            ></div>
            <div
              className="h-full bg-dbs-blue transition-all"
              style={{ width: `${client.balance.allocation.lifeInsurance}%` }}
              title={`Universal Life ${client.balance.allocation.lifeInsurance}%`}
            ></div>
          </div>

          {/* Allocation Legend */}
          <div className="grid grid-cols-4 gap-1 pt-1 text-center">
            <div className="flex flex-col items-center bg-dbs-card-sub/50 py-1 rounded">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-dbs-red"></span>
                <span className="text-[10px] text-dbs-text-muted">Wealth</span>
              </div>
              <span className="text-[11.5px] font-bold text-white">
                {client.balance.allocation.wealth}%
              </span>
            </div>
            <div className="flex flex-col items-center bg-dbs-card-sub/50 py-1 rounded">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-dbs-green"></span>
                <span className="text-[10px] text-dbs-text-muted">Deposits</span>
              </div>
              <span className="text-[11.5px] font-bold text-white">
                {client.balance.allocation.deposits}%
              </span>
            </div>
            <div className="flex flex-col items-center bg-dbs-card-sub/50 py-1 rounded">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-dbs-gold"></span>
                <span className="text-[10px] text-dbs-text-muted">Mortgage</span>
              </div>
              <span className="text-[11.5px] font-bold text-white">
                {client.balance.allocation.mortgage}%
              </span>
            </div>
            <div className="flex flex-col items-center bg-dbs-card-sub/50 py-1 rounded">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-dbs-blue"></span>
                <span className="text-[10px] text-dbs-text-muted">Life Ins.</span>
              </div>
              <span className="text-[11.5px] font-bold text-white">
                {client.balance.allocation.lifeInsurance}%
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Credit Exposures & Collaterals (Lending & Margin Management) */}
      <section className="rounded-xl bg-dbs-card border border-dbs-border p-4 shadow-lg flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-md bg-dbs-red-light flex items-center justify-center text-dbs-red">
              <span className="material-symbols-outlined text-[18px]">
                account_balance_wallet
              </span>
            </div>
            <div>
              <h2 className="text-[13.5px] font-bold text-white">
                Credit Exposures & Collateral Management
              </h2>
              <p className="text-[10.5px] text-dbs-text-muted">
                Lombard facilities, property liens & haircuts
              </p>
            </div>
          </div>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-dbs-green-bg text-dbs-green text-[10px] font-bold border border-dbs-green/20">
            <span className="w-1.5 h-1.5 rounded-full bg-dbs-green mr-1 animate-pulse"></span>
            Healthy Buffer
          </span>
        </div>

        {/* Total Sanctioned Facility Bar */}
        <div className="rounded-lg bg-dbs-card-sub border border-dbs-border/70 p-3 space-y-2">
          <div className="flex justify-between items-baseline">
            <span className="text-[10px] font-semibold text-dbs-text-muted uppercase tracking-wider">
              Total Approved Credit Facility
            </span>
            <span className="text-base font-bold text-white font-display">
              {client.credit.approvedLimit}
            </span>
          </div>
          <div className="w-full bg-dbs-card-lowest h-2.5 rounded-full overflow-hidden flex border border-dbs-border/50">
            <div
              className="bg-dbs-gold h-full"
              style={{ width: client.credit.drawnPct }}
              title={`Utilized: ${client.credit.drawnAmount} (${client.credit.drawnPct})`}
            ></div>
            <div
              className="bg-dbs-green/60 h-full"
              style={{ width: '19.8%' }}
              title={`Available: ${client.credit.availableHeadroom}`}
            ></div>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-dbs-gold font-medium">
              Drawn: {client.credit.drawnAmount} ({client.credit.drawnPct})
            </span>
            <span className="text-dbs-green font-medium">
              Available Headroom: {client.credit.availableHeadroom}
            </span>
          </div>
        </div>

        {/* Institutional Facility Breakdown */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-semibold text-dbs-text-muted uppercase tracking-wider block">
            Approved Facilities
          </span>
          {client.credit.facilities.map((fac) => (
            <div
              key={fac.id}
              className="p-2.5 rounded-lg bg-dbs-card-sub/80 border border-dbs-border/60 flex items-center justify-between"
            >
              <div className="min-w-0 pr-2">
                <div className="flex items-center space-x-1.5">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: fac.color }}
                  ></span>
                  <span className="text-[12.5px] font-semibold text-white truncate">
                    {fac.name}
                  </span>
                </div>
                <p className="text-[10.5px] text-dbs-text-muted">{fac.desc}</p>
              </div>
              <div className="text-right shrink-0">
                <span
                  className={`text-[13px] font-bold font-mono ${
                    fac.type === 'lombard' ? 'text-dbs-green' : 'text-white'
                  }`}
                >
                  {fac.drawnText}
                </span>
                <span
                  className={`text-[9.5px] block ${
                    fac.type === 'lombard' ? 'text-dbs-green' : 'text-dbs-text-dim'
                  }`}
                >
                  {fac.subText}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pledged Collaterals & Security Coverage */}
        <div className="pt-1 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-dbs-text-muted uppercase tracking-wider">
              Collateral Pledges & Haircut Coverage
            </span>
            <span className="text-[10.5px] text-dbs-green font-medium">
              Excess Margin: {client.credit.collateral.excessMargin}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-lg bg-dbs-card-sub border border-dbs-border/60">
              <span className="text-[9.5px] font-semibold text-dbs-text-dim uppercase block">
                Pledged Collateral
              </span>
              <span className="text-[15px] font-bold text-white font-display block mt-0.5">
                {client.credit.collateral.pledgedTotal}
              </span>
              <span className="text-[10px] text-dbs-text-muted block">
                Eligible Value: {client.credit.collateral.eligibleValue}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-dbs-card-sub border border-dbs-border/60">
              <span className="text-[9.5px] font-semibold text-dbs-text-dim uppercase block">
                Weighted LTV
              </span>
              <div className="flex items-baseline space-x-1 mt-0.5">
                <span className="text-[15px] font-bold text-dbs-green font-display">
                  {client.credit.collateral.weightedLtv}
                </span>
                <span className="text-[10px] text-dbs-text-dim">
                  / {client.credit.collateral.ltvTrigger}
                </span>
              </div>
              <span className="text-[10px] text-dbs-green block">
                Buffer: {client.credit.collateral.headroomBuffer}
              </span>
            </div>
          </div>

          <div className="space-y-1.5 text-[11px]">
            {client.credit.collateral.assets.map((asset, idx) => (
              <div
                key={idx}
                className="p-2 rounded-lg bg-dbs-card-lowest/90 border border-dbs-border/40 flex items-center justify-between"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center space-x-1">
                    <span
                      className="material-symbols-outlined text-[15px]"
                      style={{ color: asset.color }}
                    >
                      {asset.icon}
                    </span>
                    <span className="text-white font-medium truncate">{asset.name}</span>
                  </div>
                  <span className="text-[10px] text-dbs-text-dim block">
                    Market: {asset.marketValue} • {asset.haircut}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[12px] font-bold text-white font-mono">
                    {asset.eligibleValue}
                  </span>
                  <span className="text-[9px] text-dbs-green block">Eligible Collateral</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-2 rounded-lg bg-dbs-green-bg border border-dbs-green/20 flex items-center justify-between text-[10.5px]">
            <span className="text-dbs-green flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-[14px]">verified</span> 0 Margin Calls
              in 24 Months
            </span>
            <span className="text-dbs-text-muted">
              Revaluation: {client.credit.collateral.revaluationDate}
            </span>
          </div>
        </div>
      </section>

      {/* 4. Core Held Banking Products (Top 5) */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center space-x-2">
            <span className="text-[14px] font-bold text-white font-display">
              Core Banking Products
            </span>
            <span className="px-2 py-0.5 rounded-full bg-dbs-red-light text-dbs-red text-[11px] font-bold border border-dbs-red/20">
              {client.products.length} Held
            </span>
          </div>
          <button
            onClick={() => onShowToast('Synced with DBS Digibank core ledger')}
            className="inline-flex items-center text-[10.5px] text-dbs-green gap-1 hover:underline cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[13px]">sync_saved_locally</span>
            <span>Live Digibank Sync</span>
          </button>
        </div>

        {/* Filter Segmented Chips */}
        <div className="flex space-x-1.5 overflow-x-auto pb-0.5 no-scrollbar">
          {(
            [
              { key: 'all', label: `All Products (${client.products.length})` },
              { key: 'wealth', label: 'Wealth & Growth' },
              { key: 'deposits', label: 'Liquidity/Cash' },
              { key: 'credit', label: 'Lending & Cards' },
              { key: 'insurance', label: 'Trust & Protection' },
            ] as const
          ).map((filter) => {
            const isSelected = selectedCategory === filter.key;
            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => {
                  setSelectedCategory(filter.key);
                  onShowToast(`Filter: ${filter.label}`);
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold shrink-0 transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-dbs-red text-white shadow-sm'
                    : 'bg-dbs-card border border-dbs-border text-dbs-text-muted hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Product Accordion Cards Container */}
        <div className="space-y-2" id="products-container">
          {filteredProducts.map((prod) => {
            const isExpanded = !!expandedProducts[prod.id];
            return (
              <article
                key={prod.id}
                className="product-item rounded-xl bg-dbs-card border border-dbs-border p-3.5 shadow-md transition-all duration-200 hover:border-dbs-border-light"
              >
                <div
                  className="product-header cursor-pointer flex items-center justify-between"
                  onClick={() => toggleProductAccordion(prod.id)}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div
                      className="w-9 h-9 rounded-lg bg-dbs-card-sub border border-dbs-border flex items-center justify-center shrink-0"
                      style={{ color: prod.iconColor }}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {prod.iconName}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-1.5">
                        <span
                          className="text-[9.5px] font-bold uppercase tracking-wider"
                          style={{ color: prod.iconColor }}
                        >
                          {prod.productGroup}
                        </span>
                        <span
                          className={`inline-block px-1.5 py-0.2 rounded text-[9.5px] font-semibold ${
                            prod.badgeColor === 'green'
                              ? 'bg-dbs-green-bg text-dbs-green'
                              : prod.badgeColor === 'red'
                              ? 'bg-dbs-red-light text-dbs-red'
                              : 'bg-dbs-blue/10 text-dbs-blue'
                          }`}
                        >
                          {prod.badge}
                        </span>
                      </div>
                      <h3 className="text-[13px] font-bold text-white truncate font-display">
                        {prod.name}
                      </h3>
                      <p className="text-[11px] text-dbs-text-muted truncate">
                        {prod.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 ml-2">
                    <div className="text-right">
                      <p className="text-[14px] font-bold text-white font-mono">{prod.amount}</p>
                      <span
                        className={`text-[10px] ${
                          prod.highlightRate.includes('APY') || prod.highlightRate.includes('Yield')
                            ? 'text-dbs-green font-semibold'
                            : 'text-dbs-text-dim'
                        }`}
                      >
                        {prod.highlightRate}
                      </span>
                    </div>
                    <span
                      className={`material-symbols-outlined text-dbs-text-muted transition-transform duration-200 text-[18px] ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="pt-3 mt-3 space-y-2 border-t border-dbs-border/60 bg-dbs-card-sub/50 rounded-lg p-2.5 text-[11px] animate-in fade-in duration-150">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-dbs-text-dim text-[10px] block">
                          {prod.details.col1Label}
                        </span>
                        <span className="text-white font-medium">
                          {prod.details.col1Val}
                        </span>
                      </div>
                      <div>
                        <span className="text-dbs-text-dim text-[10px] block">
                          {prod.details.col2Label}
                        </span>
                        <span className="text-white font-medium">
                          {prod.details.col2Val}
                        </span>
                      </div>
                      <div>
                        <span className="text-dbs-text-dim text-[10px] block">
                          {prod.details.col3Label}
                        </span>
                        <span className="text-white">
                          {prod.details.col3Val}
                        </span>
                      </div>
                      <div>
                        <span className="text-dbs-text-dim text-[10px] block">
                          {prod.details.col4Label}
                        </span>
                        <span className="text-dbs-gold font-medium">
                          {prod.details.col4Val}
                        </span>
                      </div>
                    </div>

                    {/* Actions if applicable */}
                    {(prod.primaryAction || prod.secondaryAction) && (
                      <div className="pt-1.5 flex items-center gap-2">
                        {prod.primaryAction && (
                          <button
                            type="button"
                            onClick={() => {
                              if (prod.primaryAction?.actionKey === 'sweep') {
                                onShowToast('Swept $350k excess cash to AI Vickers Mandate');
                              } else if (prod.primaryAction?.actionKey === 'amortization') {
                                onShowToast('Amortization schedule downloaded');
                              } else {
                                onShowToast('AI Digibank portfolio attribution opened');
                              }
                            }}
                            className="flex-1 py-1 px-2.5 rounded-lg bg-dbs-card border border-dbs-border hover:bg-dbs-border text-white text-[10.5px] font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[14px] text-dbs-blue">
                              {prod.primaryAction.icon}
                            </span>
                            <span>{prod.primaryAction.label}</span>
                          </button>
                        )}
                        {prod.secondaryAction && (
                          <button
                            type="button"
                            onClick={onOpenRefiProposal}
                            className="py-1 px-2.5 rounded-lg bg-dbs-red-light border border-dbs-red/30 text-dbs-red text-[10.5px] font-semibold flex items-center gap-1 transition-colors cursor-pointer hover:bg-dbs-red hover:text-white"
                          >
                            <span className="material-symbols-outlined text-[14px]">
                              {prod.secondaryAction.icon}
                            </span>
                            <span>{prod.secondaryAction.label}</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* 5. External Wallet & Competitor Radar Section */}
      <section className="rounded-xl bg-dbs-card border border-dbs-border p-4 shadow-xl space-y-3.5 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-md bg-dbs-red-light flex items-center justify-center text-dbs-red">
              <span className="material-symbols-outlined text-[18px]">radar</span>
            </div>
            <div>
              <h2 className="text-[13.5px] font-bold text-white font-display">
                External Wallet & Competitor Radar
              </h2>
              <p className="text-[10.5px] text-dbs-text-muted">
                Share-of-wallet analysis & rival displacement tactics
              </p>
            </div>
          </div>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-dbs-red-light text-dbs-red text-[10px] font-bold border border-dbs-red/20">
            <span className="w-1.5 h-1.5 rounded-full bg-dbs-red mr-1 animate-pulse"></span>
            45% At Risk
          </span>
        </div>

        {/* Wallet Distribution Metric Banner */}
        <div className="rounded-lg bg-dbs-card-sub border border-dbs-border/70 p-3 space-y-2">
          <div className="flex justify-between items-baseline">
            <span className="text-[10px] font-semibold text-dbs-text-muted uppercase tracking-wider">
              Est. Total Liquid Wallet
            </span>
            <span className="text-base font-bold text-white font-display">
              $26,650,000
            </span>
          </div>

          {/* Segmented Share Bar */}
          <div className="w-full bg-dbs-card-lowest h-2.5 rounded-full overflow-hidden flex border border-dbs-border/50">
            <div
              className="bg-dbs-green h-full"
              style={{ width: '55.7%' }}
              title="MBAI Share: $14.85M (55.7%)"
            ></div>
            <div
              className="bg-dbs-red h-full"
              style={{ width: '44.3%' }}
              title="Competitor Wallet: $11.80M (44.3%)"
            ></div>
          </div>

          <div className="flex justify-between items-center text-[11px]">
            <span className="text-dbs-green font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-dbs-green"></span>
              MBAI Share: $14.85M (55.7%)
            </span>
            <span className="text-dbs-red font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-dbs-red"></span>
              Rival Wallet: $11.80M (44.3%)
            </span>
          </div>
        </div>

        {/* Competitor Threat Cards List */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between text-[10.5px]">
            <span className="font-semibold text-dbs-text-muted uppercase tracking-wider text-[10px]">
              Key Competitor Institutions
            </span>
            <span className="text-dbs-text-dim">
              {client.competitors.length} Active Headwinds
            </span>
          </div>

          {client.competitors.map((comp) => (
            <div
              key={comp.id}
              className="p-3 rounded-lg bg-dbs-card-sub/90 border border-dbs-border/80 space-y-2"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded bg-[#1f293d] flex items-center justify-center text-white font-bold text-[11px] border border-dbs-border">
                    #{comp.rank}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[12.5px] font-bold text-white">
                        {comp.institution}
                      </span>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[9px] font-bold border ${
                          comp.threatBadgeColor === 'red'
                            ? 'bg-dbs-red-light text-dbs-red border-dbs-red/20'
                            : 'bg-dbs-gold-bg text-dbs-gold border-dbs-gold/20'
                        }`}
                      >
                        {comp.threatLevel}
                      </span>
                    </div>
                    <span className="text-[10px] text-dbs-text-dim">
                      {comp.detailNote}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[13px] font-bold text-white font-mono">
                    {comp.estWallet}
                  </span>
                  <span className="text-[9px] text-dbs-text-muted block">
                    {comp.walletShare}
                  </span>
                </div>
              </div>

              <div className="p-2 rounded bg-dbs-card-lowest/90 border border-dbs-border/40 text-[10.5px] space-y-1.5">
                <div className="flex items-start space-x-1.5">
                  <span className="text-dbs-gold font-bold text-[10px] uppercase shrink-0">
                    Pitch:
                  </span>
                  <span className="text-dbs-text-muted leading-relaxed">
                    {comp.pitch}
                  </span>
                </div>
                <div className="flex items-start space-x-1.5">
                  <span className="text-dbs-green font-bold text-[10px] uppercase shrink-0">
                    Counter:
                  </span>
                  <span className="text-white font-medium leading-relaxed">
                    {comp.counter}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onOpenCounterPitch(comp)}
                className="w-full py-1.5 px-2.5 rounded-lg bg-dbs-card hover:bg-dbs-border border border-dbs-border text-white text-[11px] font-medium flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer hover:border-dbs-red/50"
                type="button"
              >
                <span className="material-symbols-outlined text-[14px] text-dbs-red">
                  swords
                </span>
                <span>Generate Counter-Pitch Deck (1-Click)</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Relationship Notes & Advisor Comments */}
      <section
        id="relationship-notes"
        className="rounded-xl bg-dbs-card border border-dbs-border p-4 shadow-lg space-y-3.5 scroll-mt-20"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-md bg-dbs-blue/15 flex items-center justify-center text-dbs-blue border border-dbs-blue/20">
              <span className="material-symbols-outlined text-[17px]">sticky_note_2</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-[14px] font-bold text-white font-display">
                  Relationship Notes & Advisor Comments
                </h2>
                <span className="text-[10px] font-bold text-dbs-blue bg-dbs-blue/10 px-2 py-0.2 rounded border border-dbs-blue/20 uppercase tracking-wider">
                  Confidential
                </span>
              </div>
              <p className="text-[11px] text-dbs-text-muted">
                Document customer remarks, private banker commentary, meeting takeaways, and credit instructions
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-dbs-text-dim">
              Logged by: <span className="text-white font-semibold">Jo Yeong</span> (RM)
            </span>
            <span className="text-[10.5px] px-2 py-0.5 rounded bg-dbs-card-lowest text-dbs-text-dim border border-dbs-border font-mono">
              {notes.length} total
            </span>
          </div>
        </div>

        {/* Note Composer Form / Text Space */}
        <form
          onSubmit={handleAddNote}
          className="rounded-lg bg-dbs-card-sub border border-dbs-border/80 p-3 space-y-2.5"
        >
          <div className="flex items-center justify-between">
            <label htmlFor="new-note-input" className="text-[11px] font-semibold text-white flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-dbs-red">edit</span>
              <span>New Relationship Note / Observation</span>
            </label>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1 text-[10.5px] text-dbs-text-dim hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={newNoteIsPinned}
                  onChange={(e) => setNewNoteIsPinned(e.target.checked)}
                  className="rounded bg-dbs-card-lowest border-dbs-border text-dbs-red focus:ring-0 cursor-pointer"
                />
                <span className="material-symbols-outlined text-[13px] text-dbs-gold">push_pin</span>
                <span>Pin to top</span>
              </label>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            id="new-note-input"
            rows={3}
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder="Type confidential note, client observation, meeting comment, or cross-desk instructions for Alexander Sterling..."
            className="w-full bg-dbs-card-lowest border border-dbs-border rounded-lg p-2.5 text-[12px] text-white placeholder-dbs-text-dim focus:outline-none focus:border-dbs-red resize-none transition-colors"
          />

          {/* Category Selector Pills & Post Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-0.5">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              <span className="text-[10px] text-dbs-text-dim uppercase tracking-wider shrink-0 mr-1">
                Category:
              </span>
              {(['Client Comment', 'Meeting Note', 'Credit Instruction', 'Advisory Strategy'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setNewNoteCategory(cat)}
                  className={`px-2.5 py-1 rounded text-[10.5px] font-medium transition-colors cursor-pointer shrink-0 ${
                    newNoteCategory === cat
                      ? 'bg-dbs-red text-white shadow-sm font-semibold'
                      : 'bg-dbs-card-lowest text-dbs-text-muted hover:text-white border border-dbs-border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={!newNoteText.trim()}
              className="py-1.5 px-4 rounded-lg bg-dbs-red hover:bg-dbs-red-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-[11.5px] font-bold flex items-center justify-center gap-1.5 shadow-md shadow-dbs-red/20 transition-all cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-[14px]">send</span>
              <span>Post Note</span>
            </button>
          </div>
        </form>

        {/* Filter Chips Bar */}
        <div className="flex items-center justify-between pt-1 border-t border-dbs-border/60 text-[11px]">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {['All', 'Client Comment', 'Meeting Note', 'Credit Instruction', 'Advisory Strategy'].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setNoteFilter(f)}
                className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-medium transition-colors cursor-pointer ${
                  noteFilter === f
                    ? 'bg-white text-[#0B111E] font-semibold'
                    : 'bg-dbs-card-lowest text-dbs-text-dim hover:text-white border border-dbs-border/60'
                }`}
              >
                {f === 'All' ? `All Notes (${notes.length})` : f}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-dbs-text-dim hidden sm:inline">
            Showing {filteredNotes.length} notes
          </span>
        </div>

        {/* Notes Feed */}
        <div className="space-y-2.5">
          {filteredNotes.length === 0 ? (
            <div className="p-6 text-center rounded-lg bg-dbs-card-lowest/60 border border-dashed border-dbs-border text-dbs-text-dim text-[11.5px]">
              No notes found in this category. Write the first note above.
            </div>
          ) : (
            filteredNotes.map((item) => (
              <article
                key={item.id}
                className="rounded-lg bg-dbs-card-sub/90 border border-dbs-border p-3.5 space-y-2 hover:border-dbs-border-light transition-all"
              >
                {/* Note Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-dbs-card-lowest border border-dbs-border flex items-center justify-center text-white text-[10px] font-bold">
                      {item.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[12px] font-bold text-white">{item.author}</span>
                        <span className="text-[10px] text-dbs-text-dim">• {item.role}</span>
                        {item.isPinned && (
                          <span className="inline-flex items-center gap-0.5 text-[9.5px] font-bold text-dbs-gold bg-dbs-gold-bg px-1.5 py-0.2 rounded border border-dbs-gold/30">
                            <span className="material-symbols-outlined text-[10px]">push_pin</span>
                            Pinned
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-dbs-text-dim font-mono">{item.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <span
                      className={`text-[9.5px] font-bold px-2 py-0.2 rounded border ${
                        item.category === 'Client Comment'
                          ? 'bg-dbs-blue/10 text-dbs-blue border-dbs-blue/25'
                          : item.category === 'Credit Instruction'
                          ? 'bg-dbs-red-light text-dbs-red border-dbs-red/25'
                          : item.category === 'Meeting Note'
                          ? 'bg-dbs-green-bg text-dbs-green border-dbs-green/25'
                          : 'bg-dbs-gold-bg text-dbs-gold border-dbs-gold/25'
                      }`}
                    >
                      {item.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => togglePinNote(item.id)}
                      title={item.isPinned ? 'Unpin' : 'Pin note'}
                      className="p-1 text-dbs-text-dim hover:text-dbs-gold transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">
                        {item.isPinned ? 'keep_public' : 'push_pin'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Note Text Body */}
                <p className="text-[12px] text-white/90 leading-relaxed pl-8">
                  {item.text}
                </p>

                {/* Comments / Replies Thread */}
                {item.comments.length > 0 && (
                  <div className="ml-8 space-y-1.5 pt-1.5 border-t border-dbs-border/40">
                    <span className="text-[9.5px] font-bold text-dbs-text-dim uppercase tracking-wider block">
                      Team Comments ({item.comments.length})
                    </span>
                    {item.comments.map((comm) => (
                      <div
                        key={comm.id}
                        className="p-2 rounded bg-dbs-card-lowest/90 border border-dbs-border/50 text-[11px] space-y-0.5"
                      >
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-dbs-blue">{comm.author}</span>
                          <span className="text-dbs-text-dim font-mono">{comm.date}</span>
                        </div>
                        <p className="text-dbs-text-muted leading-relaxed">{comm.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Inline Reply Composer */}
                {activeReplyId === item.id ? (
                  <div className="ml-8 pt-2 space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Add a comment or follow-up note..."
                        className="flex-1 bg-dbs-card-lowest border border-dbs-border rounded-lg px-2.5 py-1 text-[11.5px] text-white focus:outline-none focus:border-dbs-red"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddComment(item.id);
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleAddComment(item.id)}
                        disabled={!replyText.trim()}
                        className="px-2.5 py-1 rounded-lg bg-dbs-red hover:bg-dbs-red-hover disabled:opacity-40 text-white text-[10.5px] font-semibold cursor-pointer"
                      >
                        Send
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveReplyId(null);
                          setReplyText('');
                        }}
                        className="px-2 py-1 text-dbs-text-dim hover:text-white text-[10.5px] cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between pl-8 pt-1 text-[10.5px] text-dbs-text-dim">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveReplyId(item.id);
                        setReplyText('');
                      }}
                      className="inline-flex items-center gap-1 text-dbs-text-muted hover:text-white transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[13px]">add_comment</span>
                      <span>Add Comment / Follow-up</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(item.text);
                        onShowToast('Note copied to clipboard');
                      }}
                      className="inline-flex items-center gap-1 text-dbs-text-dim hover:text-white transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[13px]">content_copy</span>
                      <span>Copy</span>
                    </button>
                  </div>
                )}
              </article>
            ))
          )}
        </div>
      </section>

      {/* 7. DBS RM Intelligence & Next Best Action */}
      <section className="rounded-xl bg-gradient-to-br from-dbs-card via-dbs-card to-[#1B1622] border border-dbs-border p-4 shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-dbs-red/10 blur-2xl pointer-events-none"></div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-dbs-red animate-pulse"></span>
            <h3 className="text-[13.5px] font-bold text-white font-display">
              MBAI RM Intelligence & Next Best Action
            </h3>
          </div>
          <span className="text-[10px] font-bold text-dbs-red uppercase tracking-wider bg-dbs-red-light px-2 py-0.5 rounded border border-dbs-red/20">
            Alpha Opportunity
          </span>
        </div>

        {/* Actionable Cross-Sell Notice Card */}
        <div
          onClick={onOpenRefiProposal}
          className="rounded-lg bg-dbs-card-lowest/90 border border-dbs-border/70 p-3 mb-3 flex items-start space-x-2.5 cursor-pointer hover:border-dbs-gold/50 transition-colors"
        >
          <div className="w-8 h-8 rounded-md bg-dbs-red-light flex items-center justify-center text-dbs-red shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[18px]">lightbulb</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] font-bold text-white">
                {client.nextBestAction.title}
              </span>
              <span className="text-[10px] text-dbs-gold font-bold bg-dbs-gold-bg px-1.5 py-0.2 rounded">
                {client.nextBestAction.timing}
              </span>
            </div>
            <p className="text-[11px] text-dbs-text-muted mt-1 leading-relaxed">
              {client.nextBestAction.description}
            </p>
          </div>
        </div>

        {/* Primary Action CTA Button */}
        <button
          onClick={onNavigateToAdvisory}
          className="w-full py-2.5 px-4 rounded-lg bg-dbs-red hover:bg-dbs-red-hover text-white font-semibold text-[13px] flex items-center justify-center space-x-2 shadow-lg shadow-dbs-red/25 transition-all active:scale-[0.99] cursor-pointer"
          type="button"
          id="btn-explore-advisory-blueprint"
        >
          <span className="material-symbols-outlined text-[18px]">insights</span>
          <span>{client.nextBestAction.cta}</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </section>
    </div>
  );
};
