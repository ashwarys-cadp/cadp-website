import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'newsArticle',
  title: 'News Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      description: 'News headline (max 120 characters)',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 2,
      description: 'Brief summary for cards and meta descriptions (100-200 characters)',
      validation: (Rule) => Rule.required().min(80).max(200),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      description: 'CADP commentary — 2-4 short paragraphs providing context on this news',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
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
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto'],
                      }),
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      description: 'Link to original news source. Leave blank for CADP Announcements.',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'sourceName',
      title: 'Source Name',
      type: 'string',
      description: 'e.g., "LiveLaw", "The Hindu", "Economic Times"',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Government Orders', value: 'government-orders' },
          { title: 'Court Decisions', value: 'court-decisions' },
          { title: 'Industry News', value: 'industry-news' },
          { title: 'Opinion', value: 'opinion' },
          { title: 'CADP Announcements', value: 'cadp-announcements' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      description: 'Optional — most news items won\'t need one',
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
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Override title for SEO (50-60 characters)',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Meta description (150-160 characters)',
      validation: (Rule) => Rule.max(170),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Published (Newest)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      date: 'publishedAt',
      media: 'featuredImage',
    },
    prepare(selection) {
      const { title, category, date } = selection;
      const categoryLabels: Record<string, string> = {
        'government-orders': 'Govt Order',
        'court-decisions': 'Court',
        'industry-news': 'Industry',
        opinion: 'Opinion',
        'cadp-announcements': 'CADP',
      };
      return {
        ...selection,
        title,
        subtitle: `${categoryLabels[category] || category} — ${date ? new Date(date).toLocaleDateString() : 'No date'}`,
      };
    },
  },
});
