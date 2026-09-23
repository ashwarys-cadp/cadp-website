import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CalendarClock, Scale, Timer, Users } from 'lucide-react';
import { Container, Section, Button } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ArticleJsonLd, JsonLd } from '@/components/seo/JsonLd';
import { generatePageMetadata } from '@/lib/seo/metadata';

const PATH = '/resources/guides/dpdp-training-for-organisations';
const ACT = '/resources/official-texts/dpdp-act-2023/';

export const metadata: Metadata = generatePageMetadata({
  title: 'DPDP Act Training for Organisations: A Practical Guide',
  description:
    'Who in your organisation needs DPDP Act training, what each role should learn, and how to schedule it before the core obligations apply on 13 May 2027.',
  path: PATH,
  keywords: [
    'DPDP training',
    'DPDP Act training',
    'data protection training India',
    'DPDP compliance training for employees',
    'DPDP training for organisations',
  ],
});

const keyFacts = [
  { icon: CalendarClock, label: 'Core obligations apply from 13 May 2027' },
  { icon: Scale, label: 'Up to ₹250 crore for weak security safeguards' },
  { icon: Timer, label: '72 hours for a detailed breach report to the Board' },
  { icon: Users, label: 'Section 8(4): organisational measures' },
];

const contents = [
  { id: 'required', label: 'Does the DPDP Act require training?' },
  { id: 'policy', label: 'Why a privacy policy is not enough' },
  { id: 'roles', label: 'Who needs training, and what each role needs' },
  { id: 'good-training', label: 'What good DPDP training looks like' },
  { id: 'timeline', label: 'A training timeline to May 2027' },
  { id: 'faq', label: 'Frequently asked questions' },
];

const timeline = [
  {
    when: 'Now to December 2026',
    what: 'Brief the board and senior leadership. Map the personal data each team handles. Decide who will be your Data Protection Officer or contact person under Section 8(9).',
  },
  {
    when: 'January to March 2027',
    what: 'Run role-based sessions for the teams described above. Start with vendor management and customer-facing staff, where most mistakes happen.',
  },
  {
    when: 'April 2027',
    what: 'Run a breach drill against the Rule 7 timelines: notice to the Board without delay, and a detailed report within 72 hours.',
  },
  {
    when: 'From 13 May 2027',
    what: 'Hold refresher sessions every six months, and train every new joiner who will handle personal data before they start.',
  },
];

const faqs = [
  {
    question: 'Is DPDP training mandatory?',
    answer:
      'Neither the DPDP Act nor the DPDP Rules, 2025 use the word "training". But Section 8(4) of the Act requires every Data Fiduciary to implement appropriate organisational measures to ensure compliance, and Rule 6(1)(g) repeats this for security safeguards. Training the people who handle personal data is the most basic organisational measure, and it is hard to show the Data Protection Board that your measures were appropriate without it.',
  },
  {
    question: 'Who in an organisation needs DPDP training?',
    answer:
      'Anyone who collects, uses, shares or makes decisions about personal data. In practice that means the board and senior leadership, the Data Protection Officer or compliance lead, sales, marketing and customer-facing teams, HR, IT and security, and the people who onboard vendors. Each group needs different content.',
  },
  {
    question: 'When should organisations complete DPDP training?',
    answer:
      'Before 13 May 2027, when the core obligations under the DPDP Rules, 2025 take effect, including notice, security safeguards and breach intimation. Leadership briefings and data mapping should happen first, followed by role-based sessions and a breach drill in the months before the deadline.',
  },
  {
    question: 'How often should DPDP training be repeated?',
    answer:
      'We recommend short refresher sessions every six months, and training for every new joiner who will handle personal data. The obligations are new, and habits change slowly.',
  },
  {
    question: 'Does training reduce penalties under the DPDP Act?',
    answer:
      'The Act does not list training as a mitigating factor. However, Section 33(2) asks the Board to consider whether an organisation acted to mitigate a breach, and how quickly and effectively it did so. Staff who have practised a breach response are far more likely to act in time.',
  },
];

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-28">
      {children}
    </h2>
  );
}

