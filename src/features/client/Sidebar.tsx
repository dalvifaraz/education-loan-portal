import { Box, Typography, Drawer, IconButton } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

interface SidebarProps {
  open: boolean;
  userName: string;
  toggleSidebar: () => void;
}

export const Sidebar = ({ open, userName, toggleSidebar }: SidebarProps) => {
  return (
    <Drawer variant="persistent" anchor="left" open={open}>
      <Box width={240} p={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Welcome, {userName}</Typography>
          <IconButton onClick={toggleSidebar} size="medium">
            <MenuOpenIcon fontSize="medium" />
          </IconButton>
        </Box>
        {/* Add more nav links here */}
      </Box>
    </Drawer>
  );
};
