import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  fields: [
    defineField({
      name: 'message',
      title: 'Message',
      type: 'string',
      description: 'The announcement text displayed in the banner',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'link',
      title: 'Link URL',
      type: 'url',
      description: 'Optional link for the call-to-action',
    }),
    defineField({
      name: 'linkText',
      title: 'Link Text',
      type: 'string',
      description: 'Text for the call-to-action link (e.g. "Read now")',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Toggle to show/hide this announcement on the site',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'Used to reset user dismissals — update this to re-show the banner',
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
      title: 'message',
      isActive: 'isActive',
      publishedAt: 'publishedAt',
    },
    prepare({ title, isActive, publishedAt }) {
      return {
        title: title || 'Untitled announcement',
        subtitle: `${isActive ? 'Active' : 'Inactive'} — ${publishedAt ? new Date(publishedAt).toLocaleDateString() : 'No date'}`,
      };
    },
  },
});
