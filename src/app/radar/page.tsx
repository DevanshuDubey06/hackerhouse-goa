'use client';

import { useEffect } from 'react';
import { CHECK_HYPE_URL } from '@/lib/config';

export default function RadarRedirectPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.href = CHECK_HYPE_URL;
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#1E5B3A] text-[#F6F0D8] flex flex-col items-center justify-center font-mono text-sm p-4 text-center">
      <div className="w-8 h-8 border-2 border-[#F5DD3B] border-t-transparent rounded-full animate-spin mb-4" />
      <p className="font-mono text-xs text-[#F5DD3B] uppercase tracking-wider">
        REDIRECTING TO HACKER HOUSE GOA CHECK THE HYPE...
      </p>
    </div>
  );
}
