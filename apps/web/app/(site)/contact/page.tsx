import { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Container, Section, SectionHeader, Card } from "@/components/ui";
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
      <Section background="gray">
        <Container>
          <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />

          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">Get in Touch</h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Have a question about DPDP compliance? Want to discuss training or legal advisory? We&apos;d love to hear from you.
            </p>
          </div>
        </Container>
      </Section>

      {/* Contact Form & Info */}
      <Section background="white">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card hover={false} className="p-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">Send us a message</h2>
                <ContactForm />
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-neutral-900">Contact Information</h2>

              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{item.title}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-neutral-600 hover:text-primary-600 transition-colors"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-neutral-600">{item.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="mt-8">
                <div className="aspect-square bg-neutral-100 rounded-xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                    <p className="text-neutral-500 text-sm">
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
      <Section background="gray">
        <Container size="narrow">
          <SectionHeader title="Frequently Asked Questions" subtitle="Quick answers to common questions" centered />

          <div className="space-y-4">
            <Card hover={false} className="p-6">
              <h3 className="font-semibold text-neutral-900 mb-2">What programmes does CADP offer?</h3>
              <p className="text-neutral-600">
                CADP offers DPDP Act compliance training, legal advisory, and research publications. We work with organisations of all sizes across
                various sectors.
              </p>
            </Card>

            <Card hover={false} className="p-6">
              <h3 className="font-semibold text-neutral-900 mb-2">How can I request a consultation?</h3>
              <p className="text-neutral-600">
                Fill out the contact form above with details about your needs, and our team will get back to you within 1-2 business days to schedule
                a consultation.
              </p>
            </Card>

            <Card hover={false} className="p-6">
              <h3 className="font-semibold text-neutral-900 mb-2">Do you offer customised training programs?</h3>
              <p className="text-neutral-600">
                Yes, we offer tailored training programs designed to meet the specific needs of your organisation, industry, and team.
              </p>
            </Card>

            <Card hover={false} className="p-6">
              <h3 className="font-semibold text-neutral-900 mb-2">Can you help with ongoing compliance monitoring?</h3>
              <p className="text-neutral-600">
                Absolutely. We provide ongoing compliance support to help organisations maintain compliance as regulations evolve.
              </p>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
