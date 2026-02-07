import { useState } from "react";
import { Settings, Menu } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import ChannelSidebar from "@/components/ChannelSidebar";
import MainContent from "@/components/MainContent";
import SettingsDialog from "@/components/SettingsDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Index = () => {
  const [activeView, setActiveView] = useState<"feed" | "channels" | "messages">("channels");
  const [activeChannel, setActiveChannel] = useState("general");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full h-full flex flex-col bg-background">
      {/* Top Header with Profile */}
      <div className="h-14 px-3 md:px-4 flex items-center justify-between border-b border-border bg-card">
        <div className="flex items-center gap-2">
          {/* Mobile Menu Button */}
          {activeView === "channels" && (
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-60 p-0">
                <ChannelSidebar 
                  activeChannel={activeChannel}
                  onChannelSelect={(channel) => {
                    setActiveChannel(channel);
                    setSidebarOpen(false);
                  }}
                />
              </SheetContent>
            </Sheet>
          )}
          <h1 className="text-base md:text-lg font-semibold text-foreground">Social App</h1>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden sm:flex flex-col items-end mr-2">
            <span className="text-sm font-medium text-foreground">John Doe</span>
            <span className="text-xs text-muted-foreground">San Francisco, CA</span>
          </div>
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
        {/* Channel Sidebar - Desktop Only */}
        {activeView === "channels" && (
          <div className="hidden md:block">
            <ChannelSidebar 
              activeChannel={activeChannel}
              onChannelSelect={setActiveChannel}
            />
          </div>
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
