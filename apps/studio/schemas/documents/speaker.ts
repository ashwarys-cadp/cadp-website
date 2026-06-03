import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'speaker',
  title: 'Speaker',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title / Designation',
      type: 'string',
      description: 'e.g. Chief Compliance Officer, Partner',
    }),
    defineField({
      name: 'organization',
      title: 'Organization',
      type: 'string',
      description: 'e.g. HDFC Bank, Trilegal',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'headshot',
      title: 'Headshot',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'linkedIn',
      title: 'LinkedIn URL',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      org: 'organization',
      role: 'title',
      media: 'headshot',
    },
    prepare({ title, org, role, media }) {
      const parts = [role, org].filter(Boolean);
      return {
        title,
        subtitle: parts.join(', ') || 'Speaker',
        media,
      };
    },
  },
});
