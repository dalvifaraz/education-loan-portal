import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getClientLoans, submitLoanRequest } from '@educational-loan-portal/services';

interface Loan {
  id: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  [key: string]: any;
}

interface ClientState {
  loans: Loan[];
  loading: boolean;
  error: string | null;
}

const initialState: ClientState = {
  loans: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchLoans = createAsyncThunk('client/fetchLoans', async () => {
  const res = await getClientLoans();
  return res.data;
});

export const requestLoan = createAsyncThunk('client/requestLoan', async (payload: any) => {
  const res = await submitLoanRequest(payload);
  return res.data;
});

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoans.fulfilled, (state, action: PayloadAction<Loan[]>) => {
        state.loading = false;
        state.loans = action.payload;
      })
      .addCase(fetchLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch loans';
      });
  },
});

export default clientSlice.reducer;
