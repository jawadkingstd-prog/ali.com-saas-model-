import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        // Premium High-Contrast Dark Theme Design
        style: {
          background: '#0f172a',      // Slate 900 (Premium Dark)
          color: '#f8fafc',           // Slate 50 (High Contrast White)
          border: '1px solid #334155', // Slate 700 Border
          padding: '12px 16px',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)',
        },
        // Success Popup Customization
        success: {
          duration: 4000,
          iconTheme: {
            primary: '#10b981',      // Emerald Green
            secondary: '#0f172a',
          },
          style: {
            borderLeft: '4px solid #10b981',
          },
        },
        // Error Popup Customization (In case fail ho jaye)
        error: {
          duration: 4000,
          iconTheme: {
            primary: '#f43f5e',      // Rose Red
            secondary: '#0f172a',
          },
          style: {
            borderLeft: '4px solid #f43f5e',
          },
        },
      }}
    />
  );
}