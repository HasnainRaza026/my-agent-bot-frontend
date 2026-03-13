'use server';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  reply: string;
}

export async function sendChatMessage(
  message: string,
  history: Message[],
): Promise<string> {
  try {
    const res = await fetch(`${process.env.API_URL_PRODUCTION}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data: ChatResponse = await res.json();
    return data.reply;
  } catch (error) {
    console.error('Chat API error:', error);
    throw new Error('Sorry, I encountered an error. Please try again.');
  }
}
