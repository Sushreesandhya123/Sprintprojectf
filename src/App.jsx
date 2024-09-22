import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/shade/Layout';
import { Dashboard } from './components/Dashboard';
import Sprintdetails from './components/Sprintdetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Nested routes go here */}
          <Route index element={<Dashboard />} />
          <Route path="/sprintdetails" element={<Sprintdetails />} />
          {/* <Route path='/carousel' element={<Carousel />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
