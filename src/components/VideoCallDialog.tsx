import { Mic, MicOff, Video, VideoOff, PhoneOff, Users, ScreenShare } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface VideoCallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VideoCallDialog = ({ open, onOpenChange }: VideoCallDialogProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const participants = [
    { id: 1, name: "Alice", avatar: "A" },
    { id: 2, name: "Bob", avatar: "B" },
    { id: 3, name: "Charlie", avatar: "C" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[80vh] p-0 bg-background border-border">
        <VisuallyHidden>
          <DialogTitle>Video Call</DialogTitle>
          <DialogDescription>Active video call with participants</DialogDescription>
        </VisuallyHidden>
        <div className="flex flex-col h-full">
          {/* Video Grid */}
          <div className="flex-1 grid grid-cols-2 gap-2 p-4">
            {/* Main Video */}
            <div className="col-span-2 bg-card rounded-lg relative overflow-hidden aspect-video">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-primary text-2xl">You</AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute bottom-4 left-4 bg-background/80 px-3 py-1 rounded-full">
                <span className="text-sm font-semibold text-foreground">You</span>
              </div>
            </div>

            {/* Participant Videos */}
            {participants.map((participant) => (
              <div key={participant.id} className="bg-card rounded-lg relative overflow-hidden aspect-video">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent to-muted">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-primary text-xl">{participant.avatar}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="absolute bottom-2 left-2 bg-background/80 px-2 py-1 rounded-full">
                  <span className="text-xs font-semibold text-foreground">{participant.name}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="h-20 bg-card border-t border-border flex items-center justify-center gap-4 px-4">
            <Button
              size="icon"
              variant={isMuted ? "destructive" : "secondary"}
              className="h-12 w-12 rounded-full"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            <Button
              size="icon"
              variant={isVideoOff ? "destructive" : "secondary"}
              className="h-12 w-12 rounded-full"
              onClick={() => setIsVideoOff(!isVideoOff)}
            >
              {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-12 w-12 rounded-full"
            >
              <ScreenShare className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-12 w-12 rounded-full"
            >
              <Users className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="destructive"
              className="h-12 w-12 rounded-full"
              onClick={() => onOpenChange(false)}
            >
              <PhoneOff className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoCallDialog;
