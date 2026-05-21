import { Link, NavLink, useLocation } from 'react-router-dom';
import { GiTennisBall } from 'react-icons/gi';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiUser, FiCalendar, FiPlusSquare, FiSettings, FiLogOut } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../providers/AuthProvider';

const navLinks = [
  { label: 'Home',                 to: '/' },
  { label: 'All Facilities',       to: '/facilities' },
  { label: 'My Bookings',          to: '/my-bookings' },
  { label: 'Add Facility',         to: '/add-facility' },
  { label: 'Manage My Facilities', to: '/manage-my-facilities' },
];

const dropdownLinks = [
  { label: 'My Bookings',          to: '/my-bookings',          icon: FiCalendar },
  { label: 'Add Facility',         to: '/add-facility',         icon: FiPlusSquare },
  { label: 'Manage My Facilities', to: '/manage-my-facilities', icon: FiSettings },
];

const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [hovered, setHovered]     = useState(false);
  const hoverTimer                = useRef(null);
  const location                  = useLocation();
  const { user, logout }          = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHomePage    = location.pathname === '/';
  const useWhiteText  = isHomePage && !scrolled;

  const handleMouseEnter = () => {
    clearTimeout(hoverTimer.current);
    setHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimer.current = setTimeout(() => setHovered(false), 120);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'navbar-glass' : 'bg-transparent'
      }`}
    >
      <nav className="container-base flex items-center justify-between h-16 md:h-18">

        {/* ── Logo ─────────────────────────────────────────── */}
        <Link to="/" className="flex items-center gap-2 select-none" style={{ textDecoration: 'none' }}>
          <span
            className="flex items-center justify-center w-9 h-9 rounded-xl text-white text-lg"
            style={{ background: 'var(--gradient-brand)' }}
          >
            <GiTennisBall />
          </span>
          <span
            className="text-xl font-bold transition-colors duration-300"
            style={{ fontFamily: 'var(--font-display)', color: useWhiteText ? '#ffffff' : 'var(--color-dark)' }}
          >
            Sport<span className="text-gradient">Nest</span>
          </span>
        </Link>

        {/* ── Desktop Nav Links ─────────────────────────────── */}
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

        {/* ── Desktop Right: Name + Avatar (hover dropdown) ─── */}
        <div className="hidden xl:flex items-center gap-3">
          {user ? (
            <div
              className="relative flex items-center gap-3"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Name left */}
              <span
                className="text-xs font-semibold transition-colors duration-300 cursor-default"
                style={{ color: useWhiteText ? '#ffffffcc' : 'var(--color-muted)' }}
              >
                Hi, {user.name.split(' ')[0]}
              </span>

              {/* Avatar right */}
              <button className="focus:outline-none cursor-pointer flex-shrink-0">
                {user.photoUrl ? (
                  <img
                    src={user.photoUrl}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white/30 shadow-md transition-transform duration-200 hover:scale-105"
                  />
                ) : (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center ring-2 ring-white/30 shadow-md text-white font-bold text-sm transition-transform duration-200 hover:scale-105"
                    style={{ background: 'var(--gradient-brand)' }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </button>

              {/* Hover Dropdown */}
              <div
                className={`absolute top-[calc(100%+10px)] right-0 w-64 rounded-2xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-200 ${
                  hovered ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
                style={{
                  background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)',
                  zIndex: 999,
                }}
              >
                {/* User Info Header */}
                <div
                  className="px-5 py-4 flex items-center gap-3"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {user.photoUrl ? (
                    <img
                      src={user.photoUrl}
                      alt="Profile"
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-green-500/40 flex-shrink-0"
                    />
                  ) : (
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0"
                      style={{ background: 'var(--gradient-brand)' }}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                  </div>
                </div>

                {/* Nav Links */}
                <div className="py-2">
                  {dropdownLinks.map(({ label, to, icon: Icon }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setHovered(false)}
                      className="flex items-center gap-3 px-5 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/8 transition-all duration-150 group"
                      style={{ textDecoration: 'none' }}
                    >
                      <Icon className="text-base text-slate-400 group-hover:text-green-400 transition-colors flex-shrink-0" />
                      {label}
                    </Link>
                  ))}
                </div>

                {/* Logout */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} className="p-2">
                  <button
                    onClick={() => { logout(); setHovered(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-150 cursor-pointer font-medium"
                  >
                    <FiLogOut className="text-base flex-shrink-0" />
                    Logout
                  </button>
                </div>
              </div>
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

        {/* ── Mobile Toggle ─────────────────────────────────── */}
        <button
          id="navbar-mobile-toggle"
          className="xl:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors hover:bg-black/5"
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          {menuOpen
            ? <HiX      className="text-2xl transition-colors duration-300" style={{ color: useWhiteText ? '#ffffff' : 'var(--color-dark)' }} />
            : <HiMenuAlt3 className="text-2xl transition-colors duration-300" style={{ color: useWhiteText ? '#ffffff' : 'var(--color-dark)' }} />
          }
        </button>
      </nav>

      {/* ── Mobile Drawer ─────────────────────────────────── */}
      <div
        className={`xl:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(16px)' }}
      >
        <div className="container-base py-4 flex flex-col gap-1 border-t" style={{ borderColor: 'var(--color-border)' }}>
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'text-green-600 bg-green-50 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          <div className="flex flex-col gap-2 pt-3 border-t mt-1" style={{ borderColor: 'var(--color-border)' }}>
            {user ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50">
                  {user.photoUrl ? (
                    <img src={user.photoUrl} alt="Profile" className="w-10 h-10 rounded-full object-cover border border-slate-200 flex-shrink-0" />
                  ) : (
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ background: 'var(--gradient-brand)' }}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => { logout(); setMenuOpen(false); }}
                  className="btn-primary text-sm justify-center py-2.5 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-primary text-sm justify-center py-2.5">
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