export default function DPDPTrainingGuidePage() {
  return (
    <>
      <ArticleJsonLd
        title="DPDP Act Training for Organisations: A Practical Guide"
        description="Who in your organisation needs DPDP Act training, what each role should learn, and how to schedule it before the core obligations apply on 13 May 2027."
        url={`https://cadp.in${PATH}`}
        authorName="Centre for Applied Data Protection (CADP)"
        publishedAt="2026-09-24"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }}
      />

      {/* Hero */}
      <Section background="white" className="pb-0 md:pb-0">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Resources', href: '/resources' },
              { name: 'Guides', href: '/resources/guides' },
              { name: 'DPDP Training for Organisations', href: PATH },
            ]}
          />

          <div className="mt-8 max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                Practical Guide
              </div>
              <div className="h-px w-24 bg-accent-600 mx-auto"></div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-neutral-950 mb-6 leading-tight">
              DPDP Act Training
              <br />
              <span className="italic text-primary-900">for Organisations</span>
            </h1>

            <div className="flex items-center justify-center gap-4 my-8">
              <div className="h-px w-16 bg-accent-600"></div>
              <div className="w-2 h-2 rotate-45 bg-accent-600"></div>
              <div className="h-px w-16 bg-accent-600"></div>
            </div>

            <p className="text-lg md:text-xl text-neutral-700 leading-relaxed font-serif max-w-3xl mx-auto mb-10">
              The DPDP Act makes your organisation answer for what your people do with personal
              data. This guide sets out who needs training before the core obligations apply on 13
              May 2027, and what that training should cover.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto text-left">
              {keyFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-center gap-3 px-4 py-3 bg-primary-50 border border-primary-200 text-primary-900"
                >
                  <fact.icon className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                  <span className="text-sm font-semibold">{fact.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Article */}
      <Section background="white">
        <Container size="narrow">
          {/* Contents */}
          <nav
            aria-label="In this guide"
            className="border-l-4 border-accent-600 bg-neutral-50 px-6 py-5 mb-12"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500 mb-3">
              In this guide
            </p>
            <ol className="space-y-1.5 font-serif text-neutral-800 list-decimal list-inside">
              {contents.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="hover:text-primary-700 underline-offset-4 hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="prose prose-lg">
            <p>
              Picture a sales executive on a Friday evening. She wants to finish her follow-ups
              from home, so she exports the customer list and emails it to her personal Gmail
              account. Nothing about this feels wrong to her. She has done it before, and so have
              half her colleagues.
            </p>
            <p>
              Under the Digital Personal Data Protection Act, 2023, that email is the
              organisation&apos;s problem. <Link href={`${ACT}#section-8`}>Section 8(1)</Link> makes
              the Data Fiduciary, the organisation that decides why and how personal data is
              processed, responsible for complying with the Act &ldquo;irrespective of any
              agreement to the contrary&rdquo;. If that spreadsheet leaks, the Data Protection
              Board will not ask what the executive knew. It will ask what the organisation did to
              make sure she knew.
            </p>
            <p>
              So this guide treats training as part of compliance, with the same seriousness as
              encryption or a vendor contract. It is written for the people who have to make it
              happen: compliance heads, and the leaders deciding what to budget for before 2027.
            </p>

            <SectionHeading id="required">Does the DPDP Act require training?</SectionHeading>
            <p>
              The honest answer is that the Act never uses the word. Neither do the{' '}
              <Link href="/resources/guides/dpdp-rules-2025/">DPDP Rules, 2025</Link>. No provision
              says that every employee must attend a session every year.
            </p>
            <p>
              But look at what the Act does say. <Link href={`${ACT}#section-8`}>Section 8(4)</Link>{' '}
              requires a Data Fiduciary to &ldquo;implement appropriate technical and
              organisational measures to ensure effective observance&rdquo; of the Act and the
              Rules. Rule 6(1)(g) repeats the phrase for security safeguards. Technical measures
              are things like encryption and access controls. Organisational measures are about
              people: who can do what, and whether anyone has told them the rules.
            </p>
            <p>
              We would argue that training is the most basic organisational measure there is. It
              is hard to show the Board that your measures were &ldquo;appropriate&rdquo; if the
              people who handle personal data every day were never told what the law expects of
              them.
            </p>
            <p>
              The Schedule to the Act shows what is at stake. Failing to take reasonable security
              safeguards under Section 8(5) can attract a penalty of up to ₹250 crore. Failing to
              tell the Board and affected individuals about a breach can attract up to ₹200 crore.
              Many breaches begin with an ordinary mistake by someone who did not know better.
            </p>

            <SectionHeading id="policy">Why a privacy policy is not enough</SectionHeading>
            <p>
              Many organisations will respond to the DPDP Act by rewriting their privacy policy,
              naming someone to own compliance, and moving on. The policy matters; it tells people
              what you do with their data. But a policy does not change what happens at a desk on
              a Friday evening.
            </p>
            <p>
              Data protection failures are rarely dramatic. An email goes to the wrong recipient.
              A team shares one login to the CRM. A vendor gets onboarded because the business
              needed it this week, with the contract to follow. A customer asks for her data to be
              deleted and gets passed between departments for a month. Each of these is a people
              problem before it becomes a legal one.
            </p>
            <p>
              We saw how wide the gap can be at a recent CADP workshop for the{' '}
              <Link href="/news/dpdp-workshop-kle-degree-college-nagarabhavi/">
                leadership of a Bengaluru college
              </Link>
              . Before the session, only a third of participants felt confident about sharing data
              safely with vendors or responding to a breach. Afterwards, more than four in five
              did. These were principals and senior administrators, the people who sign contracts
              and approve systems. If they were unsure, the gap further down the organisation is
              probably wider.
            </p>

            <SectionHeading id="roles">Who needs training, and what each role needs</SectionHeading>
            <p>
              The most common mistake is one generic session for everyone. The board does not need
              to know how to redact a spreadsheet, and the customer support team does not need a
              lecture on Significant Data Fiduciaries. This is how we would divide it.
            </p>

            <h3>Board and senior leadership</h3>
            <p>
              Leadership needs to understand accountability. Section 8(1) puts responsibility on
              the organisation, and the Schedule puts a price on failure. Leaders also approve the
              budgets and vendors that decide whether compliance is possible at all. A half-day
              session on their obligations and the decisions only they can make is usually
              enough.
            </p>

            <h3>The Data Protection Officer or compliance lead</h3>
            <p>
              If the government notifies your organisation as a Significant Data Fiduciary,{' '}
              <Link href={`${ACT}#section-10`}>Section 10(2)</Link> requires a Data Protection
              Officer who is based in India, answers to the board and handles grievances. Even if
              you are not notified, Section 8(9) requires you to publish the contact details of
              someone who can answer people&apos;s questions about their data. Whoever holds that
              role needs the deepest training: the full Act and Rules, and a sense of how the Board
              is likely to read them.
            </p>

            <h3>Sales, marketing and customer-facing teams</h3>
            <p>
              These teams collect most of the personal data an organisation holds, and they are
              usually the first to hear a complaint. They need to know what a valid notice and
              consent look like under Sections 5 and 6, and that withdrawing consent must be as
              easy as giving it. They also need to know how to route a request to access, correct
              or erase data under{' '}
              <Link href={`${ACT}#section-11`}>Sections 11 and 12</Link>, and how to recognise a
              grievance when it arrives as an angry phone call.
            </p>

            <h3>Human resources</h3>
            <p>
              HR holds some of the most sensitive data in the building: salaries, medical records,
              bank details and background checks. Section 7 lets an employer process personal data
              for employment purposes without consent, but the rest of the Act still applies,
              including security safeguards and erasure. HR teams need to know what they collect,
              how long they keep it, and what they may share with payroll providers and insurers.
            </p>

            <h3>IT and security</h3>
            <p>
              Rule 6 sets the minimum security safeguards: encryption or masking, access controls,
              logs that can detect unauthorised access, backups, and retention of those logs for
              at least a year. IT teams usually know the technology. What they often lack is the
              legal reading: which of these are now mandatory, what &ldquo;reasonable&rdquo; is
              likely to mean before the Board, and what the breach clock requires of them.
            </p>

            <h3>Procurement and vendor managers</h3>
            <p>
              <Link href={`${ACT}#section-8`}>Section 8(2)</Link> lets you use a Data Processor, a
              vendor that processes personal data on your behalf, only under a valid contract.
              Section 8(1) keeps you responsible for whatever that vendor does, and Rule 6(1)(f)
              requires the contract to cover security safeguards. The people who onboard vendors
              need to know what the contract must say and what to ask before anyone signs. At our
              college workshop, this was the topic participants most wanted to learn next.
            </p>

            <SectionHeading id="good-training">What good DPDP training looks like</SectionHeading>
            <p>
              Most compliance training fails in the same way. People sit through slides about the
              law and go back to work unchanged. Good training differs in a few specific ways.
            </p>
            <p>
              <strong>It starts from your own data.</strong> Before any session, map what personal
              data the team actually handles. At the college workshop, we followed a student&apos;s
              data from admission day to graduation. Participants recognised their own forms and
              spreadsheets, and the law stopped being abstract.
            </p>
            <p>
              <strong>It works through scenarios.</strong> &ldquo;A caller says he is a
              customer&apos;s husband and wants her order history. What do you do?&rdquo; teaches
              more than any slide defining a Data Principal, the person the data is about.
            </p>
            <p>
              <strong>It is short, and it repeats.</strong> A two-hour session every six months
              will do more than a full day once. The obligations are new, and habits change
              slowly.
            </p>
            <p>
              <strong>It measures something.</strong> Ask participants the same questions before
              and after, anonymously. The answers show where confidence is still low, and they give
              you a record of what you did, which will matter if the Board ever asks.
            </p>

            <SectionHeading id="timeline">A training timeline to May 2027</SectionHeading>
            <p>
              The DPDP Rules come into force in phases. Rules 1, 2 and 17 to 21 took effect on
              publication on 13 November 2025. Rule 4, on Consent Managers, takes effect on 13
              November 2026. Everything else, including security safeguards and breach intimation,
              takes effect on 13 May 2027. Our{' '}
              <Link href="/resources/guides/dpdp-implementation-roadmap/">
                implementation roadmap
              </Link>{' '}
              sets out the wider compliance work; working back from that date, training fits in
              like this.
            </p>
          </article>

          {/* Timeline */}
          <ol className="mt-8 border-l-2 border-accent-600 ml-2 space-y-8">
            {timeline.map((step) => (
              <li key={step.when} className="relative pl-8">
                <span className="absolute -left-[7px] top-2 w-3 h-3 rotate-45 bg-accent-600" />
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary-700 mb-1">
                  {step.when}
                </p>
                <p className="text-lg text-neutral-700 font-serif leading-relaxed">{step.what}</p>
              </li>
            ))}
          </ol>

          <div className="prose prose-lg mt-10">
            <p>
              These dates could still change. MeitY has{' '}
              <Link href="/news/meity-cut-dpdp-compliance-window-12-months-sdf/">
                reportedly considered a shorter window
              </Link>{' '}
              for Significant Data Fiduciaries, and our{' '}
              <Link href="/resources/guides/dpdp-implementation-tracker/">
                implementation tracker
              </Link>{' '}
              follows what is still pending.
            </p>

            <h2>How CADP runs DPDP training</h2>
            <p>
              CADP is a research centre at KLE Law College, Bengaluru. Our sessions are designed
              by lawyers who work on the DPDP Act every day, and each one is built around the
              organisation&apos;s own data flows. We run executive seminars for leadership,
              role-specific sessions for teams, and preparation for the Data Protection Officer
              function. You can read more on our{' '}
              <Link href="/programs-and-initiatives/dpdp-training/">DPDP training page</Link>, or
              see how a recent session went in our{' '}
              <Link href="/news/dpdp-workshop-kle-degree-college-nagarabhavi/">
                workshop report from KLE Degree College, Nagarabhavi
              </Link>
              .
            </p>
            <p>
              So, go back to the sales executive and her Friday evening email. She was not
              careless; nobody had told her. One scenario in one session, &ldquo;can I email
              customer data to my personal account?&rdquo;, would have stopped her before she
              clicked send. That is what training does under the DPDP Act, and it costs far less
              than the alternative.
            </p>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section background="gray" id="faq" className="scroll-mt-20">
        <Container size="narrow">
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                Common Questions
              </div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white border-2 border-neutral-300 shadow-sm p-6">
                <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-3">
                  {faq.question}
                </h3>
                <p className="text-lg text-neutral-600 font-serif leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Related */}
      <Section background="white">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-block mb-6">
              <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                Continue Reading
              </div>
              <div className="h-px w-24 mx-auto bg-accent-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-950">Related Resources</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                href: '/resources/articles/dpdp-act-key-provisions-explained/',
                title: 'DPDP Act Key Provisions',
                text: 'The obligations and rights your training needs to cover, section by section.',
              },
              {
                href: '/resources/guides/dpdp-rules-2025/',
                title: 'DPDP Rules 2025',
                text: 'All 23 rules, including security safeguards and breach intimation.',
              },
              {
                href: '/resources/guides/dpdp-implementation-roadmap/',
                title: 'Implementation Roadmap',
                text: 'Where training sits in the wider compliance programme.',
              },
              {
                href: ACT,
                title: 'DPDP Act, 2023: Full Text',
                text: 'The annotated official text, with cross-references.',
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-white border-2 border-neutral-300 p-6 hover:border-primary-600 transition-all duration-300"
              >
                <h3 className="text-lg font-serif font-semibold text-neutral-950 mb-2">
                  {item.title}
                </h3>
                <p className="text-base text-neutral-600 font-serif mb-4">{item.text}</p>
                <div className="flex items-center text-primary-700 text-sm font-semibold">
                  Read <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="white" className="pt-0 md:pt-0">
        <Container size="narrow">
          <div className="border-4 border-primary-950 bg-primary-950 p-10 md:p-14 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-600 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-600 opacity-20"></div>
            <div className="text-center relative z-10">
              <div className="inline-block mb-6">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-500 font-semibold mb-3">
                  Train Your Teams
                </div>
                <div className="h-px w-24 mx-auto bg-accent-600"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-5">
                Plan your DPDP training before May 2027
              </h2>
              <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-serif">
                Tell us who handles personal data in your organisation, and we will propose
                sessions built around your own data flows.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact/" variant="secondary" size="lg">
                  Programme Enquiry
                </Button>
                <Button
                  href="/programs-and-initiatives/dpdp-training/"
                  size="lg"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-950 transition-colors font-semibold"
                >
                  View Training Programmes
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
