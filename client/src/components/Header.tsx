import { AppBar, Toolbar, Box } from "@mui/material";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";
import { toast } from 'react-hot-toast';

const Header = () => {
  const auth = useAuth();

  const handleLogout = async () => {
    try {
      toast.loading("Logout...", {id: "logout"});
      await auth?.logoutUser();
      toast.success("Logout successfully", { id: "logout" });
    } catch (error) {
      console.log(error);
      toast.error("Logout failed", {id: "logout"} )
    }
  }
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        {auth?.isLoggedIn ? (
          <Box>
            <NavigationLink
              bg="#00fffc"
              to="/chat"
              text="Go to Chat"
              textColor="black"
            />
            <NavigationLink
              bg="#51538f"
              textColor="white"
              to="/"
              text="Logout"
              onClick={handleLogout}
            />
          </Box>
        ) : (
          <div className="links">
            <NavigationLink
              bg="#00fffc"
              to="/login"
              text="Login"
              textColor="black"
            />
            <NavigationLink
              bg="#51538f"
              textColor="white"
              to="/signup"
              text="Sign Up"
            />
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
