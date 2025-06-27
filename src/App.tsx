import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './features';
import { PrivateRoute } from './routes';


const AdminDashboard = () => <h2>Welcome Admin!</h2>;
const ClientDashboard = () => <h2>Welcome Client!</h2>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/client/dashboard"
          element={
            <PrivateRoute role="client">
              <ClientDashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
