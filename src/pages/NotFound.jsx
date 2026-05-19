import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TbMoodSad } from 'react-icons/tb';

/**
 * NotFound (404) — Displayed when no route matches the current URL.
 */
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <TbMoodSad
          className="mx-auto mb-6 opacity-20"
          style={{ fontSize: '8rem', color: 'var(--color-brand-primary)' }}
        />

        <h1
          className="text-8xl font-extrabold mb-2 text-gradient"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          404
        </h1>

        <p className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          Oops! Page Not Found
        </p>

        <p className="max-w-sm mx-auto opacity-60 mb-8 text-sm leading-relaxed">
          The page you are looking for does not exist or has been moved.
          Head back to the home page to continue browsing.
        </p>

        <Link
          to="/"
          id="not-found-home-btn"
          className="inline-block px-6 py-3 rounded-xl text-white font-semibold transition-transform hover:scale-105"
          style={{ background: 'var(--color-brand-primary)' }}
        >
          ← Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
