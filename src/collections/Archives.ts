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
