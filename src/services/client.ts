import API from './api';

// Fetch all loans for logged-in client
export const getClientLoans = async () => {
  return await API.get('/client/loans');
};

// Submit a new loan request
export const submitLoanRequest = async (loanData: any) => {
  return await API.post('/client/loans', loanData);
};
