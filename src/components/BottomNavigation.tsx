import { useState } from "react";
import { Home, Hash, MessageCircle, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import CameraDialog from "./CameraDialog";

interface BottomNavigationProps {
  activeView: "feed" | "channels" | "messages";
  onViewChange: (view: "feed" | "channels" | "messages") => void;
}

const BottomNavigation = ({ activeView, onViewChange }: BottomNavigationProps) => {
  const [cameraOpen, setCameraOpen] = useState(false);

  const navItems = [
    { id: "feed" as const, icon: Home, label: "Feed" },
    { id: "channels" as const, icon: Hash, label: "Channels" },
    { id: "messages" as const, icon: MessageCircle, label: "Messages" },
  ];

  return (
    <>
      <div className="h-16 bg-card border-t border-border flex items-center justify-center gap-2 px-4">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={`flex-1 max-w-[150px] h-12 flex flex-col items-center justify-center gap-1 transition-all ${
              activeView === item.id
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "hover:bg-accent"
            }`}
            onClick={() => onViewChange(item.id)}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </Button>
        ))}
        
        {/* Camera Button */}
        <Button
          variant="ghost"
          className="flex-1 max-w-[150px] h-12 flex flex-col items-center justify-center gap-1 transition-all hover:bg-accent"
          onClick={() => setCameraOpen(true)}
        >
          <Camera className="h-5 w-5" />
          <span className="text-xs font-medium">Camera</span>
        </Button>
      </div>

      <CameraDialog open={cameraOpen} onOpenChange={setCameraOpen} />
    </>
  );
};

export default BottomNavigation;
