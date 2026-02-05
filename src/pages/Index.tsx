import { useState } from "react";
import LeftNavigation from "@/components/LeftNavigation";
import ChannelSidebar from "@/components/ChannelSidebar";
import MainContent from "@/components/MainContent";
import SettingsDialog from "@/components/SettingsDialog";

const Index = () => {
  const [activeView, setActiveView] = useState<"feed" | "channels" | "messages">("channels");
  const [activeChannel, setActiveChannel] = useState("general");
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="w-full h-full flex bg-background">
      {/* Left Navigation */}
      <LeftNavigation 
        activeView={activeView} 
        onViewChange={setActiveView}
        onSettingsClick={() => setSettingsOpen(true)}
      />

      {/* Channel Sidebar */}
      {activeView === "channels" && (
        <ChannelSidebar 
          activeChannel={activeChannel}
          onChannelSelect={setActiveChannel}
        />
      )}

      {/* Main Content Area */}
      <MainContent 
        activeView={activeView}
        activeChannel={activeChannel}
      />

      {/* Settings Dialog */}
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
};

export default Index;
