import { Section } from "../section";

const testimonials = [
  {
    name: "Stephen B.",
    role: "Project Manager",
    quote: "Great work adding a 'product likes' feature to our website. PJ built an intricate system for users to like products. He is very talented!.",
  },
  {
    name: "Garik B.",
    role: "Project Manager",
    quote: "Thank you Patrick, one of best freelancer I have worked with. Fast results and clean code.",
  },
  {
    name: "Evan F.",
    role: "Product Owner",
    quote: "Patrick was a pleasure to work with. Really talented and fast. I trusted his work. I hope to work with him again.",
  },
];

const Testimonials = () => {
  return (
    <Section title="Testimonials">
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="rounded-lg border bg-background p-6 shadow-sm">
            <p className="italic mb-4 text-sm text-muted-foreground">“{testimonial.quote}”</p>

            <div>
              <p className="text-sm font-medium">{testimonial.name}</p>
              <p className="text-xs text-muted-foreground">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export { Testimonials };
