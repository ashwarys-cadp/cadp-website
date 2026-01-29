'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button, Input, Textarea, Select } from '@/components/ui';

interface ContactFormData {
  name: string;
  email: string;
  organization: string;
  inquiryType: string;
  message: string;
}

const inquiryTypes = [
  { value: '', label: 'Select inquiry type' },
  { value: 'Training Programs', label: 'Training Programs' },
  { value: 'Compliance Advisory', label: 'Compliance Advisory' },
  { value: 'Research Collaboration', label: 'Research Collaboration' },
  { value: 'Speaking Engagement', label: 'Speaking Engagement' },
  { value: 'Other', label: 'Other' },
];

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Contact Form Submission: ${data.inquiryType}`,
          from_name: 'CADP Website',
          name: data.name,
          email: data.email,
          organization: data.organization || 'Not provided',
          inquiry_type: data.inquiryType,
          message: data.message,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to send message');
      }

      setStatus('success');
      reset();
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong'
      );
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-neutral-900 mb-2">
          Message Sent!
        </h3>
        <p className="text-neutral-600 mb-6">
          Thank you for reaching out. We&apos;ll get back to you within 1-2
          business days.
        </p>
        <Button onClick={() => setStatus('idle')} variant="outline">
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot field for spam protection */}
      <input type="checkbox" name="botcheck" className="hidden" />

      <div className="grid sm:grid-cols-2 gap-6">
        <Input
          label="Name"
          placeholder="Your name"
          error={errors.name?.message}
          {...register('name', { required: 'Name is required' })}
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@company.com"
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <Input
          label="Organization"
          placeholder="Your company or institution"
          error={errors.organization?.message}
          {...register('organization')}
        />
        <Select
          label="Inquiry Type"
          options={inquiryTypes}
          error={errors.inquiryType?.message}
          {...register('inquiryType', { required: 'Please select an inquiry type' })}
        />
      </div>

      <Textarea
        label="Message"
        placeholder="Tell us about your data protection needs..."
        rows={5}
        error={errors.message?.message}
        {...register('message', {
          required: 'Message is required',
          minLength: {
            value: 20,
            message: 'Message should be at least 20 characters',
          },
        })}
      />

      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      <Button type="submit" size="lg" disabled={status === 'loading'}>
        {status === 'loading' ? (
          'Sending...'
        ) : (
          <>
            Send Message
            <Send className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    </form>
  );
}
