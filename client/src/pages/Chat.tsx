import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useState } from "react";
import { sendChatRequest } from "../helpers/api-communicator";

type Message = {
    role: "user" | "assistant",
    content: string,
}

const Chat = () => {
  const auth = useAuth();
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  //@ts-expect-error nice
  const handleInputChange = (e) => {
    setMessage(e.target.value);
    e.target.style.height = "auto";
  };

  const handleSubmit = async (message: string) => {
    const content = message;
    const newMessage: Message = { role: "user", content };
    // @ts-expect-error nice
    setChatMessages((prev) => [...prev, newMessage])
    try {
      const chatData = await sendChatRequest(content);
      // @ts-expect-error nice
      setChatMessages([...chatData.chats]);
    } catch (error) {
      console.log(error);
    }
  };

  //@ts-expect-error nice
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (message.length > 0) {
        handleSubmit(message);
      }
      setMessage("");
    }
  };

  const handleButtonClick = () => {
    handleSubmit(message);
    setMessage("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        gap: 6,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", sm: "none", xs: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "83vh",
            bgcolor: "rgb(17, 29, 39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "Roboto" }}>
            You are talking to a ChatBot
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask any question related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information
          </Typography>
          <Button
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, sm: 1, xs: 1 },
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontSize: { md: "35px", sm: "33px", xs: "30px" },
            color: "white",
            mb: 2,
            mx: "auto",
          }}
        >
          AI - ChatBot 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "64vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowY: "auto",
            overflowX: "hidden",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            //@ts-expect-error nice
            <ChatItem key={index} role={chat.role} content={chat.content} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            padding: "20px",
            borderRadius: "100px",
            background: "rgb(17, 27, 39)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "auto",
            height: "10vh",
          }}
        >
          <textarea
            //@ts-expect-error nice
            type="text"
            value={message}
            onChange={handleInputChange}
            placeholder="Message ChatBot"
            rows={1}
            onKeyPress={handleKeyPress}
            style={{
              width: "100%",
              background: "transparent",
              padding: "10px",
              border: "none",
              outline: "none",
              color: "white",
              fontFamily: "Roboto",
              fontSize: "16px",
              resize: "none",
              minHeight: "40px",
              overflow: "scroll",
              overflowY: "auto",
              overflowX: "hidden",
              scrollBehavior: "smooth",
            }}
          ></textarea>
          <IconButton
            onClick={handleButtonClick}
            disabled= {message.length === 0 ? true : false}
            sx={{ ml: "auto", color: "white" }}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
