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
  ],
};

export default Archives;
