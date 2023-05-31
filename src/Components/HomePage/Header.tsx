import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import ApprovalIcon from "@mui/icons-material/Approval";
import PushPinIcon from "@mui/icons-material/PushPin";
import { useNavigate } from "react-router-dom";

function Header() {
  return (
    <div className="Header">
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <PushPinIcon fontSize="large" />
          <Typography variant="h4" noWrap component="div">
            BOOKING
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
