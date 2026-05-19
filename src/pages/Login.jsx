import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { toast } from 'react-hot-toast';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { GiTennisBall } from 'react-icons/gi';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Read previous page target for post-login redirect, fallback to homepage '/'
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }

    setSubmitting(true);
    try {
      await login(email, password);
      // Success is toasted in the provider, redirect immediately!
      navigate(from, { replace: true });
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
              Welcome Back
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
              Log in to manage bookings and secure court times.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
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
            </div>

            {/* Forgot password */}
            <div className="text-right">
              <a href="#" className="text-xs font-semibold text-green-600 hover:text-green-700">
                Forgot Password?
              </a>
            </div>

            {/* Login Primary CTA */}
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary text-sm py-3.5 justify-center w-full mt-2 font-bold cursor-pointer"
            >
              {submitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Social Divider */}
          <div className="relative my-6 text-center">
            <span className="absolute inset-x-0 top-1/2 h-[1px] bg-slate-100 -z-10" />
            <span className="px-3 bg-white text-xs" style={{ color: 'var(--color-muted)' }}>
              Or continue with
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
            />
          </div>

          {/* Registration link */}
          <p className="text-center text-xs mt-6" style={{ color: 'var(--color-muted)' }}>
            Don&apos;t have an account yet?{' '}
            <Link to="/register" className="font-semibold text-green-600 hover:text-green-700">
              Create Free Account
            </Link>
          </p>

        </div>
      </div>
    </section>
  );
};

export default Login;
