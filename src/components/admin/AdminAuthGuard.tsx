import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { isAuthorizedAdmin } from '../../lib/adminAuth';
import { UtensilsCrossed } from 'lucide-react';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export const AdminAuthGuard: React.FC<AdminAuthGuardProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (mounted) {
          if (session && isAuthorizedAdmin(session.user)) {
            setAuthorized(true);
          } else {
            setAuthorized(false);
          }
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setAuthorized(false);
          setLoading(false);
        }
      }
    }

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        if (session && isAuthorizedAdmin(session.user)) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 rounded-2xl bg-[#E52E2D] flex items-center justify-center text-white shadow-xl shadow-red-900/40 animate-pulse mb-4">
          <UtensilsCrossed className="w-8 h-8" />
        </div>
        <p className="text-slate-300 font-medium text-sm">Verifying Owner Access...</p>
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
