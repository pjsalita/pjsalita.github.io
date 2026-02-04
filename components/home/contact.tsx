import { ContactButton } from '@/components/ui/contact-button';
import { TextShimmer } from '@/components/ui/text-shimmer';

const Contact = () => {
  return (
    <section className="border-border/50 bg-background/80 mb-40 border-l px-8 backdrop-blur-sm">
      <TextShimmer as="h2" className="mb-12 text-3xl font-bold [--base-color:var(--primary)] [--base-gradient-color:var(--accent)]">
        Get In Touch
      </TextShimmer>
      <div className="space-y-6">
        <p className="text-muted-foreground">Interested in working together? Let's connect and create something amazing.</p>
        <ContactButton variant="default">Send Message</ContactButton>
      </div>
    </section>
  );
};

export { Contact };
