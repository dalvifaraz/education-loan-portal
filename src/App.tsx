import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '@educational-loan-portal/routes';
import { FullScreenLoader, GlobalSnackbar } from '@educational-loan-portal/components';

function App() {
  return (
    <BrowserRouter>
      <FullScreenLoader />
      <AppRoutes />
      <GlobalSnackbar />
    </BrowserRouter>
  );
}

export default App;
