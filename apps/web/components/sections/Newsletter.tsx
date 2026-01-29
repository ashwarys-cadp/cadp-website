'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { Container, Section, Button, Input } from '@/components/ui';

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '';

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
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: 'New Newsletter Subscription - CADP',
          from_name: 'CADP Website',
          email: email,
          message: `New newsletter subscription from: ${email}`,
        }),
      });

      const result = await response.json();

      if (!result.success) throw new Error('Failed to subscribe');

      setStatus('success');
      setMessage('Thanks for subscribing! You\'ll receive our updates.');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <Section background="white">
      <Container size="narrow">
        <div className="border-4 border-primary-950 bg-primary-950 p-10 md:p-14 shadow-xl relative">
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-accent-600 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-accent-600 opacity-20"></div>

          <div className="text-center relative z-10">
            {/* Academic header */}
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-500 font-semibold mb-3">
                Newsletter Subscription
              </div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-5">
              Research Updates & Insights
            </h2>
            <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-serif">
              Receive scholarly publications, legal analysis, and research updates on data
              protection law and digital governance.
            </p>

            {status === 'success' ? (
              <div className="flex items-center justify-center gap-3 text-accent-400 bg-white/10 border-2 border-accent-600 py-5 px-8">
                <CheckCircle className="w-6 h-6" />
                <span className="font-serif font-semibold">{message}</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              >
                {/* Honeypot for spam protection */}
                <input type="checkbox" name="botcheck" className="hidden" />

                <Input
                  type="email"
                  placeholder="your.email@institution.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-white border-2 border-white text-neutral-900 placeholder:text-neutral-500 focus:border-accent-500 focus:ring-accent-500 font-serif py-3 px-5"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  disabled={status === 'loading'}
                  className="whitespace-nowrap"
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
              <p className="mt-4 text-sm text-red-300 font-serif">{message}</p>
            )}

            <p className="mt-6 text-sm text-primary-200 font-serif italic">
              Academic communications only. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
