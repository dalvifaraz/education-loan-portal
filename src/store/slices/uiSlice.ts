import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

interface UIState {
  loading: boolean;
  snackbar: SnackbarState;
}

const initialState: UIState = {
  loading: false,
  snackbar: { open: false, message: '', severity: 'info' },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showLoader: (state) => { state.loading = true; },
    hideLoader: (state) => { state.loading = false; },
    showSnackbar: (state, action: PayloadAction<SnackbarState>) => {
      state.snackbar = { ...action.payload, open: true };
    },
    hideSnackbar: (state) => {
      state.snackbar.open = false;
    },
  },
});

export const { showLoader, hideLoader, showSnackbar, hideSnackbar } = uiSlice.actions;
export default uiSlice.reducer;
