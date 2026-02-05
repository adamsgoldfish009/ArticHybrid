import ChatView from "./ChatView";
import FeedView from "./FeedView";
import MessagesView from "./MessagesView";

interface MainContentProps {
  activeView: "feed" | "channels" | "messages";
  activeChannel: string;
}

const MainContent = ({ activeView, activeChannel }: MainContentProps) => {
  return (
    <div className="flex-1 flex flex-col">
      {activeView === "feed" && <FeedView />}
      {activeView === "channels" && <ChatView channel={activeChannel} />}
      {activeView === "messages" && <MessagesView />}
    </div>
  );
};

export default MainContent;
