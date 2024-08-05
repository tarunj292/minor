import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './components/Form';
import Display from './components/Display';
import SportsForm from './components/SportsForm';
import SportsDisplay from './components/SportsDisplay';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/form" element={<Form />} />
        <Route path="/display" element={<Display />} />
        <Route path="/sports-form" element={<SportsForm />} />
        <Route path="/sports-display" element={<SportsDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
