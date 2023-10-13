import { ChatState } from "../../context/ChatProvider";
import ChatBox from "../miscellaneous/ChatBox";
import MyChats from "../miscellaneous/MyChats";
import SideBarDrawer from "../miscellaneous/SideBarDrawer";

function ChatPage() {
  const { userInfo } = ChatState();

  return (
    <>
      <div style={{ width: "100%" }}>{userInfo && <SideBarDrawer />}</div>
      <div>{userInfo && <MyChats />}</div>
      <div>{userInfo && <ChatBox />}</div>
    </>
  );
}

export default ChatPage;
