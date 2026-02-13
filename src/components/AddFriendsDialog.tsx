import { useState } from "react";
import { Search, UserPlus, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
interface AddFriendsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const AddFriendsDialog = ({
  open,
  onOpenChange
}: AddFriendsDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [addedFriends, setAddedFriends] = useState<number[]>([]);
  const suggestedUsers = [{
    id: 1,
    name: "Emma Wilson",
    username: "emmaw",
    avatar: "EW",
    mutualFriends: 5
  }, {
    id: 2,
    name: "James Brown",
    username: "jamesbrown",
    avatar: "JB",
    mutualFriends: 3
  }, {
    id: 3,
    name: "Sophia Lee",
    username: "sophialee",
    avatar: "SL",
    mutualFriends: 8
  }, {
    id: 4,
    name: "Michael Davis",
    username: "mikedavis",
    avatar: "MD",
    mutualFriends: 2
  }, {
    id: 5,
    name: "Olivia Taylor",
    username: "oliviat",
    avatar: "OT",
    mutualFriends: 6
  }];
  const friendRequests = [{
    id: 6,
    name: "Noah Anderson",
    username: "noaha",
    avatar: "NA",
    time: "2d ago"
  }, {
    id: 7,
    name: "Ava Martinez",
    username: "avam",
    avatar: "AM",
    time: "3d ago"
  }];
  const handleAddFriend = (userId: number) => {
    setAddedFriends([...addedFriends, userId]);
  };
  const filteredUsers = suggestedUsers.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.username.toLowerCase().includes(searchQuery.toLowerCase()));
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh] p-0 bg-card border-border">
        <DialogHeader className="px-6 py-4 border-b border-border">
          <DialogTitle className="text-foreground text-[32px] text-center">Add Friends</DialogTitle>
          <DialogDescription>Find and connect with people you know</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="search" className="flex-1 flex flex-col">
          <div className="px-4 pt-2">
            <TabsList className="w-full">
              <TabsTrigger value="search" className="flex-1 text-[22px]">
                Search
              </TabsTrigger>
              <TabsTrigger value="requests" className="flex-1 text-[22px]">
                Requests ({friendRequests.length})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="search" className="m-0 flex-1 flex flex-col">
            {/* Search Input */}
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by name or username..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9 bg-accent border-0" />
              </div>
            </div>

            {/* Suggested Users */}
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-2 pb-4">
                <p className="text-sm font-semibold text-muted-foreground mb-3">
                  {searchQuery ? "Search Results" : "Suggested for you"}
                </p>
                {filteredUsers.map(user => <div key={user.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-primary">{user.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">@{user.username}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.mutualFriends} mutual friends
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant={addedFriends.includes(user.id) ? "outline" : "default"} onClick={() => handleAddFriend(user.id)} disabled={addedFriends.includes(user.id)}>
                      {addedFriends.includes(user.id) ? <>
                          <Check className="h-4 w-4 mr-1" />
                          Added
                        </> : <>
                          <UserPlus className="h-4 w-4 mr-1" />
                          Add
                        </>}
                    </Button>
                  </div>)}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="requests" className="m-0 flex-1">
            <ScrollArea className="h-[400px] px-4">
              <div className="space-y-2 pb-4">
                <p className="text-sm font-semibold text-muted-foreground mb-3">
                  Friend Requests
                </p>
                {friendRequests.map(request => <div key={request.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-primary">{request.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{request.name}</p>
                        <p className="text-xs text-muted-foreground">@{request.username}</p>
                        <p className="text-xs text-muted-foreground">{request.time}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="default">
                        Accept
                      </Button>
                      <Button size="sm" variant="outline">
                        Decline
                      </Button>
                    </div>
                  </div>)}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>;
};
export default AddFriendsDialog;