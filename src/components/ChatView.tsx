import { useState } from "react";
import { Hash, Video, Phone, Users, Pin, Search, Send, Smile, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import VideoCallDialog from "./VideoCallDialog";

interface ChatViewProps {
  channel: string;
}

const ChatView = ({ channel }: ChatViewProps) => {
  const [message, setMessage] = useState("");
  const [videoCallOpen, setVideoCallOpen] = useState(false);

  const messages = [
    { id: 1, user: "Alice", avatar: "A", content: "Hey everyone! How's it going?", time: "10:30 AM" },
    { id: 2, user: "Bob", avatar: "B", content: "Great! Just finished the new feature.", time: "10:32 AM" },
    { id: 3, user: "Charlie", avatar: "C", content: "Anyone up for a quick call?", time: "10:35 AM" },
    { id: 4, user: "You", avatar: "ME", content: "Sure, let me join in 5 minutes", time: "10:36 AM", isOwn: true },
  ];

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Channel Header */}
        <div className="h-12 px-4 flex items-center justify-between border-b border-border bg-card">
          <div className="flex items-center gap-2">
            <Hash className="h-5 w-5 text-muted-foreground" />
            <span className="font-semibold text-foreground">{channel}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9"
              onClick={() => setVideoCallOpen(true)}
            >
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Users className="h-5 w-5" />
            </Button>
            <div className="w-px h-6 bg-border mx-2" />
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Pin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 px-4">
          <div className="py-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.isOwn ? 'flex-row-reverse' : ''}`}>
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className={msg.isOwn ? "bg-primary" : "bg-secondary"}>
                    {msg.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className={`flex flex-col ${msg.isOwn ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-foreground">{msg.user}</span>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                  <div className={`px-4 py-2 rounded-2xl max-w-md ${
                    msg.isOwn 
                      ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                      : 'bg-accent text-accent-foreground rounded-tl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2 bg-accent rounded-lg px-4 py-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-5 w-5" />
            </Button>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Message #${channel}`}
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Smile className="h-5 w-5" />
            </Button>
            <Button size="icon" className="h-8 w-8">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <VideoCallDialog open={videoCallOpen} onOpenChange={setVideoCallOpen} />
    </>
  );
};

export default ChatView;
