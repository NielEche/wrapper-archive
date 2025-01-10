import React from 'react';
import Link from 'next/link';
import Image from "next/legacy/image";
import wrap from '../../../assets/wrp1.jpg';
import wrap1 from '../../../assets/wrp2.jpg';
import wrap2 from '../../../assets/wrp3.jpg';
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import Interview from '../components/interview';


export const archives = async ({ params, searchParams }) => {
  
  const payload = await getPayloadHMR({
    config: configPromise,
  });

   
      const interviewsCollection = await payload.find({
        collection: "interviews", 
      });
  
      const interviews = interviewsCollection.docs; 
    


  return (
    <>
    <div className='bg-grayW text-black p-0 border-b border-black flex justify-between md:pt-[72px]  pt-[136px]'>
      <Link className="flex" href="/archives">
          <h1 className='BfrikaRegular p-6 px-8 text-4xl content-center'>INTERVIEWS</h1>
      </Link>
     
      <div className="flex justify-center sideW">
        <div className="border border-black slide-up">
          <Image src={wrap} alt="wrap" width={55} height={100} className="object-cover mx-auto flex seriesCover" />
        </div>

        <div className="border border-black slide-up" style={{ animationDelay: "0.2s" }}>
          <Image src={wrap1} alt="wrap" width={55} height={100} className="object-cover mx-auto flex seriesCover" />
        </div>

        <div className="border border-black slide-up" style={{ animationDelay: "0.4s" }}>
          <Image src={wrap2} alt="wrap" width={55} height={100} className="object-cover mx-auto flex seriesCover" />
        </div>
      </div>
    </div>

    <div>
      <Interview interviews={interviews} />
    </div>


    </>
  );
};

export default archives;
