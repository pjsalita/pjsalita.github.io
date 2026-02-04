import { ContactButton } from "@/components/contact-button";
import { Section } from "../section";

const Contact = () => {
  return (
    <Section title="Get In Touch">
      <div className="space-y-6">
        <p className="text-muted-foreground">Interested in working together? Let&apos;s connect and create something amazing.</p>
        <ContactButton variant="default">Send Message</ContactButton>
      </div>
    </Section>
  );
};

export { Contact };
