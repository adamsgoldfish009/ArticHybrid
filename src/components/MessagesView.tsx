import { Search, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MessagesView = () => {
  const conversations = [
    { id: 1, user: "Alice Johnson", avatar: "AJ", lastMessage: "See you tomorrow!", time: "5m ago", online: true },
    { id: 2, user: "Bob Smith", avatar: "BS", lastMessage: "Thanks for the help!", time: "1h ago", online: true },
    { id: 3, user: "Carol White", avatar: "CW", lastMessage: "Let's schedule a meeting", time: "3h ago", online: false },
    { id: 4, user: "David Brown", avatar: "DB", lastMessage: "Great work on the project!", time: "1d ago", online: false },
  ];

  return (
    <div className="flex h-full">
      {/* Conversations List */}
      <div className="w-80 border-r border-border flex flex-col">
        {/* Header */}
        <div className="h-12 px-4 flex items-center justify-between border-b border-border bg-card">
          <span className="font-semibold text-foreground">Messages</span>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              className="pl-9 bg-accent border-0"
            />
          </div>
        </div>

        {/* Conversations */}
        <ScrollArea className="flex-1">
          <div className="px-2">
            {conversations.map((conv) => (
              <Button
                key={conv.id}
                variant="ghost"
                className="w-full h-auto py-3 px-3 justify-start mb-1 hover:bg-accent"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-primary">{conv.avatar}</AvatarFallback>
                    </Avatar>
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-[hsl(var(--online-status))] border-2 border-card rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-foreground text-sm truncate">
                        {conv.user}
                      </span>
                      <span className="text-xs text-muted-foreground">{conv.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Empty State / Chat Area */}
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="text-4xl mb-4">💬</div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">Your Messages</h3>
          <p className="text-muted-foreground">Select a conversation to start chatting</p>
        </div>
      </div>
    </div>
  );
};

export default MessagesView;
