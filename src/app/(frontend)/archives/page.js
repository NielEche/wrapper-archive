import React from 'react';
import Link from 'next/link';
import Image from "next/legacy/image";
import wrap from '../../../assets/wrp1.jpg';
import wrap1 from '../../../assets/wrp2.jpg';
import wrap2 from '../../../assets/wrp3.jpg';
import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import Archive from '../components/archive';
import { notFound } from "next/navigation";

export default async function ArchivesPage() {
  try {
    const payload = await getPayloadHMR({
      config: configPromise,
    });

    if (!payload) {
      console.error("Payload initialization failed");
      notFound();
    }

    const archivesCollection = await payload.find({
      collection: "archives",
    });

    const archives = archivesCollection.docs;

    return (
      <>
        <div className='bg-grayW text-black p-0 border-b border-black flex justify-between'>
          <Link className="flex" href="/archives">
            <h1 className='BfrikaRegular lg:p-6 p-2 lg:text-4xl text-base content-center'>All Wrappers</h1>
          </Link>

          <div className="flex justify-center sideW">
            {[wrap, wrap1, wrap2].map((img, idx) => (
              <div key={idx} className="border border-black slide-up" style={{ animationDelay: `${idx * 0.2}s` }}>
                <Image src={img} alt="wrap" width={55} height={100} className="object-cover mx-auto flex seriesCover" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <Archive archives={archives} />
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching archives:", error);
    notFound();
  }
}
