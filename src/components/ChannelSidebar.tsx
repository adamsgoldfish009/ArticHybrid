import { Hash, Plus, ChevronDown, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
interface ChannelSidebarProps {
  activeChannel: string;
  onChannelSelect: (channel: string) => void;
}
const ChannelSidebar = ({
  activeChannel,
  onChannelSelect
}: ChannelSidebarProps) => {
  const textChannels = [{
    id: "general",
    name: "general"
  }, {
    id: "random",
    name: "random"
  }, {
    id: "memes",
    name: "memes"
  }, {
    id: "tech-talk",
    name: "tech-talk"
  }];
  const voiceChannels = [{
    id: "voice-general",
    name: "General Voice"
  }, {
    id: "voice-gaming",
    name: "Gaming"
  }, {
    id: "voice-music",
    name: "Music Room"
  }];
  return <div className="w-60 bg-sidebar flex flex-col border-r border-border">
      {/* Server Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-border shadow-sm">
        <span className="font-semibold text-sidebar-foreground York'] font-['New York'] text-[20px]">Your Community</span>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {/* Text Channels */}
          <div className="mb-4">
            <div className="flex items-center justify-between px-2 mb-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Text Channels
              </span>
              <Button variant="ghost" size="icon" className="h-4 w-4">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            {textChannels.map(channel => {})}
          </div>

          <Separator className="my-2" />

          {/* Voice Channels */}
          <div>
            <div className="flex items-center justify-between px-2 mb-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Voice Channels
              </span>
              <Button variant="ghost" size="icon" className="h-4 w-4">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            {voiceChannels.map(channel => <Button key={channel.id} variant="ghost" className="w-full justify-start px-2 mb-0.5 text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <Volume2 className="h-4 w-4 mr-2" />
                {channel.name}
              </Button>)}
          </div>
        </div>
      </ScrollArea>

      {/* User Info Bar */}
      <div className="h-14 bg-[hsl(var(--nav-background))] px-2 flex items-center justify-between border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-semibold">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">John Doe</span>
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>
      </div>
    </div>;
};
export default ChannelSidebar;