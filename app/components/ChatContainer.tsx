'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { Avatar, ChatMessage, ChatInput, TypingIndicator } from './index';
import { sendChatMessage } from '../actions/chat';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm here to answer any questions you have. Ask me anything!",
    },
  ]);
  const [isPending, startTransition] = useTransition();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isPending]);

  const handleSend = (text: string) => {
    const newUser: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, newUser]);

    // Build history (keep it small)
    const history = messages
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .slice(-8)
      .map((m) => ({ role: m.role, content: m.content }));

    startTransition(async () => {
      try {
        const reply = await sendChatMessage(text, history);
        setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Sorry, I encountered an error. Please try again.';
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: errorMessage },
        ]);
      }
    });
  };

  return (
    <div className='h-screen flex flex-col bg-background'>
      {/* Header with Avatar */}
      <header className='shrink-0 pt-8 pb-4 border-b border-border'>
        <div className='flex flex-col items-center gap-3'>
          <Avatar size='xl' />
          <div className='text-center'>
            <h1 className='text-xl font-semibold text-foreground'>
              Chat with Me
            </h1>
            <p className='text-sm text-muted-foreground'>
              Ask me anything about my career, background, skills and
              experience.
            </p>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <main className='flex-1 overflow-y-auto'>
        <div className='max-w-3xl mx-auto'>
          {messages.map((m, i) => (
            <ChatMessage key={i} role={m.role} content={m.content} />
          ))}
          {isPending && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <ChatInput onSend={handleSend} isLoading={isPending} />
    </div>
  );
}
