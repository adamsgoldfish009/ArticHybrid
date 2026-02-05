import { useState, useEffect, useRef } from "react";
import { Camera, Video, X, Check, RotateCw } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CameraDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CameraDialog = ({ open, onOpenChange }: CameraDialogProps) => {
  const [mode, setMode] = useState<"photo" | "video">("photo");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setRecordingTime(0);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[85vh] p-0 bg-background border-border">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-14 px-4 flex items-center justify-between border-b border-border bg-card">
            <h2 className="text-lg font-semibold text-foreground">
              {mode === "photo" ? "Take Photo" : "Record Video"}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Tabs */}
          <Tabs value={mode} onValueChange={(v) => setMode(v as "photo" | "video")} className="flex-1 flex flex-col">
            <div className="px-4 pt-3">
              <TabsList className="w-full">
                <TabsTrigger value="photo" className="flex-1">
                  <Camera className="h-4 w-4 mr-2" />
                  Photo
                </TabsTrigger>
                <TabsTrigger value="video" className="flex-1">
                  <Video className="h-4 w-4 mr-2" />
                  Video
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Camera Preview */}
            <TabsContent value="photo" className="flex-1 m-0 p-4">
              <div className="h-full bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Simulated camera view */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                <Camera className="h-24 w-24 text-muted-foreground" />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
                  <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
                    <RotateCw className="h-5 w-5" />
                  </Button>
                  <Button size="icon" className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90">
                    <Camera className="h-6 w-6" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
                    <Check className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="video" className="flex-1 m-0 p-4">
              <div className="h-full bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Simulated camera view */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                <Video className="h-24 w-24 text-muted-foreground" />
                {isRecording && (
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-destructive px-4 py-2 rounded-full">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-white">{formatTime(recordingTime)}</span>
                  </div>
                )}
                {!isRecording && recordingTime === 0 && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-background/80 px-4 py-2 rounded-full">
                    <span className="text-xs font-medium text-foreground">No time limit - Record as long as you want</span>
                  </div>
                )}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
                  <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
                    <RotateCw className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    className={`h-16 w-16 rounded-full ${
                      isRecording
                        ? "bg-destructive hover:bg-destructive/90"
                        : "bg-primary hover:bg-primary/90"
                    }`}
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    {isRecording ? (
                      <div className="w-6 h-6 bg-white rounded-sm" />
                    ) : (
                      <div className="w-6 h-6 bg-white rounded-full" />
                    )}
                  </Button>
                  <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
                    <Check className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Footer Info */}
          <div className="px-4 py-3 border-t border-border bg-card">
            <p className="text-xs text-muted-foreground text-center">
              {mode === "video" 
                ? "Record unlimited length videos - no time restrictions" 
                : "Camera access required. Grant permission in your browser settings."}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CameraDialog;
