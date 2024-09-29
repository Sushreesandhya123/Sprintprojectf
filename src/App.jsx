import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Add Navigate import
import Layout from './components/shade/Layout';
import { Dashboard } from './components/Dashboard';
import Sprintdetails from './components/Sprintdetails';
import Team from './components/Team';
import Sprint from './components/Sprint';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/team" element={<Team />} />

        {/* Private routes - Wrapped inside PrivateRoute */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/sprintdetails" element={<Sprintdetails />} />
            <Route path="/sprint" element={<Sprint />} />
          </Route>
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/team" />} /> {/* Redirect to team page */}
      </Routes>
    </Router>
  );
}

export default App;
