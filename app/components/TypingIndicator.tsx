'use client';

import Avatar from './Avatar';

interface TypingIndicatorProps {
  avatarSrc?: string;
}

export default function TypingIndicator({
  avatarSrc = '/avatar.png',
}: TypingIndicatorProps) {
  return (
    <div className='flex items-start gap-3 py-4 px-4'>
      <div className='shrink-0'>
        <Avatar src={avatarSrc} size='sm' />
      </div>
      <div className='flex flex-col items-start'>
        <span className='text-xs mb-1 text-accent'>AI</span>
        <div className='px-4 py-3 rounded-2xl rounded-tl-sm bg-card'>
          <div className='flex items-center gap-1'>
            <span className='w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]'></span>
            <span className='w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]'></span>
            <span className='w-2 h-2 bg-muted-foreground rounded-full animate-bounce'></span>
          </div>
        </div>
      </div>
    </div>
  );
}
