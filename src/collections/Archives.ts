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
      name: 'description',
      type: 'textarea',
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
