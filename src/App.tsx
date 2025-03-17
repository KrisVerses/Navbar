import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { PageTransition } from './components/NavigationEffects';
import './index.css';

/**
 * App Component
 * 
 * Implements:
 * - Route configuration
 * - Page transitions
 * - Loading indicators
 * - Layout structure
 */

// Page components
const HomePage = () => (
  <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-semibold text-museum-text">Home Page</h1>
      <p className="mt-4 text-xl text-museum-text/80">Welcome to the Museum</p>
    </div>
  </div>
);

const ProjectsPage = () => (
  <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-semibold text-museum-text">Projects</h1>
      <p className="mt-4 text-xl text-museum-text/80">Our latest exhibitions</p>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-semibold text-museum-text">Contact</h1>
      <p className="mt-4 text-xl text-museum-text/80">Get in touch with us</p>
    </div>
  </div>
);

// Routes component with transitions
const AppRoutes = () => (
  <PageTransition>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  </PageTransition>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-museum-bg">
        <Navbar />
        <main className="relative h-screen pt-16">
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;
