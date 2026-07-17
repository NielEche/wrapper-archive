import Link from 'next/link'
import Image from 'next/legacy/image'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import configPromise from '@payload-config'

import Archive from '../components/archive'

import wrap from '../../../assets/wrp1.jpg'
import wrap1 from '../../../assets/wrp2.jpg'
import wrap2 from '../../../assets/wrp3.jpg'

export const dynamic = 'force-dynamic'

export default async function ArchivesPage() {
  try {
    const payload = await getPayload({
      config: configPromise,
    })

    const { docs: archives } = await payload.find({
      collection: 'archives',
    })

    return (
      <>
        <div className="bg-grayW text-black p-0 border-b border-black flex justify-between">
          <Link href="/archives" className="flex">
            <h1 className="BfrikaRegular lg:p-6 p-2 lg:text-4xl text-base content-center">
              All Wrappers
            </h1>
          </Link>

          <div className="flex justify-center sideW">
            {[wrap, wrap1, wrap2].map((img, idx) => (
              <div
                key={idx}
                className="border border-black slide-up"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <Image
                  src={img}
                  alt="Wrapper"
                  width={55}
                  height={100}
                  className="object-cover mx-auto flex seriesCover"
                />
              </div>
            ))}
          </div>
        </div>

        <Archive archives={archives} />
      </>
    )
  } catch (error) {
    console.error('Error loading archives:', error)
    notFound()
  }
}