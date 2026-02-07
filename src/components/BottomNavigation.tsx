import { useState } from "react";
import { Home, Hash, MessageCircle, Camera, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CameraDialog from "./CameraDialog";
import NotificationsDialog from "./NotificationsDialog";

interface BottomNavigationProps {
  activeView: "feed" | "channels" | "messages";
  onViewChange: (view: "feed" | "channels" | "messages") => void;
}

const BottomNavigation = ({ activeView, onViewChange }: BottomNavigationProps) => {
  const [cameraOpen, setCameraOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const unreadCount = 5; // Mock unread notifications count

  const navItems = [
    { id: "feed" as const, icon: Home, label: "Feed" },
    { id: "channels" as const, icon: Hash, label: "Channels" },
    { id: "messages" as const, icon: MessageCircle, label: "Messages" },
  ];

  return (
    <>
      <div className="h-16 bg-card border-t border-border flex items-center justify-center gap-1 px-2 safe-area-inset-bottom">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={`flex-1 max-w-[100px] h-12 flex flex-col items-center justify-center gap-0.5 transition-all ${
              activeView === item.id
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "hover:bg-accent"
            }`}
            onClick={() => onViewChange(item.id)}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] md:text-xs font-medium">{item.label}</span>
          </Button>
        ))}
        
        {/* Notifications Button */}
        <Button
          variant="ghost"
          className="flex-1 max-w-[100px] h-12 flex flex-col items-center justify-center gap-0.5 transition-all hover:bg-accent relative"
          onClick={() => setNotificationsOpen(true)}
        >
          <div className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-4 min-w-4 flex items-center justify-center p-0 text-[10px]"
              >
                {unreadCount}
              </Badge>
            )}
          </div>
          <span className="text-[10px] md:text-xs font-medium">Alerts</span>
        </Button>

        {/* Camera Button */}
        <Button
          variant="ghost"
          className="flex-1 max-w-[100px] h-12 flex flex-col items-center justify-center gap-0.5 transition-all hover:bg-accent"
          onClick={() => setCameraOpen(true)}
        >
          <Camera className="h-5 w-5" />
          <span className="text-[10px] md:text-xs font-medium">Camera</span>
        </Button>
      </div>

      <CameraDialog open={cameraOpen} onOpenChange={setCameraOpen} />
      <NotificationsDialog open={notificationsOpen} onOpenChange={setNotificationsOpen} />
    </>
  );
};

export default BottomNavigation;
