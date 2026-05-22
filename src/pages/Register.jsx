import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { toast } from 'react-hot-toast';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { GiTennisBall } from 'react-icons/gi';
import { GoogleLogin } from '@react-oauth/google';

const Register = () => {
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Read previous page target for post-login redirect, fallback to homepage '/'
  const from = location.state?.from?.pathname || '/';

  /**
   * Validates password rules:
   * - Minimum 6 characters
   * - One uppercase letter
   * - One lowercase letter
   */
  const validatePassword = (pwd) => {
    if (pwd.length < 6) return false;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    return hasUpper && hasLower;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all the required fields.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match. Please verify your inputs.');
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        'Password must be at least 6 characters, and contain at least one uppercase and one lowercase letter.'
      );
      return;
    }

    setSubmitting(true);
    try {
      await register(name, email, password, photoUrl);
      // Success is toasted in the provider, redirect immediately!
      navigate('/login', { replace: true });
    } catch (err) {
      // Errors are already handled and toasted by the AuthProvider
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setSubmitting(true);
      await googleLogin(credentialResponse.credential);
      navigate(from, { replace: true });
    } catch (err) {
      // Error handled by provider
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen py-24 overflow-hidden" style={{ background: 'var(--color-surface)' }}>
      {/* Decorative Blur Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 bg-green-500 -translate-x-1/2 -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 bg-sky-500 translate-x-1/2 -z-10" />

      <div className="container-base flex justify-center px-4 relative z-10">
        <div className="w-full max-w-md p-8 rounded-3xl border border-slate-100 bg-white shadow-xl">
          
          {/* Logo & Brand */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl text-white text-lg" style={{ background: 'var(--gradient-brand)' }}>
                <GiTennisBall />
              </span>
              <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-dark)' }}>
                Sport<span className="text-gradient">Nest</span>
              </span>
            </Link>
            <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-dark)' }}>
              Join the Nest
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
              Create an account and start booking sports facilities instantly.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Full Name Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  <FaUser />
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border border-slate-200 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all"
                  style={{ color: 'var(--color-dark)' }}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border border-slate-200 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all"
                  style={{ color: 'var(--color-dark)' }}
                  required
                />
              </div>
            </div>

            {/* Photo URL Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Photo URL
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                  📸
                </span>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border border-slate-200 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all"
                  style={{ color: 'var(--color-dark)' }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  <FaLock />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border border-slate-200 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all"
                  style={{ color: 'var(--color-dark)' }}
                  required
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Rules: Min 6 characters, one uppercase, one lowercase letter.
              </p>
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  <FaLock />
                </span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border border-slate-200 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all"
                  style={{ color: 'var(--color-dark)' }}
                  required
                />
              </div>
            </div>

            {/* Register Primary CTA */}
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary text-sm py-3.5 justify-center w-full mt-2 font-bold cursor-pointer"
            >
              {submitting ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Social Divider */}
          <div className="relative my-6 text-center">
            <span className="absolute inset-x-0 top-1/2 h-[1px] bg-slate-100 -z-10" />
            <span className="px-3 bg-white text-xs" style={{ color: 'var(--color-muted)' }}>
              Or sign up with
            </span>
          </div>

          {/* Google SSO Button */}
          <div className="flex justify-center w-full">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error('Google authentication failed.')}
              useOneTap
              theme="outline"
              size="large"
              width="360"
              text="signup_with"
            />
          </div>

          {/* Login link */}
          <p className="text-center text-xs mt-6" style={{ color: 'var(--color-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-green-600 hover:text-green-700">
              Sign In
            </Link>
          </p>

        </div>
      </div>
    </section>
  );
};

export default Register;
