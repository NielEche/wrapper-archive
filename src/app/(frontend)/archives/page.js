import React from 'react';
import Link from 'next/link';
import Image from "next/legacy/image";
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'


export const archives = async ({ params, searchParams }) => {
  
  const payload = await getPayloadHMR({
    config: configPromise,
  });


  return (
    <>
    <div className='bg-grayW text-black p-0 border-b border-black flex justify-between md:pt-[72px]  pt-[136px]'>
      <Link className="flex" href="/archives">
          <h1 className='BfrikaRegular p-6 px-8 text-4xl content-center'>ARCHIVE</h1>
      </Link>
   
    </div>


    </>
  );
};

export default archives;
