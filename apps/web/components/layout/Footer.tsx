import Link from "next/link";
import { Mail, MapPin, Linkedin } from "lucide-react";
import { Container } from "@/components/ui";

const footerLinks = {
  programmes: [
    { name: "DPDP Training", href: "/programs-and-initiatives/dpdp-training" },
    { name: "Compliance Advisory", href: "/programs-and-initiatives/compliance-advisory" },
    { name: "Research & Publications", href: "/programs-and-initiatives/research-publications" },
  ],
  resources: [
    { name: "Guides", href: "/resources/guides" },
    { name: "Articles", href: "/resources/articles" },
    { name: "White Papers", href: "/resources/white-papers" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <Container size="wide">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3.5 group">
                <div className="w-14 h-14 bg-primary-950 border-2 border-primary-950 flex items-center justify-center relative group-hover:bg-primary-900 transition-colors">
                  <span className="text-accent-500 font-bold text-2xl" style={{ fontFamily: "var(--font-heading)" }}>
                    C
                  </span>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent-600 border border-white"></div>
                </div>
                <div>
                  <div className="font-bold text-xl text-white tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                    CADP
                  </div>
                  <div className="text-[0.6875rem] text-neutral-400 -mt-1 tracking-[0.03em] uppercase font-semibold">
                    Centre for Applied Data Protection
                  </div>
                </div>
              </Link>
              <p className="mt-4 text-sm text-neutral-400 max-w-sm">
                Expert DPDP Act compliance training, legal advisory, and research publications at KLE Law College, Bengaluru.
              </p>
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:contact@cadp.in" className="hover:text-white transition-colors">
                    contact@cadp.in
                  </a>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <span>
                    KLE Law College,
                    <br />
                    Bengaluru, Karnataka 560091
                  </span>
                </div>
              </div>
            </div>

            {/* Programmes */}
            <div>
              <h3 className="font-semibold text-white mb-4">Programmes</h3>
              <ul className="space-y-2">
                {footerLinks.programmes.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CADP */}
            <div>
              <h3 className="font-semibold text-white mb-4">CADP</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-500">&copy; {new Date().getFullYear()} Centre for Applied Data Protection. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com/company/cadp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
