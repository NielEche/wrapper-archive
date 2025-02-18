import React from 'react';
import Link from 'next/link';
import Image from "next/legacy/image";
import Rect from '../../assets/Rect.png';
import arrow from '../../assets/arrow.png';
import wrap from '../../assets/wrp1.jpg';
import wrap1 from '../../assets/wrp2.jpg';
import wrap2 from '../../assets/wrp3.jpg';
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import Map from './components/map';
import Archive from './components/archive';
import Interview from './components/interview';
import Series from './components/series';


export const Home = async ({ params, searchParams }) => {
  
  const payload = await getPayloadHMR({
    config: configPromise,
  });

    // Fetch data from a specific collection
    const archivesCollection = await payload.find({
      collection: "archives",
      limit: 50, // Fetch more records to shuffle from
    });
    
    const archives = archivesCollection.docs.sort(() => Math.random() - 0.5).slice(0, 6);
    

    const archivesCollectionMap = await payload.find({
      collection: "archives", // Replace with your collection slug
    });

    const archivesmap = archivesCollectionMap.docs; 
  

     // Fetch data from a specific collection
     const seriesCollection = await payload.find({
      collection: "series", // Replace with your collection slug
      limit: 6, // Limit the number of items
    });

    const series = seriesCollection.docs; 


     // Fetch data from a specific collection
     const interviewsCollection = await payload.find({
      collection: "interviews", // Replace with your collection slug
      limit: 3, // Limit the number of items
    });

    const interviews = interviewsCollection.docs; 
  

  return (
    <>
    <div className='bg-grayW text-black p-0 border-b border-black flex justify-between'>
      <Link className="flex" href="/archives">
          <h1 className='BfrikaRegular p-6 px-8 lg:text-4xl text-3xl content-center'>ARCHIVE</h1>
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
      <Archive archives={archives} />
    </div>



    <div className='bg-off text-black p-0 border-b border-black'>
      
        <h1 className='hidden BfrikaRegular w-full p-6 py-4 bg-black text-white dynamic-text bg-cyan-500'>THE WRAPPERS OF RIVERS.</h1>

        <div className="slider-container">
            <div className="slider-content">
              <h1 className="BfrikaRegular slider-text  dynamic-text">
                THE WRAPPERS OF RIVERS. 
              </h1>
            </div>
        </div>
        
        <div className='bg-seaD border-t border-black flex justify-between'>

          <div className='lg:flex justify-between lg:w-3/4 w-[60rem]'>
            <div className=' lg:p-10 p-6 lg:w-2/4'>
              <h1 className='BfrikaRegular text-4xl py-6'>The Essense</h1>
              <p className='DMSans-Regular text-base'>Rivers State is a land of various traditions, cultures and languages. With 23 local governments and at least 28 indigenous languages, it is no denying that it can be an array of colors, traditions and people. But one thing for sure is the importance wrappers play in the society. The wrappers of rivers project brings to light all the colorful ways the indigenes of rivers state explore their identity and culture. These wrappers are more than just a means of beauty but a symbol of identity.</p>
            </div>
            <div className=' lg:p-10 p-6 lg:w-2/4'>
              <h1 className='BfrikaRegular text-4xl py-6'>The Goal</h1>
              <p className='DMSans-Regular text-base py-1'> <strong className='text-lg'>Cultural Preservation :</strong>  Document and safeguard the designs, patterns, and histories of traditional wrappers unique to the Niger Delta.
             </p>
              <p className='DMSans-Regular text-base py-1'><strong  className='text-lg'>Awareness and Education :</strong> Promote understanding of the significance of these wrappers in the historic context of Niger Delta communities.
              </p>
              <p className='DMSans-Regular text-base py-1'><strong  className='text-lg'>Accessible Digital Archive : </strong>A comprehensive and accessible digital archive featuring detailed descriptions, documents,  interviews, photo series, videos, and an interactive map cataloging the wrappers.
             </p>
              <p className='DMSans-Regular text-base py-1'> <strong  className='text-lg'> Inspiration for New Work :</strong> Provide an extensive resource of cultural data for artists, creatives, designers, researchers, and others to explore and use as a foundation for new works.
              </p>
            </div>
          </div>
        
            <Image src={Rect} alt="wrap" height={350} width={150} className='lg:pl-10 object-cover' />

        </div>
    </div>

    <div className='bg-off border-black border-b pb-0 '>
        <div className="link-container p-6 border-b border-black bg-grayW">
          <Link className="flex justify-center" href="/series">
            <div className="link-content">
              <p className="link-text Oswald-Bold text-black text-base lg:px-6 px-4 flex items-end">Design your own wrapper </p>
              <Image src={arrow} alt="arrow" className="link-image mx-4" width={30} height={30} />
            </div>
          </Link>
        </div>

        <Series series={series} />

        <div className="link-container p-6 border-t border-black bg-grayW">
          <Link className="flex justify-center" href="/series">
            <div className="link-content">
              <p className="link-text Oswald-Bold text-black text-base lg:px-6 px-4 flex items-end">See photo series</p>
              <Image src={arrow} alt="arrow" className="link-image mx-4" width={30} height={30} />
            </div>
          </Link>
        </div>
    </div>

      {/* Map Section */}
      <div id="map-section">
      <Map archives={archivesmap} />
      </div>


    <div className='bg-off text-black p-0 border-b border-black flex justify-end'>
      <Link className="flex" href="/interviews">
        <h1 className='BfrikaRegular p-6 px-8 lg:text-4xl text-3xl  content-center py-10'>INTERVIEWS</h1>
      </Link>

    </div>
    

    <div>
        <Interview interviews={interviews} />
    </div>

    </>
  );
};

export default Home;
