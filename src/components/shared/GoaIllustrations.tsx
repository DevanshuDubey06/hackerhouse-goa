'use client';

import React from 'react';

// ============================================================
// Palm Tree SVG
// ============================================================
export function PalmTree({
  className = '',
  color = '#1E5B3A',
  height = 200,
}: {
  className?: string;
  color?: string;
  height?: number;
}) {
  return (
    <svg
      viewBox="0 0 120 200"
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Trunk */}
      <path
        d="M58 200 C58 200, 55 140, 60 80 C62 60, 58 45, 60 30"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Left fronds */}
      <path
        d="M60 30 C45 25, 15 15, 5 30 C15 22, 40 20, 55 28"
        stroke={color}
        strokeWidth="2.5"
        fill={color}
        opacity="0.8"
      />
      <path
        d="M58 35 C40 32, 8 35, 2 50 C12 40, 38 33, 55 34"
        stroke={color}
        strokeWidth="2.5"
        fill={color}
        opacity="0.7"
      />
      <path
        d="M55 40 C35 42, 10 55, 8 68 C18 55, 38 42, 54 40"
        stroke={color}
        strokeWidth="2"
        fill={color}
        opacity="0.6"
      />
      {/* Right fronds */}
      <path
        d="M60 30 C75 25, 105 15, 115 30 C105 22, 80 20, 65 28"
        stroke={color}
        strokeWidth="2.5"
        fill={color}
        opacity="0.8"
      />
      <path
        d="M62 35 C80 32, 112 35, 118 50 C108 40, 82 33, 65 34"
        stroke={color}
        strokeWidth="2.5"
        fill={color}
        opacity="0.7"
      />
      <path
        d="M65 40 C85 42, 110 55, 112 68 C102 55, 82 42, 66 40"
        stroke={color}
        strokeWidth="2"
        fill={color}
        opacity="0.6"
      />
      {/* Coconuts */}
      <circle cx="55" cy="32" r="4" fill={color} opacity="0.5" />
      <circle cx="65" cy="32" r="4" fill={color} opacity="0.5" />
      <circle cx="60" cy="28" r="3.5" fill={color} opacity="0.5" />
    </svg>
  );
}

// ============================================================
// Sun SVG
// ============================================================
export function Sun({
  className = '',
  size = 120,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="60"
        cy="60"
        r="30"
        fill="#F5DD3B"
        opacity="0.9"
      />
      <circle
        cx="60"
        cy="60"
        r="40"
        fill="#F5DD3B"
        opacity="0.2"
      />
      <circle
        cx="60"
        cy="60"
        r="50"
        fill="#F5DD3B"
        opacity="0.08"
      />
      {/* Rays */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
        (angle) => (
          <line
            key={angle}
            x1="60"
            y1="60"
            x2={60 + Math.cos((angle * Math.PI) / 180) * 55}
            y2={60 + Math.sin((angle * Math.PI) / 180) * 55}
            stroke="#F5DD3B"
            strokeWidth="1.5"
            opacity="0.3"
          />
        )
      )}
    </svg>
  );
}

