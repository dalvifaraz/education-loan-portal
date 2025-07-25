import { Box, Typography } from '@mui/material';
import { GlobarModal, OtpModalBody } from '@educational-loan-portal/components';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, RootState, showLoader, showSnackbar, updateVerification } from '@educational-loan-portal/store';
import { emailVerificationV2 } from '@educational-loan-portal/services';

export const ClientDashboard = () => {
  const { isEmailVerified } = useSelector((state: RootState) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const otpRef = useRef<Array<HTMLInputElement | null>>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isEmailVerified) {
      setOpenModal(true);
    }
  }, [isEmailVerified]);

  const handleVerify = async () => {
    try {
      dispatch(showLoader());
      // Call the email verification API
      await emailVerificationV2(otp);
      dispatch(updateVerification());
    } catch (error: any) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.message || 'Failed to verify email.',
          severity: 'error',
        })
      );
    } finally {
      dispatch(hideLoader());
      setOpenModal(false);
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^[0-9]{0,1}$/.test(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      otpRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRef.current[index - 1]?.focus();
    }
  };
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('Text').slice(0, 6);
    if (!/^[0-9]{6}$/.test(pasted)) return;
    setOtp(pasted.split(''));
  };

  const renderEmailValidation = () => {
    return (
      <GlobarModal
        open={openModal}
        title={'Verify Email'}
        description={'Click below btton to verify user'}
        onConfirm={handleVerify}
        onClose={() => setOpenModal(false)}
        isConfirmDisabled={otp.some((digit) => digit === '')}
      >
        <OtpModalBody
          otp={otp}
          otpRef={otpRef}
          handleChange={handleOtpChange}
          handlePaste={handleOtpPaste}
          handleKeyDown={handleOtpKeyDown}
        />
      </GlobarModal>
    );
  };

  return (
    <Box display="flex">
      <Box flexGrow={1}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Client Dashboard
        </Typography>
        {renderEmailValidation()}
      </Box>
    </Box>
  );
};
