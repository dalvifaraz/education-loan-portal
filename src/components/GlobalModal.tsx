import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface GlobarModalProps {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onClose?: () => void;
  confirmLabel?: string;
}

export const GlobarModal = ({
  open,
  title,
  description,
  onConfirm,
  onClose,
  confirmLabel = 'Confirm',
}: GlobarModalProps) => {
  return (
    <Modal open={open}>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        sx={{ transform: 'translate(-50%, -50%)' }}
        bgcolor="white"
        p={4}
        borderRadius={2}
        boxShadow={24}
        width={300}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">{title}</Typography>
          {onClose && (
            <IconButton size="small" onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
        <Typography mb={2}>{description}</Typography>
        <Button fullWidth variant="contained" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </Box>
    </Modal>
  );
};
