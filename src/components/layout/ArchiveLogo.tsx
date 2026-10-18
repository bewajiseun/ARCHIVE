import React, { useState } from 'react';

interface ArchiveLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  align?: 'left' | 'center' | 'right';
  showSubtitle?: boolean;
}

export const ArchiveLogo: React.FC<ArchiveLogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
  align = 'center',
  showSubtitle = true,
}) => {
  const [imageError, setImageError] = useState(false);

  const isLight = variant === 'light';
  const logoSrc = isLight
    ? '/assets/ARCHIVE_Logo_Transparent_White.png'
    : '/assets/ARCHIVE_Logo_Transparent.png';

  const sizeStyles = {
    sm: 'h-7 sm:h-8',
    md: 'h-10 md:h-12',
    lg: 'h-14 sm:h-16 md:h-20',
    xl: 'h-20 sm:h-24 md:h-28 lg:h-32',
  };

  const alignStyles = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  };

  return (
    <div className={`flex flex-col justify-center select-none ${alignStyles[align]} ${className}`}>
      {!imageError ? (
        <img
          src={logoSrc}
          alt="ARCHIVE — Nigerian Creative History"
          className={`${sizeStyles[size]} w-auto object-contain transition-opacity duration-300`}
          onError={() => setImageError(true)}
          loading="eager"
        />
      ) : (
        /* Accessible, refined typographic fallback in Instrument Serif */
        <div
          className={`flex flex-col ${alignStyles[align]}`}
          role="img"
          aria-label="ARCHIVE — Nigerian Creative History"
        >
          <span
            className={`font-serif tracking-[0.06em] leading-none select-none ${
              isLight ? 'text-[#FAF8F4]' : 'text-[#171715]'
            } ${
              size === 'sm'
                ? 'text-xl sm:text-2xl'
                : size === 'md'
                ? 'text-3xl sm:text-4xl'
                : size === 'lg'
                ? 'text-5xl sm:text-6xl'
                : 'text-6xl sm:text-7xl lg:text-8xl'
            }`}
          >
            ARCHIVE
          </span>
          {showSubtitle && (
            <span
              className={`font-sans uppercase font-semibold mt-1.5 tracking-[0.24em] select-none ${
                isLight ? 'text-[#D5D0C1]/80' : 'text-[#171715]/80'
              } ${size === 'sm' ? 'text-[7px]' : size === 'md' ? 'text-[8.5px]' : 'text-[11px]'}`}
            >
              Nigerian Creative History
            </span>
          )}
        </div>
      )}
    </div>
  );
};
