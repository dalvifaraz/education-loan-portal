import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllLoanRequests, updateLoanStatus } from '@educational-loan-portal/services';

interface AdminState {
  loans: any[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  loans: [],
  loading: false,
  error: null,
};

export const fetchAllLoans = createAsyncThunk('admin/fetchAllLoans', async () => {
  const res = await getAllLoanRequests();
  return res.data;
});

export const changeLoanStatus = createAsyncThunk('admin/changeLoanStatus', async ({ id, status }: { id: string; status: 'approved' | 'rejected' }) => {
  const res = await updateLoanStatus(id, status);
  return res.data;
});

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLoans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllLoans.fulfilled, (state, action) => {
        state.loading = false;
        state.loans = action.payload;
      })
      .addCase(fetchAllLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching loans';
      });
  },
});

export default adminSlice.reducer;
