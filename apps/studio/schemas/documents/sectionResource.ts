import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'sectionResource',
  title: 'Section Resource',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief context on why this resource is relevant to this section',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'type',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          { title: 'CADP Article', value: 'cadp-article' },
          { title: 'CADP Guide', value: 'cadp-guide' },
          { title: 'External', value: 'external' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'documentId',
      title: 'Document',
      type: 'string',
      options: {
        list: [
          { title: 'DPDP Act 2023', value: 'dpdp-act-2023' },
          { title: 'DPDP Rules 2025', value: 'dpdp-rules-2025' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'targetSection',
      title: 'Target Section',
      type: 'string',
      description: 'Link to a specific section (e.g., "section-7")',
    }),
    defineField({
      name: 'targetChapter',
      title: 'Target Chapter',
      type: 'string',
      description: 'Link to a whole chapter (e.g., "chapter-2")',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'documentId' },
  },
});
