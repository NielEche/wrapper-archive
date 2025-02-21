import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'we8zjxs9yfjtuy8b.public.blob.vercel-storage.com',
      // Add any other domains your images come from
    ],
  },
};

export default withPayload(nextConfig);