// ============================================================
// Ocean Waves SVG
// ============================================================
export function OceanWaves({
  className = '',
  color = '#1E5B3A',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={`w-full ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 60 C120 30, 240 90, 360 60 C480 30, 600 90, 720 60 C840 30, 960 90, 1080 60 C1200 30, 1320 90, 1440 60 L1440 120 L0 120 Z"
        fill={color}
        opacity="0.15"
      />
      <path
        d="M0 75 C120 50, 240 100, 360 75 C480 50, 600 100, 720 75 C840 50, 960 100, 1080 75 C1200 50, 1320 100, 1440 75 L1440 120 L0 120 Z"
        fill={color}
        opacity="0.25"
      />
      <path
        d="M0 90 C120 70, 240 110, 360 90 C480 70, 600 110, 720 90 C840 70, 960 110, 1080 90 C1200 70, 1320 110, 1440 90 L1440 120 L0 120 Z"
        fill={color}
        opacity="0.4"
      />
    </svg>
  );
}

// ============================================================
// Goa House SVG
// ============================================================
export function GoaHouse({
  className = '',
  size = 180,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 180 160"
      width={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Main building */}
      <rect
        x="30"
        y="50"
        width="120"
        height="100"
        fill="#F6F0D8"
        stroke="#17251C"
        strokeWidth="2.5"
      />
      {/* Roof */}
      <path
        d="M20 55 L90 15 L160 55"
        stroke="#17251C"
        strokeWidth="3"
        fill="#E62E78"
        opacity="0.8"
      />
      {/* Door */}
      <rect
        x="75"
        y="100"
        width="30"
        height="50"
        fill="#1E5B3A"
        stroke="#17251C"
        strokeWidth="2"
        rx="15"
      />
      {/* Windows */}
      <rect
        x="42"
        y="70"
        width="22"
        height="22"
        fill="#F5DD3B"
        stroke="#17251C"
        strokeWidth="2"
        opacity="0.7"
      />
      <line x1="53" y1="70" x2="53" y2="92" stroke="#17251C" strokeWidth="1.5" />
      <line x1="42" y1="81" x2="64" y2="81" stroke="#17251C" strokeWidth="1.5" />
      <rect
        x="116"
        y="70"
        width="22"
        height="22"
        fill="#F5DD3B"
        stroke="#17251C"
        strokeWidth="2"
        opacity="0.7"
      />
      <line x1="127" y1="70" x2="127" y2="92" stroke="#17251C" strokeWidth="1.5" />
      <line x1="116" y1="81" x2="138" y2="81" stroke="#17251C" strokeWidth="1.5" />
      {/* Balcony */}
      <rect x="55" y="65" width="70" height="3" fill="#17251C" opacity="0.3" />
      {/* Cross on top */}
      <line x1="90" y1="8" x2="90" y2="18" stroke="#17251C" strokeWidth="2" />
      <line x1="85" y1="12" x2="95" y2="12" stroke="#17251C" strokeWidth="2" />
    </svg>
  );
}

// ============================================================
// Beach Umbrella SVG
// ============================================================
export function BeachUmbrella({
  className = '',
  size = 100,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 100 120"
      width={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Pole */}
      <line x1="50" y1="35" x2="50" y2="115" stroke="#17251C" strokeWidth="3" />
      {/* Umbrella top */}
      <path
        d="M10 40 C10 15, 90 15, 90 40"
        fill="#E62E78"
        stroke="#17251C"
        strokeWidth="2"
      />
      {/* Stripes */}
      <path d="M30 18 L25 40" stroke="#F5DD3B" strokeWidth="1.5" opacity="0.5" />
      <path d="M50 14 L50 40" stroke="#F5DD3B" strokeWidth="1.5" opacity="0.5" />
      <path d="M70 18 L75 40" stroke="#F5DD3B" strokeWidth="1.5" opacity="0.5" />
      {/* Top knob */}
      <circle cx="50" cy="14" r="3" fill="#F5DD3B" stroke="#17251C" strokeWidth="1.5" />
    </svg>
  );
}

// ============================================================
// Scooter SVG
// ============================================================
export function Scooter({
  className = '',
  size = 100,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 120 80"
      width={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Body */}
      <path
        d="M30 45 L50 30 L80 30 L95 45"
        stroke="#17251C"
        strokeWidth="2.5"
        fill="#F5DD3B"
        opacity="0.8"
      />
      {/* Seat */}
      <path
        d="M48 30 L78 30"
        stroke="#17251C"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Front */}
      <path
        d="M80 30 L95 15 L98 15"
        stroke="#17251C"
        strokeWidth="2"
        fill="none"
      />
      {/* Handlebar */}
      <line x1="93" y1="12" x2="103" y2="12" stroke="#17251C" strokeWidth="2.5" />
      {/* Headlight */}
      <circle cx="98" cy="18" r="2" fill="#F5DD3B" />
      {/* Wheels */}
      <circle cx="30" cy="55" r="12" fill="none" stroke="#17251C" strokeWidth="2.5" />
      <circle cx="30" cy="55" r="4" fill="#17251C" />
      <circle cx="95" cy="55" r="12" fill="none" stroke="#17251C" strokeWidth="2.5" />
      <circle cx="95" cy="55" r="4" fill="#17251C" />
      {/* Mudguard */}
      <path
        d="M18 48 C20 38, 40 38, 42 48"
        stroke="#17251C"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

// ============================================================
// Boat SVG
// ============================================================
export function Boat({
  className = '',
  size = 80,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 100 60"
      width={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Hull */}
      <path
        d="M10 40 L20 55 L80 55 L90 40"
        fill="#F6F0D8"
        stroke="#17251C"
        strokeWidth="2"
      />
      {/* Mast */}
      <line x1="50" y1="10" x2="50" y2="40" stroke="#17251C" strokeWidth="2" />
      {/* Sail */}
      <path
        d="M50 12 L75 35 L50 35 Z"
        fill="#E62E78"
        opacity="0.6"
        stroke="#17251C"
        strokeWidth="1.5"
      />
      {/* Flag */}
      <path
        d="M50 10 L60 14 L50 18"
        fill="#F5DD3B"
        stroke="#17251C"
        strokeWidth="1"
      />
    </svg>
  );
}

// ============================================================
// Surfboard SVG
// ============================================================
export function Surfboard({
  className = '',
  size = 80,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 30 100"
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M15 5 C22 5, 28 25, 28 50 C28 75, 22 95, 15 95 C8 95, 2 75, 2 50 C2 25, 8 5, 15 5 Z"
        fill="#F5DD3B"
        stroke="#17251C"
        strokeWidth="2"
      />
      {/* Stripe */}
      <path
        d="M15 15 L15 85"
        stroke="#E62E78"
        strokeWidth="2"
        opacity="0.5"
      />
      {/* Fin */}
      <path
        d="M15 80 L20 90 L15 95"
        fill="#17251C"
        opacity="0.3"
      />
    </svg>
  );
}

// ============================================================
// Tropical Scene (composed background)
// ============================================================
export function TropicalScene({ className = '' }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Sun */}
      <div className="absolute -top-10 right-[10%] opacity-40">
        <Sun size={180} />
      </div>

      {/* Palm trees */}
      <div className="absolute bottom-0 left-[3%] opacity-20">
        <PalmTree height={280} color="#F6F0D8" />
      </div>
      <div className="absolute bottom-0 right-[5%] opacity-15 scale-x-[-1]">
        <PalmTree height={240} color="#F6F0D8" />
      </div>
      <div className="absolute bottom-0 left-[15%] opacity-10">
        <PalmTree height={200} color="#F6F0D8" />
      </div>

      {/* Ocean waves at bottom */}
      <div className="absolute bottom-0 left-0 right-0 opacity-30">
        <OceanWaves color="#F6F0D8" />
      </div>
    </div>
  );
}

// ============================================================
// Stamp / Badge component
// ============================================================
export function GoaStamp({
  className = '',
  size = 80,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer circle */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="#F6F0D8"
        strokeWidth="2"
        strokeDasharray="4 3"
        opacity="0.8"
      />
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="#F6F0D8"
        strokeWidth="1"
        opacity="0.4"
      />
      {/* Text along path - simplified */}
      <text
        x="50"
        y="35"
        textAnchor="middle"
        fill="#F6F0D8"
        fontSize="8"
        fontFamily="monospace"
        fontWeight="bold"
        letterSpacing="2"
      >
        BUILDERS OF
      </text>
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fill="#F6F0D8"
        fontSize="18"
        fontFamily="serif"
        fontWeight="bold"
        fontStyle="italic"
      >
        GOA
      </text>
      <text
        x="50"
        y="75"
        textAnchor="middle"
        fill="#F6F0D8"
        fontSize="7"
        fontFamily="monospace"
        letterSpacing="1"
      >
        2026
      </text>
      {/* Small palm */}
      <path
        d="M50 42 C47 40, 40 38, 38 42 C42 39, 47 40, 49 42"
        fill="#F6F0D8"
        opacity="0.6"
      />
      <path
        d="M50 42 C53 40, 60 38, 62 42 C58 39, 53 40, 51 42"
        fill="#F6F0D8"
        opacity="0.6"
      />
    </svg>
  );
}
