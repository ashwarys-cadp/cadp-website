import { defineField, defineType } from 'sanity';
import { documentOptions, sectionsByDocument, chaptersByDocument } from './officialTextOptions';

export default defineType({
  name: 'caseReference',
  title: 'Case Reference',
  type: 'document',
  fields: [
    defineField({
      name: 'caseName',
      title: 'Case Name',
      type: 'string',
      description: 'e.g., "Justice K.S. Puttaswamy v. Union of India"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'citation',
      title: 'Citation',
      type: 'string',
      description: 'e.g., "(2017) 10 SCC 1"',
    }),
    defineField({
      name: 'court',
      title: 'Court',
      type: 'string',
      options: {
        list: [
          { title: 'Supreme Court', value: 'Supreme Court' },
          { title: 'High Court', value: 'High Court' },
          { title: 'TDSAT', value: 'TDSAT' },
          { title: 'Data Protection Board', value: 'DPB' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dateDecided',
      title: 'Date Decided',
      type: 'date',
    }),
    defineField({
      name: 'summary',
      title: 'Relevance Summary',
      type: 'text',
      rows: 4,
      description: 'Brief explanation of why this case is relevant to this section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Judgment URL',
      type: 'url',
      description: 'Link to the full judgment',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
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
    select: { title: 'caseName', subtitle: 'court' },
  },
});
