import { Link } from 'react-router-dom';
import { GiTennisBall } from 'react-icons/gi';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiMail, HiLocationMarker, HiPhone } from 'react-icons/hi';

const footerLinks = {
  Company:  ['About Us', 'Careers', 'Press', 'Blog'],
  Explore:  ['Facilities', 'Coaches', 'Tournaments', 'Memberships'],
  Support:  ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'],
};

const socialLinks = [
  { icon: <FaFacebookF />,  href: '#', label: 'Facebook'  },
  { icon: <FaXTwitter />,   href: '#', label: 'X (formerly Twitter)' },
  { icon: <FaInstagram />,  href: '#', label: 'Instagram' },
  { icon: <FaYoutube />,    href: '#', label: 'YouTube'   },
  { icon: <FaLinkedinIn />, href: '#', label: 'LinkedIn'  },
];

const contactInfo = [
  { icon: <HiLocationMarker />, text: 'Dhaka, Bangladesh' },
  { icon: <HiPhone />,          text: '+880 1700 000000'  },
  { icon: <HiMail />,           text: 'hello@sportnest.io' },
];

const Footer = () => {
  return (
    <footer style={{ background: 'var(--color-dark)', color: '#94a3b8' }}>

      {/* ── Top section ─────────────────────────────────── */}
      <div className="container-base pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column — spans 2 cols on lg */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 mb-4" style={{ textDecoration: 'none' }}>
              <span
                className="flex items-center justify-center w-9 h-9 rounded-xl text-white text-lg"
                style={{ background: 'var(--gradient-brand)' }}
              >
                <GiTennisBall />
              </span>
              <span
                className="text-xl font-bold text-white"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Sport<span className="text-gradient">Nest</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed mb-5 max-w-xs" style={{ color: '#64748b' }}>
              Your one-stop platform for discovering and booking premium sports
              facilities — football, tennis, swimming, and more.
            </p>

            {/* Contact info */}
            <ul className="flex flex-col gap-2 mb-6">
              {contactInfo.map(({ icon, text }) => (
                <li key={text} className="flex items-center gap-2 text-sm" style={{ color: '#64748b' }}>
                  <span style={{ color: 'var(--color-brand-primary)' }}>{icon}</span>
                  {text}
                </li>
              ))}
            </ul>

            {/* Social icons */}
            <div className="flex gap-2">
              {socialLinks.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg text-sm transition-all hover:scale-110"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    color: '#94a3b8',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(22,163,74,0.2)';
                    e.currentTarget.style.color = '#4ade80';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.color = '#94a3b8';
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4
                className="text-white font-semibold text-sm mb-4 uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.08em' }}
              >
                {heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-all hover:text-white"
                      style={{
                        color: '#64748b',
                        textDecoration: 'none',
                        position: 'relative',
                        paddingLeft: 0,
                        transition: 'color 0.2s, padding-left 0.2s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.paddingLeft = '6px';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = '#64748b';
                        e.currentTarget.style.paddingLeft = '0px';
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Newsletter strip ─────────────────────────── */}
        <div
          className="mt-12 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div>
            <p className="text-white font-semibold mb-1" style={{ fontFamily: 'var(--font-display)' }}>
              Stay in the game 🏃‍♂️
            </p>
            <p className="text-sm" style={{ color: '#64748b' }}>
              Get facility deals and sports tips straight to your inbox.
            </p>
          </div>
          <form
            className="flex gap-2 w-full sm:w-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="you@email.com"
              className="px-4 py-2.5 rounded-xl text-sm flex-1 sm:w-56 outline-none focus:ring-2"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#fff',
              }}
            />
            <button type="submit" className="btn-primary text-sm py-2.5 whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────── */}
      <div
        className="border-t"
        style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      >
        <div className="container-base py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{ color: '#334155' }}>
          <span>&copy; {new Date().getFullYear()} SportNest. All rights reserved.</span>
          <span>Built with ❤️ for sports lovers everywhere</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
