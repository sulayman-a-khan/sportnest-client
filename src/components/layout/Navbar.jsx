import { Link, NavLink, useLocation } from 'react-router-dom';
import { GiTennisBall } from 'react-icons/gi';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { useAuth } from '../../providers/AuthProvider';

const navLinks = [
  { label: 'Home',                  to: '/' },
  { label: 'All Facilities',        to: '/facilities' },
  { label: 'My Bookings',           to: '/my-bookings' },
  { label: 'Add Facility',          to: '/add-facility' },
  { label: 'Manage My Facilities',  to: '/manage-my-facilities' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHomePage = location.pathname === '/';
  const useWhiteText = isHomePage && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'navbar-glass' : 'bg-transparent'
      }`}
    >
      <nav className="container-base flex items-center justify-between h-16 md:h-18">

        {/* ── Logo & Site Name ─────────────────────────────── */}
        <Link
          to="/"
          className="flex items-center gap-2 select-none"
          style={{ textDecoration: 'none' }}
        >
          <span
            className="flex items-center justify-center w-9 h-9 rounded-xl text-white text-lg"
            style={{ background: 'var(--gradient-brand)' }}
          >
            <GiTennisBall />
          </span>
          <span
            className="text-xl font-bold transition-colors duration-300"
            style={{ 
              fontFamily: 'var(--font-display)', 
              color: useWhiteText ? '#ffffff' : 'var(--color-dark)' 
            }}
          >
            Sport<span className="text-gradient">Nest</span>
          </span>
        </Link>

        {/* ── Desktop nav links ─────────────────────────────── */}
        <ul className="hidden xl:flex items-center gap-6">
          {navLinks.map(({ label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `nav-link ${useWhiteText ? 'nav-link-white' : 'nav-link-dark'} ${isActive ? 'active' : ''}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── Desktop CTA ───────────────────────────────────── */}
        <div className="hidden xl:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              <span 
                className="text-xs font-semibold transition-colors duration-300" 
                style={{ color: useWhiteText ? '#ffffff' : 'var(--color-muted)' }}
              >
                Hi, {user.name.split(' ')[0]}
              </span>
              <button 
                onClick={logout}
                className="btn-primary text-xs py-2 px-5 shadow-none hover:shadow-md transition-all duration-300 cursor-pointer"
                style={{
                  background: useWhiteText ? '#ffffff' : 'var(--color-brand-primary)',
                  color: useWhiteText ? 'var(--color-brand-primary)' : '#ffffff',
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="btn-primary text-xs py-2 px-5 shadow-none hover:shadow-md transition-all duration-300"
              style={{
                background: useWhiteText ? '#ffffff' : 'var(--color-brand-primary)',
                color: useWhiteText ? 'var(--color-brand-primary)' : '#ffffff',
              }}
            >
              Login
            </Link>
          )}
        </div>

        {/* ── Mobile & Tablet Menu Toggle ────────────────────── */}
        <button
          id="navbar-mobile-toggle"
          className="xl:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors hover:bg-black/5"
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          {menuOpen
            ? <HiX className="text-2xl transition-colors duration-300" style={{ color: useWhiteText ? '#ffffff' : 'var(--color-dark)' }} />
            : <HiMenuAlt3 className="text-2xl transition-colors duration-300" style={{ color: useWhiteText ? '#ffffff' : 'var(--color-dark)' }} />
          }
        </button>
      </nav>

      {/* ── Mobile/Tablet Drawer ─────────────────────────── */}
      <div
        className={`xl:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(16px)' }}
      >
        <div className="container-base py-4 flex flex-col gap-1 border-t"
          style={{ borderColor: 'var(--color-border)' }}>
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-green-600 bg-green-50 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <div className="flex flex-col gap-2 pt-3 border-t mt-1"
            style={{ borderColor: 'var(--color-border)' }}>
            {user ? (
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-center text-slate-700 py-1">
                  Hi, {user.name}
                </span>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="btn-primary text-sm justify-center py-2.5 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="btn-primary text-sm justify-center py-2.5"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
