import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import Layout from './components/shade/Layout';
import { Dashboard } from './components/Dashboard';
import Sprintdetails from './components/Sprintdetails';
import Team from './components/Team';
import Sprint from './components/Sprint';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/team" element={<Team />} />
        <Route path="/sprint" element={<Sprint />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sprintdetails" element={<Sprintdetails />} />
        </Route>
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
