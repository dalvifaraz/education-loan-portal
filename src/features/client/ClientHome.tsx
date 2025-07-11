import { Box } from '@mui/material';
import React from 'react'
import { MainContent } from './MainContent';

export const ClientHome = () => {
  return (
    <Box display="flex">
      <Box flexGrow={1}>
        <MainContent />
      </Box>
    </Box>
  );
}
