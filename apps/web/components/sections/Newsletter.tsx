'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { Container, Section, Button, Input } from '@/components/ui';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Failed to subscribe');

      setStatus('success');
      setMessage('Thanks for subscribing! Check your email for confirmation.');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <Section background="primary">
      <Container size="narrow">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated on DPDP Compliance
          </h2>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
            Get the latest insights, guides, and updates on DPDP Act compliance
            delivered to your inbox.
          </p>

          {status === 'success' ? (
            <div className="flex items-center justify-center gap-2 text-accent-400 bg-white/10 rounded-lg py-4 px-6">
              <CheckCircle className="w-5 h-5" />
              <span>{message}</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-primary-200 focus:border-white focus:ring-white"
              />
              <Button
                type="submit"
                variant="secondary"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  'Subscribing...'
                ) : (
                  <>
                    Subscribe
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-3 text-sm text-red-300">{message}</p>
          )}

          <p className="mt-4 text-sm text-primary-200">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </Container>
    </Section>
  );
}
