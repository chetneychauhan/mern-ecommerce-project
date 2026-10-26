
import { useState } from 'react';
import API from '../api';

const suggestions = [
  'Recommend products under ₹2,000',
  'What products are in stock?',
  'Help me compare products',
];

function formatAIResponse(text) {
  const decoded = text
    .replace(/&#x20;/gi, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'");

  return decoded
    .replace(/\\\*\*/g, '**')
    .replace(/\\\*/g, '*')
    .replace(/\\_/g, '_')
    .split('\n')
    .map((line, index) => {
      const cleaned = line
        .replace(/^\s*\\?\*\s+/, '• ')
        .replace(/^\s*[-]\s+/, '• ')
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '$1')
        .trim();

      return cleaned ? (
        <span key={index} className="block">
          {cleaned}
        </span>
      ) : (
        <span key={index} className="block h-2" />
      );
    });
}

export default function AIShoppingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hi! 👋 I'm ShopNova AI. Tell me what you're looking for, and I'll help you explore our products.",
    },
  ]);

  const sendMessage = async (text = input) => {
    const message = text.trim();

    if (!message || loading) return;

    setMessages((previous) => [
      ...previous,
      { role: 'user', text: message },
    ]);
    setInput('');
    setLoading(true);

    try {
      const { data } = await API.post('/api/ai/chat', { message });

      setMessages((previous) => [
        ...previous,
        { role: 'assistant', text: data.reply },
      ]);
    } catch (error) {
      setMessages((previous) => [
        ...previous,
        {
          role: 'assistant',
          text:
            error.response?.data?.message ||
            'Sorry, I could not connect right now. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[1000] font-sans">
      {isOpen && (
        <section className="mb-3 flex h-[min(520px,75vh)] w-[min(360px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
          <header className="flex items-center justify-between bg-indigo-600 px-4 py-4 text-white">
            <div>
              <h2 className="font-bold">ShopNova AI</h2>
              <p className="text-xs text-indigo-100">
                Your personal shopping assistant
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close shopping assistant"
              className="rounded-lg px-3 py-1 text-xl hover:bg-indigo-500"
            >
              ×
            </button>
          </header>

          <div
            className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-3"
            aria-live="polite"
          >
            {messages.map((message, index) => (
              <div
                key={`${index}-${message.role}`}
                className={`flex ${
                  message.role === 'user'
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[88%] break-words rounded-2xl px-3 py-2 text-sm ${
                    message.role === 'user'
                      ? 'whitespace-pre-wrap bg-indigo-600 text-white'
                      : 'border border-gray-200 bg-white text-gray-800'
                  }`}
                >
                  {message.role === 'assistant'
                    ? formatAIResponse(message.text)
                    : message.text}
                </div>
              </div>
            ))}

            {loading && (
              <p className="text-sm text-gray-500" role="status">
                ShopNova AI is thinking...
              </p>
            )}
          </div>

          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 border-t bg-white p-3">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  disabled={loading}
                  onClick={() => sendMessage(suggestion)}
                  className="rounded-full border border-indigo-200 px-3 py-2 text-left text-xs text-indigo-700 hover:bg-indigo-50 disabled:opacity-50"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
            className="flex gap-2 border-t bg-white p-3"
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about our products..."
              maxLength={1000}
              aria-label="Message for ShopNova AI"
              className="min-w-0 flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </section>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setIsOpen((previous) => !previous)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close ShopNova AI' : 'Open ShopNova AI'}
          className="flex h-14 items-center gap-2 rounded-full bg-indigo-600 px-5 font-semibold text-white shadow-lg transition hover:bg-indigo-700"
        >
          <span className="text-xl" aria-hidden="true">
            ✦
          </span>
          <span>{isOpen ? 'Close chat' : 'Ask ShopNova AI'}</span>
        </button>
      </div>
    </div>
  );
}
