import React from 'react';
import Link from 'next/link';
import Image from "next/legacy/image";
import wrap from '../../assets/wrapflat.png';
import Rect from '../../assets/Rect.png';
import arrow from '../../assets/arrow.png';
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'


export const Home = async ({ params, searchParams }) => {
  
  const payload = await getPayloadHMR({
    config: configPromise,
  });

    // Fetch data from a specific collection
    const archivesCollection = await payload.find({
      collection: "archives", // Replace with your collection slug
      limit: 6, // Limit the number of items
    });

    const archives = archivesCollection.docs; 

     // Fetch data from a specific collection
     const seriesCollection = await payload.find({
      collection: "series", // Replace with your collection slug
      limit: 6, // Limit the number of items
    });

    const series = seriesCollection.docs; 
  

  return (
    <>
    <div className='bg-off text-black p-0 border-b border-black flex justify-between md:pt-[72px]  pt-[136px]'>
      <h1 className='BfrikaRegular p-6 text-2xl content-center'>ARCHIVE</h1>
      <div className='flex justify-center'>
        <div width={93} height={200}>
        </div>

        <div>
        </div>

        <div>
        </div>

        <Image src={wrap} alt="wrap" width={150} height={108} />
      </div>
    </div>

    <div className='bg-grayW '>
      <div className='grid lg:grid-cols-3 gap-0 text-black'>
          {archives.map((archive) => (
            <div key={archive.id} className=' lg:p-12 p-6 border-t-0 border-black border'>
             <img src={archive.coverImage.url} width={400} height={350} alt={archive.title} className='object-contain mx-auto flex' />
             <h1 className='Oswald-Bold text-xl py-4'>{archive.title}</h1>
              <p className="DMSans-Regular text-sm leading-tight text-justify">
                {archive.description.length > 200
                  ? `${archive.description.slice(0, 200)}...`
                  : archive.description}
              </p>
           </div>
          ))}
      </div>
    </div>

    <div className='bg-off text-black p-0 border-b border-black'>
      
      <h1 className='BfrikaRegular w-full p-6 py-4 bg-black text-white dynamic-text bg-cyan-500'>THE WRAPPERS OF RIVERS.</h1>
        
        <div className='bg-grayW border-t border-black flex justify-between'>

          <div className='lg:flex justify-between lg:w-3/4 w-[60rem]'>
            <div className=' lg:p-10 p-6 lg:w-2/4'>
              <h1 className='BfrikaRegular text-xl py-6'>The Essense</h1>
              <p className='DMSans-Regular text-xs'>Rivers State is a land of various traditions, cultures and languages. With 23 local governments and at least 28 indigenous languages, it is no denying that it can be an array of colors, traditions and people. But one thing for sure is the importance wrappers play in the society. The wrappers of rivers project brings to light all the colorful ways the indigenes of rivers state explore their identity and culture. These wrappers are more than just a means of beauty but a symbol of identity.</p>
            </div>
            <div className=' lg:p-12 p-6 lg:w-2/4'>
              <h1 className='BfrikaRegular text-xl py-6'>The Goal</h1>
              <p className='DMSans-Regular text-xs py-1'> <strong className='text-sm'>Cultural Preservation :</strong>  Document and safeguard the designs, patterns, and histories of traditional wrappers unique to the Niger Delta.
             </p>
              <p className='DMSans-Regular text-xs py-1'><strong  className='text-sm'>Awareness and Education :</strong> Promote understanding of the significance of these wrappers in the historic context of Niger Delta communities.
              </p>
              <p className='DMSans-Regular text-xs py-1'><strong  className='text-sm'>Accessible Digital Archive : </strong> Build a comprehensive and accessible digital archive featuring detailed descriptions, documents,  interviews, photo series, videos, and an interactive map cataloging the wrappers.
             </p>
              <p className='DMSans-Regular text-xs py-1'> <strong  className='text-sm'> Inspiration for New Work :</strong> Provide an extensive resource of cultural data for artists, creatives, designers, researchers, and others to explore and use as a foundation for new works.
              </p>
            </div>
          </div>
        
            <Image src={Rect} alt="wrap" height={350} width={150} className='lg:pl-10 object-cover' />

        </div>
    </div>

    <div className='bg-off border-black border-b pb-0 '>
      <div className=' grid lg:grid-cols-3 grid-cols-3 gap-0 text-black py-4'>
        {series.map((photoseries) => (
            <div key={photoseries.id} className='lg:p-6 p-2 '>
              <img src={photoseries.image.url} width={300} height={200} alt={photoseries.title} className='object-cover mx-auto flex seriesCover' />
            </div>
          ))}
      </div>

      <div className='p-6 border-t border-black bg-grayW'>
        <Link className="flex justify-center" href="/">
           <p className='text-black lg:px-6 px-4 flex items-end'>See photo series</p>
           <Image src={arrow} alt="arrow" className='mx-4' width={30} height={30} />
        </Link>
      </div>
    </div>

    <div className='bg-off text-black p-0 border-b border-black flex justify-end'>
      <h1 className='BfrikaRegular p-6 text-2xl content-center py-10'>INTERVIEWS</h1>
    </div>
    
    <div className='bg-grayW '>
      <div className='grid lg:grid-cols-3 grid-cols-2 gap-0 text-black'>
          <div className=' lg:p-12 p-6 border-t-0 border-black border'>
            <Image src={wrap} alt="Code" className='object-contain flex justify-center' />
            <h1 className='Oswald-Bold text-xl py-6'>Krukubite</h1>
            <p className='DMSans-Regular text-sm'>Is a handwoven textile from sourthern, Nigeria. is a handwoven
            textile from sourthern, Nigeria</p>
            <h1 className='Oswald-Bold text-xs font-black pt-6'>april 20204</h1>
          </div>
       
      </div>
    </div>

    </>
  );
};

export default Home;
