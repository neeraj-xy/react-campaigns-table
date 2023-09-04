import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function appBarLabel(label: string) {
  return (
    <Toolbar>
      <Typography
        variant="h5"
        noWrap
        component="div"
        sx={{ flexGrow: 1, color: "#fff" }}
      >
        {label}
      </Typography>
    </Toolbar>
  );
}

export default function Navbar() {
  return (
    <Stack spacing={2} sx={{ flexGrow: 1, marginBottom: 10 }}>
      <AppBar
        position="fixed"
        color="primary"
        elevation={1}
        style={{ backgroundColor: "#142850" }}
      >
        {appBarLabel("Campaigns Dashboard")}
      </AppBar>
    </Stack>
  );
}
