'use client';

import Avatar from './Avatar';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  avatarSrc?: string;
}

export default function ChatMessage({
  role,
  content,
  avatarSrc = '/avatar.png',
}: ChatMessageProps) {
  const isAssistant = role === 'assistant';

  return (
    <div
      className={`flex items-start gap-3 py-4 px-4 ${
        isAssistant ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      {isAssistant && (
        <div className='shrink-0'>
          <Avatar src={avatarSrc} size='sm' />
        </div>
      )}
      <div
        className={`flex flex-col max-w-[80%] ${
          isAssistant ? 'items-start' : 'items-end'
        }`}
      >
        <span
          className={`text-xs mb-1 ${
            isAssistant ? 'text-accent' : 'text-muted-foreground'
          }`}
        >
          {isAssistant ? 'AI' : 'You'}
        </span>
        <div
          className={`px-4 py-3 rounded-2xl leading-relaxed ${
            isAssistant
              ? 'bg-card text-card-foreground rounded-tl-sm'
              : 'bg-accent text-white rounded-tr-sm'
          }`}
        >
          <p className='whitespace-pre-wrap text-sm'>{content}</p>
        </div>
      </div>
    </div>
  );
}
