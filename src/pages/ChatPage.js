// import { Box } from "@chakra-ui/react";
import { ChatState } from "../context/ChatProvider";
import ChatBox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SideBarDrawer from "../components/miscellaneous/SideBarDrawer";
import { useNavigate } from "react-router-dom";

function ChatPage({ token }) {
  const { user } = ChatState();
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%" }}>
      {token ? (
        <div>
          {user && <SideBarDrawer />}
          <div className="newChatPage">
            {user && <MyChats />}
            {user && <ChatBox />}
          </div>
        </div>
      ) : (
        navigate("/404")
      )}
    </div>
  );
}

export default ChatPage;
