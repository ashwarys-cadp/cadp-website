import { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Container, Section } from "@/components/ui";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact Us",
  description: "Get in touch with CADP for DPDP training, compliance advisory, or research collaboration inquiries.",
  path: "/contact",
  keywords: ["contact CADP", "DPDP consultation", "data protection inquiry"],
});

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "contact@cadp.in",
    href: "mailto:contact@cadp.in",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+91 80 1234 5678",
    href: "tel:+918012345678",
  },
  {
    icon: MapPin,
    title: "Address",
    content: "KLE Law College, Bengaluru, Karnataka 560091",
    href: "https://maps.google.com/?q=KLE+Law+College+Bengaluru",
  },
  {
    icon: Clock,
    title: "Hours",
    content: "Mon - Fri: 9:00 AM - 6:00 PM IST",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <Section background="white">
        <Container>
          <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />

          <div className="mt-8 max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-block mb-4">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Connect With Us</div>
                <div className="h-px w-20 bg-accent-600"></div>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-neutral-950 mb-6 leading-tight">
                Get in Touch
              </h1>
              <p className="text-lg text-neutral-700 leading-relaxed font-serif">
                Have a question about DPDP compliance? Want to discuss training or legal advisory? We&apos;d love to hear from you.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact Form & Info */}
      <Section background="gray">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border-2 border-neutral-300 shadow-sm">
                <div className="h-2 bg-primary-600"></div>
                <div className="p-8">
                  <div className="mb-6">
                    <div className="inline-block mb-3">
                      <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Inquiry Form</div>
                      <div className="h-px w-16 bg-accent-600"></div>
                    </div>
                    <h2 className="text-2xl font-serif font-semibold text-neutral-950">Send us a message</h2>
                  </div>
                  <ContactForm />
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="mb-6">
                <div className="inline-block mb-3">
                  <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Details</div>
                  <div className="h-px w-16 bg-accent-600"></div>
                </div>
                <h2 className="text-2xl font-serif font-semibold text-neutral-950">Contact Information</h2>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.title} className="bg-white border-2 border-neutral-300 p-4 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 border-2 border-primary-900 flex items-center justify-center bg-primary-50 shrink-0">
                        <item.icon className="w-5 h-5 text-primary-900" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs uppercase tracking-[0.15em] text-primary-800 font-semibold mb-1">{item.title}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-neutral-700 hover:text-primary-900 transition-colors font-serif text-sm leading-relaxed"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-neutral-700 font-serif text-sm leading-relaxed">{item.content}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 bg-white border-2 border-neutral-300 shadow-sm">
                <div className="h-1.5 bg-accent-600"></div>
                <div className="aspect-square bg-neutral-50 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 border-2 border-primary-900 flex items-center justify-center bg-primary-50 mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-primary-900" strokeWidth={1.5} />
                    </div>
                    <p className="text-neutral-700 font-serif text-sm">
                      KLE Law College
                      <br />
                      Rajajinagar, Bengaluru
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section background="white">
        <Container size="narrow">
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">Common Questions</div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 mb-4">Frequently Asked Questions</h2>
            <p className="text-neutral-600 font-serif">Quick answers to common questions</p>
          </div>

          <div className="space-y-4">
            <div className="bg-white border-2 border-neutral-300 shadow-sm">
              <div className="h-1.5 bg-primary-600"></div>
              <div className="p-6">
                <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-3">What are CADP&apos;s core activities?</h3>
                <p className="text-neutral-700 leading-relaxed font-serif">
                  The Centre conducts academic research on data protection law, delivers professional education programmes on DPDP Act compliance,
                  provides expert advisory to public and private institutions, and publishes scholarly work on privacy jurisprudence.
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-neutral-300 shadow-sm">
              <div className="h-1.5 bg-primary-600"></div>
              <div className="p-6">
                <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-3">How can organisations engage with CADP?</h3>
                <p className="text-neutral-700 leading-relaxed font-serif">
                  Submit an inquiry through the form above detailing your interest—whether in professional training, legal advisory, or research collaboration.
                  The Centre will respond within 1-2 business days to discuss potential engagement.
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-neutral-300 shadow-sm">
              <div className="h-1.5 bg-primary-600"></div>
              <div className="p-6">
                <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-3">Can professional education programmes be tailored to specific needs?</h3>
                <p className="text-neutral-700 leading-relaxed font-serif">
                  Yes. The Centre develops customised training curricula aligned with sector-specific regulatory requirements and organisational contexts,
                  drawing on our research expertise in data protection frameworks.
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-neutral-300 shadow-sm">
              <div className="h-1.5 bg-primary-600"></div>
              <div className="p-6">
                <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-3">Does CADP engage in ongoing advisory relationships?</h3>
                <p className="text-neutral-700 leading-relaxed font-serif">
                  The Centre maintains long-term advisory engagements with organisations navigating evolving data protection regulations,
                  providing evidence-based guidance grounded in legal scholarship and regulatory analysis.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
