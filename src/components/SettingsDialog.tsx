import { User, Bell, Lock, Palette, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] p-0 bg-card border-border">
        <DialogHeader className="px-6 py-4 border-b border-border">
          <DialogTitle className="text-foreground">Settings</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh]">
          <div className="px-6 py-4 space-y-6">
            {/* Profile Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Profile</h3>
              </div>
              <div className="space-y-4 pl-7">
                <div>
                  <Label htmlFor="username" className="text-foreground">Username</Label>
                  <p className="text-sm text-muted-foreground mt-1">John Doe</p>
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <p className="text-sm text-muted-foreground mt-1">john.doe@example.com</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Notifications Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Bell className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
              </div>
              <div className="space-y-4 pl-7">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notif" className="text-foreground">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications</p>
                  </div>
                  <Switch id="push-notif" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="message-notif" className="text-foreground">Message Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified about new messages</p>
                  </div>
                  <Switch id="message-notif" defaultChecked />
                </div>
              </div>
            </div>

            <Separator />

            {/* Privacy Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Lock className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Privacy & Security</h3>
              </div>
              <div className="space-y-4 pl-7">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="private-profile" className="text-foreground">Private Profile</Label>
                    <p className="text-sm text-muted-foreground">Make your profile private</p>
                  </div>
                  <Switch id="private-profile" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="read-receipts" className="text-foreground">Read Receipts</Label>
                    <p className="text-sm text-muted-foreground">Show when you read messages</p>
                  </div>
                  <Switch id="read-receipts" defaultChecked />
                </div>
              </div>
            </div>

            <Separator />

            {/* Appearance Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Palette className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Appearance</h3>
              </div>
              <div className="space-y-4 pl-7">
                <div>
                  <Label className="text-foreground">Theme</Label>
                  <p className="text-sm text-muted-foreground mt-1">Dark mode is enabled</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* About Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Info className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">About</h3>
              </div>
              <div className="space-y-2 pl-7">
                <p className="text-sm text-muted-foreground">Version 1.0.0</p>
                <p className="text-sm text-muted-foreground">© 2024 Social App</p>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="px-6 py-4 border-t border-border flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
