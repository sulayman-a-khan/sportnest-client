import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import QueryProvider from './providers/QueryProvider';
import { AuthProvider } from './providers/AuthProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import router from './routes/router';
import './index.css';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'dummy-client-id.apps.googleusercontent.com';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* TanStack Query — global data-fetching layer */}
    <QueryProvider>
      <GoogleOAuthProvider clientId={googleClientId}>
        {/* AuthProvider — global authentication state */}
        <AuthProvider>
          {/* React Router — declarative routing */}
          <RouterProvider router={router} />
        </AuthProvider>
      </GoogleOAuthProvider>

      {/* React Hot Toast — global notification system */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: 'var(--color-brand-primary)',
              secondary: '#fff',
            },
          },
        }}
      />
    </QueryProvider>
  </StrictMode>
);
