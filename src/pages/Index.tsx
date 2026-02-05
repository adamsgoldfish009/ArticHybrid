import { useState } from "react";
import { Settings } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import ChannelSidebar from "@/components/ChannelSidebar";
import MainContent from "@/components/MainContent";
import SettingsDialog from "@/components/SettingsDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [activeView, setActiveView] = useState<"feed" | "channels" | "messages">("channels");
  const [activeChannel, setActiveChannel] = useState("general");
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="w-full h-full flex flex-col bg-background">
      {/* Top Header with Profile */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-border bg-card">
        <h1 className="text-lg font-semibold text-foreground">Social App</h1>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => setSettingsOpen(true)}
          >
            <Settings className="h-5 w-5" />
          </Button>
          <Avatar className="w-9 h-9 cursor-pointer">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-primary text-primary-foreground">ME</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Channel Sidebar */}
        {activeView === "channels" && (
          <ChannelSidebar 
            activeChannel={activeChannel}
            onChannelSelect={setActiveChannel}
          />
        )}

        {/* Content */}
        <MainContent 
          activeView={activeView}
          activeChannel={activeChannel}
        />
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeView={activeView} 
        onViewChange={setActiveView}
      />

      {/* Settings Dialog */}
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
};

export default Index;
