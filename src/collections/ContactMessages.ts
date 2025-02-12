import type { CollectionConfig } from 'payload';

export const ContactMessages: CollectionConfig = {
  slug: 'contactMessages',
  admin: { useAsTitle: 'name' },
  access: {
    read: () => true, // Publicly readable
    update: () => false, 
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
  ],
};

export default ContactMessages;
