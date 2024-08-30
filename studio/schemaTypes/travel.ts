import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'travel',
  title: 'Travel',
  type: 'document',
  fields: [
    defineField({
      name: 'tripName',
      title: 'Trip Name',
      type: 'string',
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
      name: 'highlights',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'images',
      type: 'gallery',
    }),
  ],
})
