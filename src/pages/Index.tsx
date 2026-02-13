import { useState, useEffect } from "react";
import { Settings, Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import BottomNavigation from "@/components/BottomNavigation";
import ChannelSidebar from "@/components/ChannelSidebar";
import MainContent from "@/components/MainContent";
import SettingsDialog from "@/components/SettingsDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
const Index = () => {
  const {
    user,
    session,
    loading,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<"feed" | "channels" | "messages">("channels");
  const [activeChannel, setActiveChannel] = useState("general");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<{
    id: string;
    username: string;
    display_name: string | null;
    avatar_url: string | null;
    city: string | null;
  } | null>(null);
  useEffect(() => {
    if (!loading && !session) {
      navigate("/auth");
    }
  }, [loading, session, navigate]);
  useEffect(() => {
    if (user) {
      // Fetch user profile
      const fetchProfile = async () => {
        const {
          data
        } = await supabase.from("profiles").select("*").eq("id", user.id).single();
        setProfile(data);
      };
      fetchProfile();

      // Join all default channels
      const joinChannels = async () => {
        const {
          data: channels
        } = await supabase.from("channels").select("id");
        if (channels) {
          for (const channel of channels) {
            await supabase.from("channel_members").upsert({
              channel_id: channel.id,
              user_id: user.id
            }, {
              onConflict: "channel_id,user_id"
            });
          }
        }
      };
      joinChannels();
    }
  }, [user]);
  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };
  if (loading) {
    return <div className="w-full h-full flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="text-lg text-foreground">Loading...</div>
        </div>
      </div>;
  }
  if (!session) {
    return null;
  }
  return <div className="w-full h-full flex flex-col bg-background">
      {/* Top Header with Profile */}
      <div className="h-14 px-3 md:px-4 flex items-center justify-between border-b border-border bg-card">
        <div className="flex items-center gap-2">
          {/* Mobile Menu Button */}
          {activeView === "channels" && <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-60 p-0">
                <ChannelSidebar activeChannel={activeChannel} onChannelSelect={channel => {
              setActiveChannel(channel);
              setSidebarOpen(false);
            }} />
              </SheetContent>
            </Sheet>}
          <h1 className="md:text-lg font-semibold text-foreground font-['New York'] text-[26px] text-left">ArticAirHybrid</h1>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden sm:flex flex-col items-end mr-2">
            <span className="text-sm font-medium text-foreground">
              {profile?.display_name || "User"}
            </span>
            <span className="text-xs text-muted-foreground">
              {profile?.city || "Set your city"}
            </span>
          </div>
          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setSettingsOpen(true)}>
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 hidden md:flex" onClick={handleSignOut}>
            <LogOut className="h-5 w-5" />
          </Button>
          <Avatar className="w-9 h-9 cursor-pointer">
            <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {profile?.display_name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Channel Sidebar - Desktop Only */}
        {activeView === "channels" && <div className="hidden md:block">
            <ChannelSidebar activeChannel={activeChannel} onChannelSelect={setActiveChannel} />
          </div>}

        {/* Content */}
        <MainContent activeView={activeView} activeChannel={activeChannel} />
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeView={activeView} onViewChange={setActiveView} />

      {/* Settings Dialog */}
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>;
};
export default Index;