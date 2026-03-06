import { defineField, defineType } from 'sanity';
import { documentOptions, sectionsByDocument, chaptersByDocument } from './officialTextOptions';

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
      options: { list: documentOptions },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'targetSection',
      title: 'Target Section',
      type: 'string',
      description: 'Link to a specific section',
      options: {
        list: Object.values(sectionsByDocument).flat(),
      },
    }),
    defineField({
      name: 'targetChapter',
      title: 'Target Chapter',
      type: 'string',
      description: 'Link to a whole chapter',
      options: {
        list: Object.values(chaptersByDocument).flat(),
      },
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'documentId' },
  },
});
