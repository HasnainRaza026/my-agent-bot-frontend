'use client';

import Image from 'next/image';
import { useState } from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
};

export default function Avatar({
  src = '/avatar.png',
  alt = 'AI Avatar',
  size = 'md',
  className = '',
}: AvatarProps) {
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = () => {
    if (imageSrc.endsWith('.png')) {
      setImageSrc('/avatar.svg');
    }
  };

  return (
    <div
      className={`relative rounded-full overflow-hidden bg-muted ring-2 ring-accent ring-offset-2 ring-offset-background ${sizeClasses[size]} ${className}`}
    >
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className='object-cover'
        priority
        onError={handleError}
      />
    </div>
  );
}
