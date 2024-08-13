import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const theme = useTheme();
  const isVerySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing In", {id: "login"});
      await auth?.loginUser(email, password);
      toast.success("Signed In successfully", { id: "login" });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Signing In failed", {id: "login"} )
    }

  }

  return (
    <Box
      width={"100%"}
      height={"100%"}
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
      gap={{ md: 13 }}
      flex={1}
    >
      <Box
        pt={4}
        mt={9}
        display={{ md: "flex", sm: "none", xs: "none" }}
      >
        <img
          src="airobot.png"
          alt="Robot"
          style={{ width: "330px" }}
        />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, sm: 1, md: 0.5 }}
        justifyContent="center"
        alignItems={"center"}
        mt={{ md: 10, sm: 20, xs: 20}}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              Login
            </Typography>
            <CustomizedInput type="email" name="email" required={true} label="Email" />
            <CustomizedInput type="password" name="password" required={true} label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                color: "black",
                fontWeight: "600",
                width: isVerySmallScreen
                  ? "250px"
                  : isMediumScreen
                  ? "300px"
                  : "400px",
                borderRadius: 2,
                bgcolor: "#00fffc",
                ":hover": {
                    bgcolor: "#48b0ae",
                }
              }}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
