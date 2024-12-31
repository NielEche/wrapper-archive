import type { CollectionConfig } from 'payload';

export const Series: CollectionConfig = {
  slug: 'series',
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
      name: 'image',
      type: 'upload',
      relationTo: 'media', // Connects to the existing Media collection
      required: true,
    },
  ],
};

export default Series;
