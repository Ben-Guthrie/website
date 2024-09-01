import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  type: 'document',
  title: 'Project',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
    }),
    defineField({
      name: 'date',
      type: 'date',
    }),
    defineField({
      name: 'tags',
      type: 'array',

      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    defineField({
      name: 'summary',
      type: 'string',
      title: 'Summary',
    }),
    defineField({
      name: 'thumbnail',
      type: 'image',
      title: 'Thumbnail Image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'skills',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'skill',
              type: 'string',
            }),
            defineField({
              name: 'level',
              type: 'number',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'footers',
      type: 'object',
      fields: [
        defineField({
          name: 'left',
          type: 'object',
          fields: [
            {
              name: 'icon',
              type: 'string',
            },
            {
              name: 'text',
              type: 'string',
            },
          ],
        }),
        defineField({
          name: 'right',
          type: 'object',
          fields: [
            {
              name: 'icon',
              type: 'string',
            },
            {
              name: 'text',
              type: 'string',
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'link',
      type: 'object',
      fields: [
        defineField({
          name: 'type',
          type: 'string',
        }),
        defineField({
          name: 'path',
          type: 'string',
        }),
      ],
    }),
  ],
})
