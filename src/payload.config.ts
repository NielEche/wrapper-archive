// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Archives } from './collections/Archives'
import { Series } from './collections/Series'
import { Interviews } from './collections/Interviews'
import { ContactMessages } from './collections/ContactMessages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Archives, Series, Interviews, ContactMessages],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  upload: {
    limits: {
      fileSize: 5000000, // 5MB, adjust as needed
    },
  },
  plugins: [
    vercelBlobStorage({
      token: process.env.BLOB_READ_WRITE_TOKEN,
      collections: {
        media: {
          generateFileURL: ({ filename }) => `https://public.blob.vercel-storage.com/${filename}`,
          disableLocalStorage: true,
        }
      }
    }),
  ],
})
