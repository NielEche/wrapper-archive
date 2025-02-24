import React from 'react';
import Link from 'next/link';
import Image from "next/legacy/image";
import wrap from '../../../assets/wrp1.jpg';
import wrap1 from '../../../assets/wrp2.jpg';
import wrap2 from '../../../assets/wrp3.jpg';

const About = () => {
  return (
    <>
      <div className='bg-grayW text-black p-0 border-b border-black flex justify-between'>
        <Link className="flex" href="/interviews">
        <h1 className='BfrikaRegular lg:p-6 p-2 lg:text-4xl text-base content-center'>About Us</h1>
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

      <div className='bg-off text-black p-0 border-b border-black'>
        <div className='bg-seaD border-t border-black flex justify-between'>

          <div className='lg:flex justify-between '>
            <div className='lg:p-10 p-6 lg:w-2/4'>
              <h1 className='BfrikaRegular text-4xl py-6'>Introduction</h1>
              <p className='DMSans-Regular text-base'>
                For centuries, the people of Rivers state and the Niger Delta at large have expressed their identity and heritage through the vibrant, intricate patterns of their traditional wrappers. These textiles tell stories of community, culture, and history.
                <br /><br />
                Wrappers of Rivers is born out of respect for our history and a commitment to preserving it for future generations. Beginning with the 23 local government areas of Rivers State and extending its reach to the wider Niger Delta and southern Nigeria, the project seeks to find, document, understand, archive, question and explore the timelessness of these traditional wrappers.
              </p>
            </div>

            <div className='lg:p-10 p-6 lg:w-2/4'>
              <h1 className='BfrikaRegular text-4xl py-6'>The Objectives</h1>
              <p className='DMSans-Regular text-base py-1'>
                <strong className='text-lg'>Cultural Preservation :</strong> Document and safeguard the designs, patterns, and histories of traditional wrappers unique to the Niger Delta.
              </p>
              <p className='DMSans-Regular text-base py-1'>
                <strong className='text-lg'>Awareness and Education :</strong> Promote understanding of the significance of these wrappers in the historic context of Niger Delta communities.
              </p>
              <p className='DMSans-Regular text-base py-1'>
                <strong className='text-lg'>Accessible Digital Archive :</strong> A comprehensive and accessible digital archive featuring detailed descriptions, documents, interviews, photo series, videos, and an interactive map cataloging the wrappers.
              </p>
              <p className='DMSans-Regular text-base py-1'>
                <strong className='text-lg'>Inspiration for New Work :</strong> Provide an extensive resource of cultural data for artists, creatives, designers, researchers, and others to explore and use as a foundation for new works.
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default About;
