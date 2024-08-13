import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginRight: "auto",
        gap: "15px",
      }}
    >
      <Link to="/">
        <img
          src="openai.png"
          alt="openai"
          width={"30px"}
          height={"30px"}
          className="image-inverted"
        />
      </Link>
      <Typography
          sx={{
            display: { md: "block", sm: "block", xs: "none" },
            fontSize: "20px",
            fontWeight: 800,
            textShadow: "2px 2px 20px #000",
            mr: "auto"
          }}
        >
            AI-ChatBot
        </Typography>
    </div>
  );
};

export default Logo;
