'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export default function ChatInput({
  onSend,
  isLoading = false,
  placeholder = 'Ask me anything...',
}: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [value]);

  const handleSend = () => {
    const text = value.trim();
    if (!text || isLoading) return;
    onSend(text);
    setValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className='w-full p-4 border-t border-border bg-background'>
      <div className='max-w-3xl mx-auto'>
        <div className='relative flex items-end bg-input rounded-2xl border border-border focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all duration-200'>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isLoading}
            rows={1}
            className='flex-1 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground resize-none outline-none focus:outline-none! focus:ring-0 border-none min-h-12 max-h-50'
          />
          <button
            onClick={handleSend}
            disabled={!value.trim() || isLoading}
            className='shrink-0 p-3 m-1 rounded-xl bg-accent text-white hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
            aria-label='Send message'
          >
            {isLoading ? (
              <Loader2 className='w-5 h-5 animate-spin' />
            ) : (
              <Send className='w-5 h-5' />
            )}
          </button>
        </div>
        <p className='text-center text-xs text-muted-foreground mt-2'>
          Press{' '}
          <kbd className='px-1.5 py-0.5 bg-muted rounded text-[10px]'>
            Enter
          </kbd>{' '}
          to send,{' '}
          <kbd className='px-1.5 py-0.5 bg-muted rounded text-[10px]'>
            Shift+Enter
          </kbd>{' '}
          for new line
        </p>
      </div>
    </div>
  );
}
