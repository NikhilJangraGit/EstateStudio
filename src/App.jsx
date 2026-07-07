import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNavBar from './components/layout/TopNavBar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Pricing from './pages/Pricing';
import BookMyRealtor from './pages/BookMyRealtor';
import BookingForm from './pages/BookingForm';
import RealtorProfile from './pages/RealtorProfile';
import RealtorDashboard from './pages/RealtorDashboard';
import FindRealtors from './pages/FindRealtors';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-[var(--color-background)] flex flex-col">
          <TopNavBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="services" element={<Services />} />
              <Route path="about" element={<About />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="book-my-realtor" element={<BookMyRealtor />} />
              <Route path="book-realtor/:id?" element={<BookingForm />} />
              <Route path="realtor-profile" element={<RealtorProfile />} />
              <Route path="dashboard" element={<RealtorDashboard />} />
              <Route path="login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/realtors" element={<FindRealtors />} />
              <Route path="contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
