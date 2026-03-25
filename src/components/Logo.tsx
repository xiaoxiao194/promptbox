export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logo-bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="logo-shine" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0.25" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Rounded square background */}
      <rect width="40" height="40" rx="10" fill="url(#logo-bg)" />
      {/* Glass shine */}
      <rect width="40" height="20" rx="10" fill="url(#logo-shine)" />
      {/* Prompt cursor bracket < > */}
      <path d="M12 14L7 20L12 26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 14L33 20L28 26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Center sparkle / magic dot */}
      <circle cx="20" cy="20" r="2.5" fill="white" />
      <circle cx="20" cy="13" r="1.2" fill="white" opacity="0.7" />
      <circle cx="20" cy="27" r="1.2" fill="white" opacity="0.7" />
      <circle cx="15" cy="16" r="0.8" fill="white" opacity="0.5" />
      <circle cx="25" cy="24" r="0.8" fill="white" opacity="0.5" />
    </svg>
  );
}
