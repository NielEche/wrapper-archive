import React from 'react';
import Link from 'next/link';
import Image from "next/legacy/image";
import wrap from '../../assets/wrapflat.png';
import Rect from '../../assets/Rect.png';
import arrow from '../../assets/arrow.png';
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import Map from './map';


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
    <div className='bg-grayW text-black p-0 border-b border-black flex justify-between md:pt-[72px]  pt-[136px]'>
      <h1 className='BfrikaRegular p-6 px-8 text-4xl content-center'>ARCHIVE</h1>
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

    <div className='bg-grayW border-b border-black archive-cardmain'>
      <div className='grid lg:grid-cols-3 gap-0 text-black'>
        {archives.map((archive) => (
          <div 
            key={archive.id} 
            className='archive-card lg:p-12 p-6 border-t-0 border-b-0 border-black border relative overflow-hidden'>
            <img 
              src={archive.coverImage.url} 
              width={400} 
              height={350} 
              alt={archive.title} 
              className='object-cover' 
            />
            <h1 className='Oswald-Bold text-4xl py-6'>{archive.title}</h1>
            <p className="DMSans-Regular text-base leading-tight text-justify">
              {archive.description.length > 200
                ? `${archive.description.slice(0, 200)}...`
                : archive.description}
            </p>
            <h1 className='Oswald-Bold text-xs font-black pt-6'>Read More</h1>
          </div>
        ))}
      </div>
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
        
        <div className='bg-grayW border-t border-black flex justify-between'>

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
              <p className='DMSans-Regular text-base py-1'><strong  className='text-lg'>Accessible Digital Archive : </strong> Build a comprehensive and accessible digital archive featuring detailed descriptions, documents,  interviews, photo series, videos, and an interactive map cataloging the wrappers.
             </p>
              <p className='DMSans-Regular text-base py-1'> <strong  className='text-lg'> Inspiration for New Work :</strong> Provide an extensive resource of cultural data for artists, creatives, designers, researchers, and others to explore and use as a foundation for new works.
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

        <div className="link-container p-6 border-t border-black bg-grayW">
          <Link className="flex justify-center" href="/">
            <div className="link-content">
              <p className="link-text text-black lg:px-6 px-4 flex items-end">See photo series</p>
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
      <h1 className='BfrikaRegular p-6 px-8 text-4xl content-center py-10'>INTERVIEWS</h1>
    </div>
    
    <div className='bg-grayW border-b archive-cardmain2'>
      <div className='grid lg:grid-cols-3 gap-0 text-black'>
        {interviews.map((interview) => {
        // Extract video ID from YouTube URL
          const urlParams = new URLSearchParams(new URL(interview.link).search);
          const videoId = urlParams.get('v'); // Extract the `v` parameter for the video ID
          const embedUrl = `https://www.youtube.com/embed/${videoId}`;

          return (
            <div key={interview.id} className="archive-card2 lg:p-12 p-6 border-t-0 border-black border-r">
              <div className="video-container">
                <iframe
                  width="100%"
                  height="315"
                  src={embedUrl}
                  title={interview.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h1 className="Oswald-Bold text-4xl py-6">{interview.title}</h1>
              <p className="DMSans-Regular text-base leading-tight text-justify">{interview.description}</p>
            </div>
          );
        })}
      </div>
    </div>

    </>
  );
};

export default Home;
