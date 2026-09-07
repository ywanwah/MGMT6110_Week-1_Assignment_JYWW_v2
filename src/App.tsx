import React, { useState } from 'react';
import { NavigationTab, ClientProfile, CompetitorThreat } from './types';
import { CLIENT_ALEXANDER_STERLING, RM_PROFILE } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Client360View } from './components/Client360View';
import { FiveYearAdvisoryView } from './components/FiveYearAdvisoryView';
import { RmRevenueView } from './components/RmRevenueView';
import { InsightsView } from './components/InsightsView';
import { Toast } from './components/Toast';
import { CallNoteModal } from './components/modals/CallNoteModal';
import { ScheduleReviewModal } from './components/modals/ScheduleReviewModal';
import { ExportDossierModal } from './components/modals/ExportDossierModal';
import { CounterPitchModal } from './components/modals/CounterPitchModal';
import { RefinanceModal } from './components/modals/RefinanceModal';
import { ClientSwitcherModal } from './components/modals/ClientSwitcherModal';

export default function App() {
  const [currentClient, setCurrentClient] = useState<ClientProfile>(CLIENT_ALEXANDER_STERLING);
  const [activeTab, setActiveTab] = useState<NavigationTab>('client360');

  // Modal states
  const [isCallNoteOpen, setIsCallNoteOpen] = useState(false);
  const [isScheduleReviewOpen, setIsScheduleReviewOpen] = useState(false);
  const [isExportDossierOpen, setIsExportDossierOpen] = useState(false);
  const [isRefiOpen, setIsRefiOpen] = useState(false);
  const [isClientSwitcherOpen, setIsClientSwitcherOpen] = useState(false);
  const [isCounterPitchOpen, setIsCounterPitchOpen] = useState(false);
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorThreat | null>(null);

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2400);
  };

  const handleOpenCounterPitch = (comp: CompetitorThreat) => {
    setSelectedCompetitor(comp);
    setIsCounterPitchOpen(true);
  };

  const handleSaveNote = (note: string, category: string) => {
    showToast(`RM Call note recorded: "${category}"`);
  };

  const handleScheduleReview = (dateTime: string, location: string, agenda: string) => {
    showToast(`Review scheduled for ${dateTime} with Outlook/Digibank sync`);
  };

  const handleExportDossier = () => {
    showToast(`AI Treasures Private Client Dossier generated for ${currentClient.name}`);
    setIsExportDossierOpen(false);
  };

  const handleDispatchDeck = (institution: string) => {
    showToast(`1-Click Counter-Pitch Deck generated against ${institution}`);
  };

  const handleSubmitRefi = () => {
    showToast(`Refinance & Lombard package term sheet dispatched to Credit Committee`);
  };

  const handleSelectClient = (newClient: ClientProfile) => {
    setCurrentClient(newClient);
    showToast(`Switched active book to ${newClient.name} (${newClient.tier})`);
  };

  const handleOpenRMNotification = () => {
    showToast(`RM Alerts: 3 pending action items across ${currentClient.name}'s book`);
  };

  return (
    <div className="bg-[#0B111E] text-[#F8FAFC] font-sans min-h-screen flex flex-col antialiased selection:bg-dbs-red/30 selection:text-white">
      {/* Fixed DBS Header */}
      <Header
        currentClient={currentClient}
        onOpenClientSwitcher={() => setIsClientSwitcherOpen(true)}
        onOpenNotification={handleOpenRMNotification}
      />

      {/* Main Screen Content */}
      <main className="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-[#0B111E]">
        {activeTab === 'client360' && (
          <Client360View
            client={currentClient}
            onOpenCallNote={() => setIsCallNoteOpen(true)}
            onOpenScheduleReview={() => setIsScheduleReviewOpen(true)}
            onOpenExportDossier={() => setIsExportDossierOpen(true)}
            onOpenCounterPitch={handleOpenCounterPitch}
            onOpenRefiProposal={() => setIsRefiOpen(true)}
            onNavigateToAdvisory={() => setActiveTab('advisory')}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'advisory' && (
          <FiveYearAdvisoryView
            client={currentClient}
            onShowToast={showToast}
            onOpenRefiModal={() => setIsRefiOpen(true)}
          />
        )}

        {activeTab === 'revenue' && (
          <RmRevenueView
            client={currentClient}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'insights' && (
          <InsightsView
            client={currentClient}
            onShowToast={showToast}
            onOpenCounterPitch={handleOpenCounterPitch}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />

      {/* Action Modals */}
      <CallNoteModal
        client={currentClient}
        isOpen={isCallNoteOpen}
        onClose={() => setIsCallNoteOpen(false)}
        onSaveNote={handleSaveNote}
      />

      <ScheduleReviewModal
        client={currentClient}
        isOpen={isScheduleReviewOpen}
        onClose={() => setIsScheduleReviewOpen(false)}
        onSchedule={handleScheduleReview}
      />

      <ExportDossierModal
        client={currentClient}
        isOpen={isExportDossierOpen}
        onClose={() => setIsExportDossierOpen(false)}
        onExport={handleExportDossier}
      />

      <CounterPitchModal
        competitor={selectedCompetitor}
        client={currentClient}
        isOpen={isCounterPitchOpen}
        onClose={() => setIsCounterPitchOpen(false)}
        onDispatchDeck={handleDispatchDeck}
      />

      <RefinanceModal
        client={currentClient}
        isOpen={isRefiOpen}
        onClose={() => setIsRefiOpen(false)}
        onSubmitProposal={handleSubmitRefi}
      />

      <ClientSwitcherModal
        currentClientId={currentClient.id}
        isOpen={isClientSwitcherOpen}
        onClose={() => setIsClientSwitcherOpen(false)}
        onSelectClient={handleSelectClient}
      />

      {/* Floating Micro-interaction Toast */}
      <Toast message={toastMessage} visible={toastVisible} />
    </div>
  );
}
