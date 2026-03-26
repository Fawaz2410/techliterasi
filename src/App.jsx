import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // Tambahan untuk animasi menu HP
import Home from './pages/Home';
import About from './pages/About';
import Konten from './pages/Konten';
import Contact from './pages/Contact';
import Misi from './pages/Misi';

// JURUS RAHASIA: Memaksa halaman scroll ke paling atas tiap kali pindah rute
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Komponen NavLink Kustom Desktop
function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to || (to === '/konten' && location.pathname.startsWith('/misi'));
  
  return (
    <Link 
      to={to} 
      className={`font-medium transition-all duration-200 ${
        isActive 
          ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 pb-1' 
          : 'text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-300 pb-1'
      }`}
    >
      {children}
    </Link>
  );
}

// Komponen NavLink Kustom Mobile (HP)
function MobileNavLink({ to, onClick, children }) {
  const location = useLocation();
  const isActive = location.pathname === to || (to === '/konten' && location.pathname.startsWith('/misi'));

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block px-6 py-4 rounded-2xl font-bold text-lg transition-all ${
        isActive
          ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
      }`}
    >
      {children}
    </Link>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State untuk menu HP

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <ScrollToTop />
      
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-300">
        
        {/* Navbar Modern dengan Backdrop Blur */}
        <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            
            {/* Logo */}
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 group z-50 relative">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-lg group-hover:bg-indigo-700 transition-colors">
                T
              </div>
              <span className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                TECH<span className="text-indigo-600">LITERASI</span>
              </span>
            </Link>
            
            {/* Navigasi Desktop & Dark Mode Toggle */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="/">Beranda</NavLink>
              <NavLink to="/about">Tentang</NavLink>
              <NavLink to="/konten">Misi Belajar</NavLink>
              <NavLink to="/contact">Kontak</NavLink>

              <div className="h-6 w-px bg-gray-200 dark:bg-slate-700"></div>

              {/* Tombol Toggle Dark Mode Desktop */}
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-yellow-400 hover:ring-2 ring-indigo-300 transition-all duration-300"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>

            {/* Tombol Mobile Toggle (Hanya muncul di HP) */}
            <div className="flex md:hidden items-center gap-3 z-50 relative">
               <button 
                  onClick={() => setDarkMode(!darkMode)} 
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400"
               >
                  {darkMode ? '☀️' : '🌙'}
               </button>
               
               {/* Tombol Hamburger / Close */}
               <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
               >
                 {isMobileMenuOpen ? (
                   <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                 ) : (
                   <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                 )}
              </button>
            </div>
            
          </div>

          {/* --- MENU DROPDOWN MOBILE (HP) --- */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 absolute w-full left-0 top-full shadow-2xl"
              >
                <div className="px-6 py-6 flex flex-col gap-2">
                  <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Beranda</MobileNavLink>
                  <MobileNavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>Tentang</MobileNavLink>
                  <MobileNavLink to="/konten" onClick={() => setIsMobileMenuOpen(false)}>Misi Belajar</MobileNavLink>
                  <MobileNavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Kontak</MobileNavLink>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Area Konten Utama */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/konten" element={<Konten />} />
            <Route path="/misi/:id" element={<Misi />} /> 
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Footer Modern */}
        <footer className="bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800 transition-colors duration-300 mt-auto relative z-20">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <span className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight block mb-4">
                  TECH<span className="text-indigo-600">LITERASI</span>
                </span>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed pr-4">
                  Menavigasi masa depan melalui edukasi literasi digital yang interaktif dan menyenangkan untuk pelajar.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Tautan Cepat</h4>
                <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <li><Link to="/about" onClick={() => window.scrollTo(0,0)} className="hover:text-indigo-600 transition-colors">Visi Misi</Link></li>
                  <li><Link to="/konten" onClick={() => window.scrollTo(0,0)} className="hover:text-indigo-600 transition-colors">Modul Belajar</Link></li>
                  <li><Link to="/contact" onClick={() => window.scrollTo(0,0)} className="hover:text-indigo-600 transition-colors">Pusat Bantuan</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Pengembang</h4>
                <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <li>AHA TEAM</li>
                  <li>PTI UMTAS</li>
                  <li>TECHSOFT 2026 Competition</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <p>&copy; 2026 PTI UMTAS. Dibangun Oleh AHA TEAM.</p>
              <div className="mt-4 md:mt-0 space-x-4">
                <span className="hover:text-gray-600 cursor-pointer transition-colors">Privacy Policy</span>
                <span className="hover:text-gray-600 cursor-pointer transition-colors">Terms of Service</span>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </Router>
  );
}

export default App;