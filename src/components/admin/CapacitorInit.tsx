import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { App as CapApp } from '@capacitor/app';

export const CapacitorInit: React.FC = () => {
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      // Configure native status bar
      StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
      StatusBar.setBackgroundColor({ color: '#020617' }).catch(() => {});

      // Handle Android hardware back button
      const backListener = CapApp.addListener('backButton', ({ canGoBack }) => {
        if (canGoBack && window.location.pathname !== '/admin/dashboard' && window.location.pathname !== '/admin/login') {
          window.history.back();
        } else {
          CapApp.exitApp();
        }
      });

      return () => {
        backListener.then((listener) => listener.remove());
      };
    }
  }, []);

  return null;
};
