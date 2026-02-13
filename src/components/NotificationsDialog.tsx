import { Heart, UserPlus, MessageCircle, Share2, Users, Video, AtSign } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
interface NotificationsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const NotificationsDialog = ({
  open,
  onOpenChange
}: NotificationsDialogProps) => {
  const notifications = [{
    id: 1,
    type: "like",
    user: "Sarah Wilson",
    avatar: "SW",
    action: "liked your post",
    time: "5m ago",
    unread: true
  }, {
    id: 2,
    type: "follow",
    user: "Mike Chen",
    avatar: "MC",
    action: "started following you",
    time: "15m ago",
    unread: true
  }, {
    id: 3,
    type: "comment",
    user: "Emma Davis",
    avatar: "ED",
    action: "commented on your post",
    content: "This is amazing! Great work!",
    time: "1h ago",
    unread: true
  }, {
    id: 4,
    type: "like",
    user: "Alex Johnson",
    avatar: "AJ",
    action: "liked your photo",
    time: "2h ago",
    unread: true
  }, {
    id: 5,
    type: "mention",
    user: "Chris Brown",
    avatar: "CB",
    action: "mentioned you in a comment",
    content: "Hey @you check this out!",
    time: "3h ago",
    unread: true
  }, {
    id: 6,
    type: "share",
    user: "Lisa Taylor",
    avatar: "LT",
    action: "shared your post",
    time: "5h ago",
    unread: false
  }, {
    id: 7,
    type: "group",
    user: "Tech Community",
    avatar: "TC",
    action: "invited you to join a channel",
    time: "1d ago",
    unread: false
  }, {
    id: 8,
    type: "video",
    user: "David Miller",
    avatar: "DM",
    action: "started a video call",
    time: "2d ago",
    unread: false
  }];
  const getIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-destructive fill-destructive" />;
      case "follow":
        return <UserPlus className="h-4 w-4 text-primary" />;
      case "comment":
        return <MessageCircle className="h-4 w-4 text-primary" />;
      case "share":
        return <Share2 className="h-4 w-4 text-primary" />;
      case "mention":
        return <AtSign className="h-4 w-4 text-primary" />;
      case "group":
        return <Users className="h-4 w-4 text-primary" />;
      case "video":
        return <Video className="h-4 w-4 text-primary" />;
      default:
        return <Heart className="h-4 w-4" />;
    }
  };
  const unreadNotifications = notifications.filter(n => n.unread);
  const allNotifications = notifications;
  const renderNotifications = (notifList: typeof notifications) => <div className="space-y-1 p-2">
      {notifList.map(notif => <div key={notif.id}>
          <Button variant="ghost" className={`w-full h-auto py-3 px-3 justify-start hover:bg-accent ${notif.unread ? "bg-accent/50" : ""}`}>
            <div className="flex items-start gap-3 w-full">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-primary text-xs">{notif.avatar}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 bg-card rounded-full p-0.5">
                  {getIcon(notif.type)}
                </div>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">{notif.user}</span>{" "}
                    <span className="text-muted-foreground">{notif.action}</span>
                  </p>
                  {notif.unread && <div className="w-2 h-2 bg-primary rounded-full mt-1 flex-shrink-0" />}
                </div>
                {notif.content && <p className="text-xs text-muted-foreground mb-1 line-clamp-2">
                    {notif.content}
                  </p>}
                <p className="text-xs text-muted-foreground">{notif.time}</p>
              </div>
            </div>
          </Button>
          <Separator className="my-1" />
        </div>)}
    </div>;
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh] p-0 bg-card border-border">
        <DialogHeader className="px-6 py-4 border-b border-border">
          <DialogTitle className="text-foreground text-[35px]">Notifications</DialogTitle>
          <DialogDescription className="text-[19px] text-center">Stay updated with your activity</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="all" className="flex-1 flex flex-col">
          <div className="px-4 pt-2">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1 text-[23px]">
                All
              </TabsTrigger>
              <TabsTrigger value="unread" className="flex-1 text-[23px]">
                Unread ({unreadNotifications.length})
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="h-[500px]">
            <TabsContent value="all" className="m-0">
              {renderNotifications(allNotifications)}
            </TabsContent>

            <TabsContent value="unread" className="m-0">
              {unreadNotifications.length > 0 ? renderNotifications(unreadNotifications) : <div className="flex flex-col items-center justify-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground">No unread notifications</p>
                </div>}
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="px-6 py-3 border-t border-border">
          <Button variant="ghost" className="w-full text-[24px]" size="sm">
            Mark all as read
          </Button>
        </div>
      </DialogContent>
    </Dialog>;
};
export default NotificationsDialog;