import { ListItem, ListItemText } from "@mui/material";

export const SidebarItem = ({
    to,
    label,
    onClick,
    isActive,
  }: {
    to: string;
    label: string;
    onClick: () => void;
    isActive: boolean;
  }) => (
    <ListItem
      sx={{
        pl: 3,
        bgcolor: isActive ? 'primary.main' : 'transparent',
        color: isActive ? 'white' : 'text.primary',
        borderRadius: 1,
        '&:hover': {
          bgcolor: isActive ? 'primary.dark' : 'grey.100',
          color: isActive ? 'white' : 'primary.main',
        },
        cursor: 'pointer',
        transition: 'background 0.2s, color 0.2s',
      }}
      onClick={onClick}
    >
      <ListItemText primary={label} />
    </ListItem>
  );