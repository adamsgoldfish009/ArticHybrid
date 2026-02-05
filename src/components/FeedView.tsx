import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

const FeedView = () => {
  const posts = [
    {
      id: 1,
      user: "Sarah Wilson",
      avatar: "SW",
      time: "2h ago",
      content: "Just launched our new design system! Check it out.",
      image: "/placeholder.svg",
      likes: 234,
      comments: 45,
    },
    {
      id: 2,
      user: "Mike Chen",
      avatar: "MC",
      time: "4h ago",
      content: "Beautiful sunset at the beach today. Nature is amazing!",
      image: "/placeholder.svg",
      likes: 567,
      comments: 89,
    },
    {
      id: 3,
      user: "Emma Davis",
      avatar: "ED",
      time: "6h ago",
      content: "Working on something exciting. Can't wait to share it with you all!",
      image: "/placeholder.svg",
      likes: 892,
      comments: 123,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-border bg-card">
        <span className="font-semibold text-foreground text-lg">Feed</span>
      </div>

      {/* Feed */}
      <ScrollArea className="flex-1">
        <div className="max-w-2xl mx-auto py-6 px-4 space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden border-border">
              {/* Post Header */}
              <div className="p-4 flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-primary">{post.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{post.user}</p>
                  <p className="text-sm text-muted-foreground">{post.time}</p>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-3">
                <p className="text-foreground">{post.content}</p>
              </div>

              {/* Post Image */}
              <div className="bg-muted aspect-square">
                <img 
                  src={post.image} 
                  alt="Post" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Post Actions */}
              <div className="p-4">
                <div className="flex items-center gap-4 mb-3">
                  <Button variant="ghost" size="sm" className="gap-2 hover:text-destructive">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <div className="flex-1" />
                  <Button variant="ghost" size="sm">
                    <Bookmark className="h-5 w-5" />
                  </Button>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    {post.likes.toLocaleString()} likes
                  </p>
                  <p className="text-sm text-muted-foreground">
                    View all {post.comments} comments
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FeedView;
