import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  ShieldCheck,
  Volume2,
  LogOut,
  Smartphone,
  ExternalLink,
  Store,
  Check,
} from 'lucide-react';
import { AUTHORIZED_ADMIN_EMAIL, signOutOwner } from '../../lib/adminAuth';
import { orderSound } from '../../lib/audioNotification';

export const AdminSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [playedAudio, setPlayedAudio] = useState(false);

  const handleTestSound = () => {
    orderSound.playNewOrderChime();
    setPlayedAudio(true);
    setTimeout(() => setPlayedAudio(false), 2000);
  };

  const handleLogout = async () => {
    if (window.confirm('Do you want to sign out of the Vrindavan Treats Owner app?')) {
      await signOutOwner();
      navigate('/admin/login', { replace: true });
    }
  };

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">App Settings</h2>
        <p className="text-xs text-slate-400">Account details and notification preferences</p>
      </div>

      {/* Owner Profile Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#E52E2D] to-red-500 text-white flex items-center justify-center font-bold shadow-md shadow-red-900/30">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm sm:text-base">Restaurant Administrator</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{AUTHORIZED_ADMIN_EMAIL}</p>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 mt-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Verified Owner Role</span>
            </span>
          </div>
        </div>
      </div>

      {/* Audio Alerts */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Audio Notifications</h3>
        <p className="text-xs text-slate-300">
          When a customer submits an inquiry, an audible kitchen alert chime is sounded.
        </p>

        <button
          onClick={handleTestSound}
          className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          {playedAudio ? <Check className="w-4 h-4 text-emerald-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          <span>{playedAudio ? 'Chime Played!' : 'Test Kitchen Alert Chime'}</span>
        </button>
      </div>

      {/* Restaurant Info */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <Store className="w-4 h-4 text-red-400" />
          <span>Vrindavan Treats Information</span>
        </div>
        <div className="space-y-1.5 text-xs text-slate-300">
          <p><strong className="text-white">Store Location:</strong> Mathura / Vrindavan, Uttar Pradesh</p>
          <p><strong className="text-white">Live Customer Website:</strong></p>
          <a
            href="https://vrindavan-treats.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-red-400 hover:underline"
          >
            <span>https://vrindavan-treats.vercel.app</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Application Version */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-2 text-xs text-slate-400">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-slate-500" />
            <span>App Package</span>
          </span>
          <span className="font-mono text-slate-300 font-bold">com.vrindavantreats.owner</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Target Platform</span>
          <span className="text-slate-300">Android APK (Capacitor)</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Backend Database</span>
          <span className="text-emerald-400 font-bold">Supabase (ap-south-1)</span>
        </div>
      </div>

      {/* Sign Out Button */}
      <div className="pt-2">
        <button
          onClick={handleLogout}
          className="w-full py-3.5 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-bold text-xs rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out of Owner Account</span>
        </button>
      </div>
    </div>
  );
};
