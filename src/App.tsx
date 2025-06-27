import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '@educational-loan-portal/routes';
import { GlobalSnackbar } from '@educational-loan-portal/components';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <GlobalSnackbar />
    </BrowserRouter>
  );
}

export default App;
