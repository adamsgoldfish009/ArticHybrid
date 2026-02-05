import { Home, Hash, MessageCircle, Video, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface LeftNavigationProps {
  activeView: "feed" | "channels" | "messages";
  onViewChange: (view: "feed" | "channels" | "messages") => void;
  onSettingsClick: () => void;
}

const LeftNavigation = ({ activeView, onViewChange, onSettingsClick }: LeftNavigationProps) => {
  const navItems = [
    { id: "feed" as const, icon: Home, label: "Feed" },
    { id: "channels" as const, icon: Hash, label: "Channels" },
    { id: "messages" as const, icon: MessageCircle, label: "Messages" },
  ];

  return (
    <div className="w-[72px] bg-[hsl(var(--nav-background))] flex flex-col items-center py-3 gap-2">
      {/* Profile Avatar */}
      <Avatar className="w-12 h-12 mb-2 cursor-pointer hover:rounded-2xl transition-all">
        <AvatarImage src="/placeholder.svg" />
        <AvatarFallback className="bg-primary text-primary-foreground">ME</AvatarFallback>
      </Avatar>

      <Separator className="w-8" />

      {/* Navigation Items */}
      {navItems.map((item) => (
        <Button
          key={item.id}
          variant="ghost"
          size="icon"
          className={`w-12 h-12 rounded-2xl transition-all ${
            activeView === item.id
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "hover:bg-accent hover:rounded-xl"
          }`}
          onClick={() => onViewChange(item.id)}
        >
          <item.icon className="h-6 w-6" />
        </Button>
      ))}

      {/* Settings at bottom */}
      <div className="flex-1" />
      <Button
        variant="ghost"
        size="icon"
        className="w-12 h-12 rounded-2xl hover:bg-accent hover:rounded-xl transition-all"
        onClick={onSettingsClick}
      >
        <Settings className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default LeftNavigation;
