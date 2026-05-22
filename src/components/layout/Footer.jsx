import { Link } from 'react-router-dom';
import { GiTennisBall } from 'react-icons/gi';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiMail, HiLocationMarker, HiPhone } from 'react-icons/hi';

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
      <div className="container-base pt-16 pb-8">
        <div className="flex flex-col items-center text-center max-w-xl mx-auto">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-6" style={{ textDecoration: 'none' }}>
            <span
              className="flex items-center justify-center w-10 h-10 rounded-xl text-white text-xl shadow-lg shadow-green-500/20"
              style={{ background: 'var(--gradient-brand)' }}
            >
              <GiTennisBall />
            </span>
            <span
              className="text-2xl font-bold text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Sport<span className="text-gradient">Nest</span>
            </span>
          </Link>

          <p className="text-sm leading-relaxed mb-8" style={{ color: '#64748b' }}>
            Your one-stop platform for discovering and booking premium sports
            facilities — football, tennis, swimming, and more.
          </p>

          {/* Contact info */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-8 mb-8">
            {contactInfo.map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm" style={{ color: '#94a3b8' }}>
                <span className="text-lg" style={{ color: 'var(--color-brand-primary)' }}>{icon}</span>
                {text}
              </div>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex gap-3 mb-10">
            {socialLinks.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex items-center justify-center w-10 h-10 rounded-xl text-base transition-all hover:scale-110 hover:-translate-y-1"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  color: '#94a3b8',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(22,163,74,0.15)';
                  e.currentTarget.style.color = '#4ade80';
                  e.currentTarget.style.borderColor = 'rgba(74,222,128,0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.color = '#94a3b8';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────── */}
        <div
          className="border-t pt-8 mt-4"
          style={{ borderColor: 'rgba(255,255,255,0.07)' }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs"
            style={{ color: '#64748b' }}>
            <span>&copy; {new Date().getFullYear()} SportNest. All rights reserved.</span>
            <span>Built with ❤️ for sports lovers everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
