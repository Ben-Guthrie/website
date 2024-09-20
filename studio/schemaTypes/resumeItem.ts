import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'resumeItem',
  type: 'document',
  title: 'Resume Item',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'shortTitle',
      type: 'string',
      title: 'Short Title',
    }),
    defineField({
      name: 'company',
      type: 'string',
      title: 'Company Name',
    }),
    defineField({
      name: 'from',
      type: 'date',
    }),
    defineField({
      name: 'to',
      type: 'date',
    }),
    defineField({
      name: 'type',
      type: 'string',
      options: {list: ['education', 'experience']},
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [{type: 'block'}],
      title: 'Description',
    }),
    defineField({
      name: 'showInPreview',
      type: 'boolean',
      title: 'Show in Preview Mode?',
    }),
  ],
})
