import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'annotation',
  title: 'Legal Annotation',
  type: 'document',
  fields: [
    defineField({
      name: 'term',
      title: 'Term',
      type: 'string',
      description: 'The term or phrase to annotate (e.g., "techno-legal measures")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'explanation',
      title: 'Plain Language Explanation',
      type: 'text',
      rows: 4,
      description: 'Plain-language explanation of this term or concept',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Concept', value: 'concept' },
          { title: 'Procedure', value: 'procedure' },
          { title: 'Threshold', value: 'threshold' },
          { title: 'Reference', value: 'reference' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'documentId',
      title: 'Document',
      type: 'string',
      description: 'Which document this applies to',
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
      description: 'Scope to a specific section (e.g., "section-5"). Leave empty for global.',
    }),
  ],
  preview: {
    select: { title: 'term', subtitle: 'documentId' },
  },
});
