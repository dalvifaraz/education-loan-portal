import { AppBar, Toolbar, IconButton, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

interface NavBarProps {
  onToggleSidebar: () => void;
  onLogout: () => void;
}

export const NavBar = ({ onToggleSidebar, onLogout }: NavBarProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onToggleSidebar}>
          <MenuIcon />
        </IconButton>
        <Box flexGrow={1} />
        <Button color="inherit" startIcon={<LogoutIcon />} onClick={onLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};
