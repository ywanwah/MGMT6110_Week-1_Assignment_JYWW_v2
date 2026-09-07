export type NavigationTab = 'client360' | 'advisory' | 'revenue' | 'insights';

export type ProductCategory = 'all' | 'wealth' | 'deposits' | 'credit' | 'insurance';

export interface ClientProfile {
  id: string;
  name: string;
  avatarUrl: string;
  cif: string;
  tier: string;
  organization: string;
  age: number;
  role: string;
  kycStatus: 'clean' | 'review_pending' | 'flagged';
  kycReviewIn: string;
  internalRating: {
    code: string;
    description: string;
    pd: string;
  };
  riskProfile: {
    label: string;
    score: number;
    maxScore: number;
  };
  liquidityTier: {
    tier: string;
    liquidAmountSGD: string;
  };
  balance: {
    trvUSD: number;
    trvFormatted: string;
    trvSGD: string;
    yoyChange: string;
    performanceNote: string;
    netBankPosition: string;
    netBankPositionStatus: string;
    wealthAum: string;
    wealthAumChange: string;
    totalFacilities: string;
    facilitiesBenchmark: string;
    allocation: {
      wealth: number;
      deposits: number;
      mortgage: number;
      lifeInsurance: number;
      liquidUnpledged: string;
    };
  };
  credit: {
    approvedLimit: string;
    approvedLimitNum: number;
    drawnAmount: string;
    drawnAmountNum: number;
    drawnPct: string;
    availableHeadroom: string;
    facilities: Array<{
      id: string;
      name: string;
      tag: string;
      desc: string;
      drawnText: string;
      subText: string;
      type: 'mortgage' | 'lombard' | 'card';
      color: string;
    }>;
    collateral: {
      pledgedTotal: string;
      eligibleValue: string;
      weightedLtv: string;
      ltvTrigger: string;
      headroomBuffer: string;
      excessMargin: string;
      marginCalls24m: number;
      revaluationDate: string;
      assets: Array<{
        name: string;
        marketValue: string;
        haircut: string;
        eligibleValue: string;
        icon: string;
        color: string;
      }>;
    };
  };
  products: CoreProduct[];
  competitors: CompetitorThreat[];
  nextBestAction: {
    title: string;
    timing: string;
    description: string;
    cta: string;
  };
}

export interface CoreProduct {
  id: string;
  name: string;
  category: 'wealth' | 'deposits' | 'credit' | 'insurance';
  productGroup: string;
  badge: string;
  badgeColor: string;
  subtitle: string;
  amount: string;
  highlightRate: string;
  iconName: string;
  iconColor: string;
  details: {
    col1Label: string;
    col1Val: string;
    col2Label: string;
    col2Val: string;
    col3Label: string;
    col3Val: string;
    col4Label: string;
    col4Val: string;
  };
  primaryAction?: {
    label: string;
    icon: string;
    actionKey: string;
  };
  secondaryAction?: {
    label: string;
    icon: string;
    actionKey: string;
  };
}

export interface CompetitorThreat {
  id: string;
  rank: number;
  institution: string;
  threatLevel: 'High Threat' | 'Active RFP' | 'High Yield Threat';
  threatBadgeColor: string;
  estWallet: string;
  walletShare: string;
  detailNote: string;
  pitch: string;
  counter: string;
  advantageRate?: string;
}

export interface AdvisoryYearPlan {
  year: number;
  headline: string;
  timeframe: string;
  projectedTrv: string;
  incrementalRevenue: string;
  coreInitiative: string;
  actions: string[];
  status: 'active' | 'scheduled' | 'pipeline';
  productsRecommended: string[];
}

export interface RevenueMetric {
  annualGrossFee: string;
  runRateYoY: string;
  returnOnAssetsBps: string;
  pipelineOpportunity: string;
  categories: Array<{
    name: string;
    amount: string;
    pct: number;
    basis: string;
    color: string;
  }>;
  feeConcessions: Array<{
    facility: string;
    standardRate: string;
    approvedRate: string;
    expiryDate: string;
    revenueImpact: string;
  }>;
}

export interface ResearchInsight {
  id: string;
  category: 'Rates & SOFR' | 'Equities & Tech' | 'FX & Currency' | 'Structured Notes';
  title: string;
  published: string;
  author: string;
  summary: string;
  readTime: string;
  clientRelevance: string;
  tags: string[];
}
