import type { CollectionConfig } from 'payload';

export const Interviews: CollectionConfig = {
  slug: 'interviews',
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
      name: 'link',
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
      required: false,
    },
  ],
};

export default Interviews;
