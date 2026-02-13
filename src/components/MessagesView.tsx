import { useState } from "react";
import { Search, Edit, Image, X, MessageCircle, ArrowLeft, Video, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
const MessagesView = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [chatBackground, setChatBackground] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("text-foreground");
  const [videoCallActive, setVideoCallActive] = useState(false);
  const conversations = [{
    id: 1,
    user: "Alice Johnson",
    avatar: "AJ",
    lastMessage: "See you tomorrow!",
    time: "5m ago",
    online: true
  }, {
    id: 2,
    user: "Bob Smith",
    avatar: "BS",
    lastMessage: "Thanks for the help!",
    time: "1h ago",
    online: true
  }, {
    id: 3,
    user: "Carol White",
    avatar: "CW",
    lastMessage: "Let's schedule a meeting",
    time: "3h ago",
    online: false
  }, {
    id: 4,
    user: "David Brown",
    avatar: "DB",
    lastMessage: "Great work on the project!",
    time: "1d ago",
    online: false
  }];
  const backgroundOptions = [{
    id: "none",
    name: "Default",
    color: "bg-background"
  }, {
    id: "gradient1",
    name: "Ocean Blue",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  }, {
    id: "gradient2",
    name: "Sunset Pink",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  }, {
    id: "gradient3",
    name: "Sky Blue",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  }, {
    id: "gradient4",
    name: "Dark Night",
    gradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)"
  }, {
    id: "gradient5",
    name: "Purple Dream",
    gradient: "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)"
  }, {
    id: "gradient6",
    name: "Green Forest",
    gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
  }, {
    id: "gradient7",
    name: "Orange Fire",
    gradient: "linear-gradient(135deg, #f12711 0%, #f5af19 100%)"
  }, {
    id: "gradient8",
    name: "Royal Blue",
    gradient: "linear-gradient(135deg, #141e30 0%, #243b55 100%)"
  }, {
    id: "gradient9",
    name: "Cotton Candy",
    gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
  }, {
    id: "gradient10",
    name: "Northern Lights",
    gradient: "linear-gradient(135deg, #00d2ff 0%, #3a47d5 100%)"
  }];
  const textColorOptions = [{
    id: "default",
    name: "Default",
    class: "text-foreground"
  }, {
    id: "white",
    name: "White",
    class: "text-white"
  }, {
    id: "blue",
    name: "Blue",
    class: "text-blue-400"
  }, {
    id: "green",
    name: "Green",
    class: "text-green-400"
  }, {
    id: "purple",
    name: "Purple",
    class: "text-purple-400"
  }, {
    id: "pink",
    name: "Pink",
    class: "text-pink-400"
  }, {
    id: "yellow",
    name: "Yellow",
    class: "text-yellow-400"
  }, {
    id: "orange",
    name: "Orange",
    class: "text-orange-400"
  }, {
    id: "red",
    name: "Red",
    class: "text-red-400"
  }, {
    id: "cyan",
    name: "Cyan",
    class: "text-cyan-400"
  }];
  const handleBackgroundSelect = (gradient: string) => {
    setChatBackground(gradient);
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        setChatBackground(`url(${event.target?.result})`);
      };
      reader.readAsDataURL(file);
    }
  };
  return <div className="flex h-full">
      {/* Conversations List - Hidden on mobile when chat is selected */}
      <div className={`${selectedChat ? 'hidden md:block' : 'block'} w-full md:w-80 border-r border-border flex flex-col`}>
        {/* Header */}
        <div className="h-12 px-4 flex items-center justify-between border-b border-border bg-card">
          <span className="font-semibold text-foreground font-['New York'] text-[19px]"> Your Text Messages</span>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-9 bg-accent border-0" />
          </div>
        </div>

        {/* Conversations */}
        <ScrollArea className="flex-1">
          <div className="px-2">
            {conversations.map(conv => <Button key={conv.id} variant="ghost" className="w-full h-auto py-3 px-3 justify-start mb-1 hover:bg-accent" onClick={() => setSelectedChat(conv.id)}>
                <div className="flex items-center gap-3 w-full">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-primary">{conv.avatar}</AvatarFallback>
                    </Avatar>
                    {conv.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-[hsl(var(--online-status))] border-2 border-card rounded-full" />}
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
              </Button>)}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className={`${!selectedChat ? 'hidden md:flex' : 'flex'} flex-1 flex-col relative overflow-hidden`} style={chatBackground ? {
      backgroundImage: chatBackground.startsWith('url') ? chatBackground : undefined,
      background: !chatBackground.startsWith('url') ? chatBackground : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    } : {
      backgroundColor: 'hsl(var(--background))'
    }}>
        {/* Background Overlay for readability */}
        {chatBackground && <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />}
        
        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col">
          {selectedChat ? <>
              {/* Chat Header */}
              <div className="h-14 px-3 md:px-4 flex items-center justify-between border-b border-border bg-card/90 backdrop-blur-sm">
                <div className="flex items-center gap-2 md:gap-3">
                  {/* Back Button - Mobile Only */}
                  <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden" onClick={() => setSelectedChat(null)}>
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Avatar className="h-8 w-8 md:h-9 md:w-9">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-primary text-xs">
                      {conversations.find(c => c.id === selectedChat)?.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm md:text-base text-foreground">
                      {conversations.find(c => c.id === selectedChat)?.user}
                    </p>
                    <p className="text-xs text-muted-foreground">Online</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                  {/* Video Call Button */}
                  <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setVideoCallActive(!videoCallActive)}>
                    <Video className="h-5 w-5" />
                  </Button>
                  
                  {/* Text Color Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9">
                        <Palette className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Text Color</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {textColorOptions.map(color => <DropdownMenuItem key={color.id} onClick={() => setTextColor(color.class)}>
                          <div className="flex items-center gap-2 w-full">
                            <div className={`w-8 h-8 rounded ${color.class} flex items-center justify-center text-xl font-bold bg-card border border-border`}>
                              A
                            </div>
                            <span>{color.name}</span>
                          </div>
                        </DropdownMenuItem>)}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Background Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9">
                        <Image className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 max-h-96 overflow-y-auto">
                      <DropdownMenuLabel>Chat Background</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {backgroundOptions.map(bg => <DropdownMenuItem key={bg.id} onClick={() => handleBackgroundSelect(bg.gradient || '')}>
                          <div className="flex items-center gap-2 w-full">
                            <div className={`w-8 h-8 rounded ${bg.color || ''}`} style={bg.gradient ? {
                        background: bg.gradient
                      } : {}} />
                            <span>{bg.name}</span>
                          </div>
                        </DropdownMenuItem>)}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <label className="cursor-pointer flex items-center gap-2">
                          <Image className="h-4 w-4" />
                          <span>Upload Image</span>
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </label>
                      </DropdownMenuItem>
                      {chatBackground && <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setChatBackground('')} className="text-destructive">
                            <X className="h-4 w-4 mr-2" />
                            Remove Background
                          </DropdownMenuItem>
                        </>}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Messages Area with Video Call */}
              <div className="flex-1 flex">
                {/* Messages Column */}
                <ScrollArea className={`${videoCallActive ? 'w-1/2' : 'w-full'} px-3 md:px-4 transition-all duration-300`}>
                  <div className="py-4 space-y-4">
                    <div className="flex justify-center">
                      <span className="text-xs text-muted-foreground bg-card/80 px-3 py-1 rounded-full">
                        Today
                      </span>
                    </div>
                    {/* Sample messages */}
                    <div className="flex gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-primary text-xs">
                          {conversations.find(c => c.id === selectedChat)?.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-card/90 backdrop-blur-sm px-4 py-2 rounded-2xl rounded-tl-sm max-w-xs">
                        <p className={`text-sm ${textColor}`}>Hey! How are you doing?</p>
                        <span className="text-xs text-muted-foreground">10:30 AM</span>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <div className="bg-primary px-4 py-2 rounded-2xl rounded-tr-sm max-w-xs">
                        <p className={`text-sm ${textColor === 'text-foreground' ? 'text-primary-foreground' : textColor}`}>
                          I'm great! Thanks for asking!
                        </p>
                        <span className={`text-xs ${textColor === 'text-foreground' ? 'text-primary-foreground/80' : textColor}`}>
                          10:32 AM
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollArea>

                {/* Video Call Panel */}
                {videoCallActive && <div className="w-1/2 border-l border-border bg-muted/50 flex flex-col">
                    <div className="flex-1 flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                      <div className="relative z-10 text-center">
                        <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground">Video call with {conversations.find(c => c.id === selectedChat)?.user}</p>
                        <p className="text-xs text-muted-foreground mt-2">End-to-end encrypted</p>
                      </div>
                      {/* Self video preview */}
                      <div className="absolute bottom-4 right-4 w-32 h-24 bg-card rounded-lg border border-border flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">You</span>
                      </div>
                    </div>
                  </div>}
              </div>

              {/* Message Input */}
              <div className="p-3 md:p-4 border-t border-border bg-card/90 backdrop-blur-sm">
                <Input placeholder="Type a message..." className={`bg-accent ${textColor}`} />
              </div>
            </> : <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">Your Messages</h3>
                <p className="text-muted-foreground">Select a conversation to start chatting</p>
              </div>
            </div>}
        </div>
      </div>
    </div>;
};
export default MessagesView;