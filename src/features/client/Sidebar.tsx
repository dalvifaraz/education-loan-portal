import {
  Box,
  Typography,
  Drawer,
  IconButton,
  Divider,
  List,
  ListItemText,
  Collapse,
  ListItem,
} from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarItem } from '@educational-loan-portal/components';

interface SidebarProps {
  open: boolean;
  userName: string;
  toggleSidebar: () => void;
  handleLogout: () => void;
}

export const Sidebar = ({ open, userName, toggleSidebar, handleLogout }: SidebarProps) => {
  const [openPrograms, setOpenPrograms] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Drawer
      ModalProps={{
        keepMounted: true,
      }}
      onClose={toggleSidebar}
      variant="temporary"
      anchor="left"
      open={open}
    >
      <Box width={240} p={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            onClick={() => {
              toggleSidebar();
              handleNavigate('/client');
            }}
            sx={{ cursor: 'default' }}
            variant="h6"
          >
            Welcome, {userName}
          </Typography>
          <IconButton onClick={toggleSidebar} size="medium">
            <MenuOpenIcon fontSize="medium" />
          </IconButton>
        </Box>
        <List dense>
          <SidebarItem
            to="/client/dashboard"
            label="Dashboard"
            isActive={isActive('/client/dashboard')}
            onClick={() => {
              toggleSidebar();
              handleNavigate('/client/dashboard');
            }}
          />
        </List>
        <Divider sx={{ my: 2 }} />
        <List dense>
          <ListItem sx={{ cursor: 'pointer' }} onClick={() => setOpenPrograms(!openPrograms)}>
            <ListItemText sx={{ cursor: 'pointer' }} primary="Program & Feature" />
            {openPrograms ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openPrograms} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {['Program 1', 'Feature 1', 'Program 2'].map((item) => (
                <ListItem sx={{ cursor: 'default', pl: 3 }} key={item}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Help & Settings */}
        <Typography variant="subtitle2" sx={{ mb: 1, cursor: 'default' }}>
          Help & Settings
        </Typography>
        <List dense>
          <SidebarItem
            to="/client/account"
            label="Your Account"
            isActive={isActive('/client/account')}
            onClick={() => {
              toggleSidebar();
              handleNavigate('/client/account');
            }}
          />
          <SidebarItem
            to="/client/customer-service"
            label="Customer Service"
            isActive={isActive('/client/customer-service')}
            onClick={() => {
              toggleSidebar();
              handleNavigate('/client/customer-service');
            }}
          />
          <ListItem sx={{ cursor: 'pointer' }} onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
