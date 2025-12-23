// components/Logo.tsx
import Image from 'next/image';

export default function Logo() {
  return (
    <Image
      src="/icons/eswap-logo.png" // Path to the new logo in the public folder
      alt="Eswap Max Logo"        // Alt text for the logo
      width={44}                  // Default width (from original md:w-11)
      height={44}                 // Default height (from original md:h-11)
      className="logo md:w-11 md:h-11 w-8 h-8" // Keep existing classes for sizing
    />
  );
}