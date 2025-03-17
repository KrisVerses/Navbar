import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-museum-bg text-museum-text">
        <Navbar />
        <main className="pt-16 px-4 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="/projects" element={<div>Projects Page</div>} />
            <Route path="/contact" element={<div>Contact Page</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
