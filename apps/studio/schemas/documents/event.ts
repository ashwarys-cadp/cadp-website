import { defineField, defineType } from 'sanity';

// Show a field/group only when the event is a conference.
const conferenceOnly = ({ document }: { document?: Record<string, unknown> }) =>
  document?.eventType !== 'conference';

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  groups: [
    { name: 'overview', title: 'Overview', default: true },
    { name: 'agenda', title: 'Agenda' },
    { name: 'speakers', title: 'Speakers' },
    { name: 'registration', title: 'Registration' },
    { name: 'sponsors', title: 'Sponsors' },
    { name: 'logistics', title: 'Logistics' },
    { name: 'postEvent', title: 'Post-event' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ---------- Overview ----------
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      group: 'overview',
      options: {
        list: [
          { title: 'Webinar', value: 'webinar' },
          { title: 'Workshop', value: 'workshop' },
          { title: 'Conference', value: 'conference' },
        ],
        layout: 'radio',
      },
      initialValue: 'webinar',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'overview',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'overview',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'theme',
      title: 'Theme / Tagline',
      type: 'string',
      group: 'overview',
      description: 'Optional subtitle line, e.g. "From Obligation to Operation: DPDP Compliance in Practice"',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 4,
      group: 'overview',
      description: 'Summary used in listings, cards, and SEO fallback.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'overview',
      title: 'Overview (long-form)',
      type: 'array',
      group: 'overview',
      description: 'Full concept note / about section. Optional.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{ name: 'href', type: 'url', title: 'URL' }],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'overview',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alternative Text' }],
    }),
    defineField({
      name: 'date',
      title: 'Start Date',
      type: 'datetime',
      group: 'overview',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      group: 'overview',
      description: 'Optional end date for multi-day events',
    }),
    defineField({
      name: 'location',
      title: 'Location (short)',
      type: 'string',
      group: 'overview',
      description: 'One-line label for cards and the sidebar, e.g. "KLE Law College, Bengaluru".',
    }),
    defineField({
      name: 'isOnline',
      title: 'Online Event',
      type: 'boolean',
      group: 'overview',
      initialValue: false,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Event',
      type: 'boolean',
      group: 'overview',
      initialValue: false,
    }),

    // ---------- Speakers ----------
    defineField({
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      group: 'speakers',
      of: [{ type: 'reference', to: [{ type: 'speaker' }] }],
    }),

    // ---------- Agenda (conference) ----------
    defineField({
      name: 'agenda',
      title: 'Agenda',
      type: 'array',
      group: 'agenda',
      hidden: conferenceOnly,
      of: [
        {
          type: 'object',
          name: 'day',
          title: 'Day',
          fields: [
            { name: 'label', type: 'string', title: 'Label', description: 'e.g. "Day 1"' },
            { name: 'date', type: 'date', title: 'Date' },
            {
              name: 'sessions',
              type: 'array',
              title: 'Sessions',
              of: [
                {
                  type: 'object',
                  name: 'session',
                  title: 'Session',
                  fields: [
                    { name: 'startTime', type: 'string', title: 'Start Time', description: 'e.g. "10:00"' },
                    { name: 'endTime', type: 'string', title: 'End Time', description: 'e.g. "11:15"' },
                    {
                      name: 'format',
                      type: 'string',
                      title: 'Format',
                      options: {
                        list: [
                          { title: 'Inauguration', value: 'inauguration' },
                          { title: 'Keynote', value: 'keynote' },
                          { title: 'Panel', value: 'panel' },
                          { title: 'Workshop', value: 'workshop' },
                          { title: 'Discussion / Q&A', value: 'discussion' },
                          { title: 'Networking', value: 'networking' },
                          { title: 'Break', value: 'break' },
                          { title: 'Valedictory', value: 'valedictory' },
                          { title: 'Other', value: 'other' },
                        ],
                      },
                      initialValue: 'panel',
                    },
                    { name: 'title', type: 'string', title: 'Title', validation: (Rule) => Rule.required() },
                    {
                      name: 'description',
                      type: 'text',
                      title: 'Description',
                      rows: 3,
                      hidden: ({ parent }) => parent?.format === 'break',
                    },
                    {
                      name: 'speakers',
                      type: 'array',
                      title: 'Speakers',
                      of: [{ type: 'reference', to: [{ type: 'speaker' }] }],
                      hidden: ({ parent }) => parent?.format === 'break',
                    },
                    { name: 'room', type: 'string', title: 'Room / Track' },
                  ],
                  preview: {
                    select: { title: 'title', start: 'startTime', end: 'endTime', format: 'format' },
                    prepare({ title, start, end, format }) {
                      const time = [start, end].filter(Boolean).join('–');
                      return {
                        title: title || '(untitled session)',
                        subtitle: [time, format].filter(Boolean).join('  ·  '),
                      };
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: { label: 'label', date: 'date', sessions: 'sessions' },
            prepare({ label, date, sessions }) {
              const count = Array.isArray(sessions) ? sessions.length : 0;
              return {
                title: label || (date ? new Date(date).toLocaleDateString() : 'Day'),
                subtitle: `${count} session${count === 1 ? '' : 's'}`,
              };
            },
          },
        },
      ],
    }),

    // ---------- Registration ----------
    defineField({
      name: 'registrationUrl',
      title: 'Registration URL',
      type: 'url',
      group: 'registration',
    }),
    defineField({
      name: 'registrationDeadline',
      title: 'Registration Deadline',
      type: 'datetime',
      group: 'registration',
    }),
    defineField({
      name: 'registrationNote',
      title: 'Registration Note',
      type: 'text',
      rows: 2,
      group: 'registration',
      description: 'e.g. capacity limit, eligibility.',
    }),
    defineField({
      name: 'ticketTiers',
      title: 'Ticket Tiers',
      type: 'array',
      group: 'registration',
      hidden: conferenceOnly,
      of: [
        {
          type: 'object',
          name: 'ticketTier',
          fields: [
            { name: 'name', type: 'string', title: 'Name', description: 'e.g. Industry, Academic' },
            { name: 'price', type: 'string', title: 'Price', description: 'e.g. "₹1,500" or "Free"' },
            { name: 'includes', type: 'text', title: 'Includes', rows: 3 },
          ],
          preview: {
            select: { title: 'name', subtitle: 'price' },
          },
        },
      ],
    }),

    // ---------- Sponsors ----------
    defineField({
      name: 'sponsors',
      title: 'Sponsors & Partners',
      type: 'array',
      group: 'sponsors',
      hidden: conferenceOnly,
      of: [
        {
          type: 'object',
          name: 'sponsor',
          fields: [
            { name: 'name', type: 'string', title: 'Name', validation: (Rule) => Rule.required() },
            {
              name: 'tier',
              type: 'string',
              title: 'Tier',
              options: {
                list: [
                  { title: 'Knowledge Partner', value: 'knowledge-partner' },
                  { title: 'Associate Sponsor', value: 'associate' },
                  { title: 'Exhibitor', value: 'exhibitor' },
                  { title: 'Other', value: 'other' },
                ],
              },
              initialValue: 'associate',
            },
            {
              name: 'logo',
              type: 'image',
              title: 'Logo',
              options: { hotspot: true },
              fields: [{ name: 'alt', type: 'string', title: 'Alternative Text' }],
            },
            { name: 'url', type: 'url', title: 'Website' },
            { name: 'blurb', type: 'text', title: 'Blurb', rows: 2 },
          ],
          preview: {
            select: { title: 'name', subtitle: 'tier', media: 'logo' },
          },
        },
      ],
    }),

    // ---------- Logistics ----------
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'object',
      group: 'logistics',
      hidden: conferenceOnly,
      fields: [
        { name: 'name', type: 'string', title: 'Name' },
        { name: 'address', type: 'text', title: 'Address', rows: 3 },
        { name: 'mapUrl', type: 'url', title: 'Map URL' },
        { name: 'directions', type: 'text', title: 'Directions', rows: 3 },
      ],
    }),
    defineField({
      name: 'whoShouldAttend',
      title: 'Who Should Attend',
      type: 'array',
      group: 'logistics',
      hidden: conferenceOnly,
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'organisedBy',
      title: 'Organised By',
      type: 'string',
      group: 'logistics',
      hidden: conferenceOnly,
      description: 'e.g. "Centre for Applied Data Protection (CADP), KLE Law College"',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      group: 'logistics',
      hidden: conferenceOnly,
      of: [
        {
          type: 'object',
          name: 'faq',
          fields: [
            { name: 'question', type: 'string', title: 'Question' },
            { name: 'answer', type: 'text', title: 'Answer', rows: 3 },
          ],
          preview: { select: { title: 'question' } },
        },
      ],
    }),
    defineField({
      name: 'downloads',
      title: 'Downloads',
      type: 'array',
      group: 'logistics',
      hidden: conferenceOnly,
      description: 'Brochure, programme booklet, etc.',
      of: [
        {
          type: 'object',
          name: 'download',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'file', type: 'file', title: 'File' },
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),

    // ---------- Post-event ----------
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      group: 'postEvent',
      hidden: conferenceOnly,
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alternative Text' }],
        },
      ],
    }),
    defineField({
      name: 'recordingsUrl',
      title: 'Recordings URL',
      type: 'url',
      group: 'postEvent',
      hidden: conferenceOnly,
    }),
    defineField({
      name: 'resources',
      title: 'Resources',
      type: 'array',
      group: 'postEvent',
      hidden: conferenceOnly,
      description: 'Proceedings report, slides, summaries.',
      of: [
        {
          type: 'object',
          name: 'resource',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'url', type: 'url', title: 'URL' },
            { name: 'file', type: 'file', title: 'File' },
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),

    // ---------- SEO ----------
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (Rule) => Rule.max(170),
    }),
  ],
  orderings: [
    {
      title: 'Event Date (Newest)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Event Date (Oldest)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      eventType: 'eventType',
      media: 'featuredImage',
    },
    prepare({ title, date, eventType, media }) {
      const when = date ? new Date(date).toLocaleDateString() : 'No date set';
      const type = eventType ? eventType.charAt(0).toUpperCase() + eventType.slice(1) : 'Event';
      return {
        title,
        subtitle: `${type} · ${when}`,
        media,
      };
    },
  },
});
