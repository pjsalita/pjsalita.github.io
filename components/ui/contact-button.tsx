'use client';

import React from "react"

import { useState } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';
import { XIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogTrigger,
} from './morphing-dialog';

interface ContactButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {}

export function ContactButton({ children, variant, ...props }: ContactButtonProps) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [data, setData] = useState({ email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [processing, setProcessing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = e.target.id;
    const value = e.target.value;

    setErrors((prev) => ({ ...prev, [key]: '' }));
    setStatus('idle');
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setErrors({});
    setProcessing(true);

    // Basic validation
    if (!data.email || !data.subject || !data.message) {
      const newErrors: { [key: string]: string } = {};
      if (!data.email) newErrors.email = 'Email is required';
      if (!data.subject) newErrors.subject = 'Subject is required';
      if (!data.message) newErrors.message = 'Message is required';
      setErrors(newErrors);
      setProcessing(false);
      return;
    }

    // Create mailto link with form data
    const mailtoLink = `mailto:hello@pjsalita.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(
      `${data.message}`
    )}`;

    window.location.href = mailtoLink;
    setData({ email: '', subject: '', message: '' });
    setStatus('success');
    setProcessing(false);
  };

  return (
    <MorphingDialog transition={{ duration: 0.3, ease: 'easeInOut' }}>
      <MorphingDialogTrigger>
        <Button className={buttonVariants({ variant })} {...props}>
          {children}
        </Button>
      </MorphingDialogTrigger>

      <MorphingDialogContainer>
        <MorphingDialogContent className="relative w-full max-w-lg">
          <form onSubmit={handleSubmit}>
            <Card className="w-full max-w-md px-2 py-10">
              <CardHeader>
                <CardTitle>Contact me</CardTitle>
                <CardDescription>Send me a message and I'll get back to you as soon as possible.</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      className={cn(errors.email && 'border-destructive')}
                      placeholder="your@email.com"
                      value={data.email}
                      onChange={handleChange}
                    />
                    {errors.email && <small className="text-destructive">{errors.email}</small>}
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      className={cn(errors.subject && 'border-destructive')}
                      placeholder="What's this about?"
                      value={data.subject}
                      onChange={handleChange}
                    />
                    {errors.subject && <small className="text-destructive">{errors.subject}</small>}
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      className={cn(errors.message && 'border-destructive')}
                      placeholder="Your message..."
                      rows={4}
                      value={data.message}
                      onChange={handleChange}
                    />
                    {errors.message && <small className="text-destructive">{errors.message}</small>}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col justify-end">
                <Button type="submit" className="w-full">
                  Open Mail Client
                </Button>

                {status === 'error' && <p className="text-sm text-red-500">Failed to send message. Please try again.</p>}
              </CardFooter>
            </Card>
          </form>
        </MorphingDialogContent>

        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { delay: 0.3, duration: 0.1 } },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}
