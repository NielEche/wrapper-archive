import type { CollectionConfig } from 'payload';

export const Archives: CollectionConfig = {
  slug: 'archives',
  access: {
    read: () => true, // Publicly readable
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Auto-generated from the title for use in the URL.',
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (data?.title && !data.slug) {
              // Auto-generate slug from title
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-') // replace spaces and symbols with dashes
                .replace(/(^-|-$)+/g, '') // remove leading/trailing dashes
            }
            return data?.slug || '' // Fallback to empty string if data or slug is undefined
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: false,
    },
   
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media', // Connects to the existing Media collection
      required: true,
    },
    {
      name: 'imageGallery',
      type: 'array',
      label: 'What does this look like?',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media', // Uses the existing Media collection
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Image Caption',
          required: false,
        },
      ],
    },
    {
      name: 'locations',
      type: 'array', // Allows multiple locations
      label: 'Locations',
      fields: [
        {
          name: 'latitude',
          type: 'number',
          required: true,
          label: 'Latitude',
        },
        {
          name: 'longitude',
          type: 'number',
          required: true,
          label: 'Longitude',
        },
        {
          name: 'description',
          type: 'text',
          label: 'Description',
          required: false,
        },
      ],
    },
  ],
};

export default Archives;
