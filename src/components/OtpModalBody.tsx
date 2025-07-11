import { Box, IconButton, TextField, Typography } from '@mui/material'
import React from 'react'

interface OtpModalBodyProps {
  otp: string[];
  otpRef: any;
  handleChange: (_: string, __: number) => void;
  handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>, index: number) => void;
}

export const OtpModalBody = ({
  otp,
  otpRef,
  handleChange,
  handlePaste,
  handleKeyDown
}: OtpModalBodyProps) => {
  return (
    <>
      <Typography mb={2} fontSize={14} color="textSecondary">
        Please enter the 6-digit OTP sent to your email.
      </Typography>

      <Box display="flex" justifyContent="center" gap={1} mb={2}>
        {otp.map((digit, index) => (
          <TextField
            key={index}
            inputProps={{
              maxLength: 1,
              style: { textAlign: 'center' },
            }}
            value={digit}
            inputRef={(ref) => (otpRef.current[index] = ref)}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            sx={{ width: 40 }}
          />
        ))}
      </Box>
    </>
  );
};
