import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { PageTransition, NavigationIndicator } from './components/NavigationEffects';
import './App.css';

/**
 * App Component
 * 
 * Implements:
 * - Route configuration
 * - Page transitions
 * - Loading indicators
 * - Layout structure
 */
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-museum-bg">
        <Navbar />
        {/* Navigation loading indicator at the top level */}
        <NavigationIndicator />

        {/* Main content area with page transitions */}
        <main className="pt-16 px-4 max-w-7xl mx-auto">
          <PageTransition>
            <Routes>
              <Route path="/" element={
                <div className="p-4">
                  <h1 className="text-2xl font-semibold text-museum-text">Home Page</h1>
                  <p className="mt-4 text-museum-text/80">Welcome to the Museum</p>
                </div>
              } />
              <Route path="/projects" element={
                <div className="p-4">
                  <h1 className="text-2xl font-semibold text-museum-text">Projects</h1>
                  <p className="mt-4 text-museum-text/80">Our latest exhibitions</p>
                </div>
              } />
              <Route path="/contact" element={
                <div className="p-4">
                  <h1 className="text-2xl font-semibold text-museum-text">Contact</h1>
                  <p className="mt-4 text-museum-text/80">Get in touch with us</p>
                </div>
              } />
            </Routes>
          </PageTransition>
        </main>
      </div>
    </Router>
  );
}

export default App;
