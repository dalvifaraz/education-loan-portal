import API from './api';

// Admin: Fetch all client loan requests
export const getAllLoanRequests = async () => {
  return await API.get('/admin/loans');
};

// Admin: Approve or reject loan
export const updateLoanStatus = async (loanId: string, status: 'approved' | 'rejected') => {
  return await API.put(`/admin/loans/${loanId}`, { status });
};
